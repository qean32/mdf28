import styles from './content.module.css'
import Post from './post';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Content = () => {
    let host = 'https://mdf28server.site'
    const [news, setnews] = useState([])
    const [load, setload] = useState(true)
    const navigate = useNavigate();
    const [link, setlink] = useState(`${host}/api/news/search/news/`)
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
        SearhTournament()
        document.addEventListener('scroll', scrollHendler)
        return function () {
            document.removeEventListener('scroll', scrollHendler)
        }
    }, [])
    const [tournament, settournament] = useState(false)
    let SearhTournament = async () => {
        let response = await fetch(`${host}/api/dota/search/tournament/?limit=1&offset=0`, {
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
                <p>приглашаем вас стать одним из наших игроков!</p>
            </div>
            {tournament && <div className={styles.content2} onClick={() => navigate(`/dota/tournament/${tournament.id}`)}>
                <div className={styles.match}>
                    <div className={styles.team}><p>{tournament.name}</p><img src="/svg/venok.svg" id={styles.id_5} /></div>
                    <div><p style={{ color: '#a5a5a5', fontSize: '16px', transform: 'translateX(-10px)' }}>дата окончания принятия заявок: {tournament.date}</p></div>
                </div>
            </div>}
            {news.length > 0 && news.map((el) => (
                <Post id={el.id} isV={false} author={el.author} image={el.image} coments={el.coments} direction={el.direction} content={el.content} created_at={el.created_at} likes={el.likes} />
            ))}
            {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '170px', marginBottom: '20px' }}>записи закончились...</p>}
        </>
    );
}

export default Content;