import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from './post';

const Blog_ = ({ host, version }) => {
    const [news, setnews] = useState([])
    const [load, setload] = useState(true)
    const [link, setlink] = useState(`${host}/api/news/search/news/?is_blog=true`)
    const [fetchind, setfetchind] = useState(true)
    let SearhNews = async () => {
        if (link) {
            let response = await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setlink(data.next)
            setnews([...news, ...data.results])
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        if (fetchind) {
            SearhNews()
        }
    }, [fetchind])
    const scrollHendler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setfetchind(true)
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollHendler)
        return function () {
            document.removeEventListener('scroll', scrollHendler)
        }
    }, [])
    return (
        <>
        <div className='agetations' style={{display: 'block', height: '600px'}}>
            <p style={{position: 'inherit', margin: '20px'}}>действующая версия: 4.1{version}</p>
            <div style={{height: '340px', padding: '20px', paddingTop: '0', width: '90%'}}>
                <p>о нас</p>
                <p>приложение разработанно как платформа для организации и проведения турниров и товарищеских встреч по различным спортивным - киберспортивным дисциплинам</p>
                <img src="/svg/repair.svg" alt="" style={{height: '120px', position: 'absolute', left: '50%', transform: 'translateX(-50%)', marginTop: '40px'}}/>
            </div>
            <div style={{padding: '20px', paddingTop: '0', width: '100%'}}>
                <p>наши каналы</p>
                <a href="https://github.com/qean32/mdf28" target="_blank" ><img src="/svg/gitHub.svg" alt="" className='linkImage'/></a>
                <a href="https://github.com/qean32/mdf28server" target="_blank" ><img src="/svg/gitHub.svg" alt="" className='linkImage'/></a>
                <a href="https://t.me/+xJIMXDHnrvwyMjMy" target="_blank" ><img src="/svg/telegram.svg" alt="" className='linkImage'/></a>
                <a href="https://discord.gg/saN3mAmyyp" target="_blank"><img src="/svg/discord.svg" alt="" className='linkImage'/></a>
            </div>
        </div>
            {news.length > 0 && news.map((el) => (
                <Post host={host} key={el.id} el={el} />
            ))}
            {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '170px', marginBottom: '20px' }}>записи закончились...</p>}
        </>
    );
}

export default Blog_;