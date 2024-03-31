import { useEffect, useState } from 'react';
import Post from '../../../regular/news/post';
import { useNavigate } from 'react-router-dom';

const Content = ({ }) => {
    let navigate = useNavigate()
    const [news, setnews] = useState([])
    const [load, setload] = useState(true)
    const [link, setlink] = useState('http://qean32.beget.tech/api/news/search/news/?direction=1')
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
        Searh()
        document.addEventListener('scroll', scrollHendler)
        return function () {
            document.removeEventListener('scroll', scrollHendler)
        }
    }, [])
    const [tournament, settournament] = useState(false)
    let Searh = async () => {
        let response = await fetch('http://qean32.beget.tech/api/dota/search/tournament/?limit=1&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        settournament(data.results[0])
    }
    return (
        <>
            <div className='agetations'>
                <div>
                    <img src="/svg/cezar.png" id='id_4312' alt="" />
                    <div className='mdf'><p>
                        MD.f
                    </p><img src="/svg/venok.svg" /></div>
                </div>
                <img src="/svg/dota_logo.svg" id='id_53' />
                {/* <img src="/svg/bascketball_logo.svg" id='id_54' /> */}
                {/* <img src="/svg/cs_logo.svg" id='id_55' /> */}
                <p>приглашаем вас стать одним из наших игроков!</p>
            </div>
            {tournament && <div className='content2' onClick={() => navigate(`/dota/tournament/${tournament.id}`)}>
                <div className='match'>
                    <div className='team'><p>{tournament.name}</p><img src="/svg/venok.svg" id='id_5' /></div>
                    <div><p style={{ color: '#a5a5a5', fontSize: '16px', transform: 'translateX(-10px)' }}>дата окончания принятия заявок: - {tournament.date}</p></div>
                </div>
            </div>}
            {news.length > 0 && news.map((el) => (
                <Post id={el.id} author={el.author} image={el.image} isV={false} coments={el.coments} direction={el.direction} content={el.content} created_at={el.created_at} likes={el.likes} />
            ))}
            {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '170px', marginBottom: '20px' }}>записи закончились...</p>}
        </>
    );
}

export default Content;