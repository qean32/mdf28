import { useEffect, useState } from 'react';
import Meeting from './meeting';

const Meetings = ({ host, direction, str_direction }) => {
    const [news, setnews] = useState([])
    const [load, setload] = useState(true)
    const [link, setlink] = useState(`${host}/api/unification/search/meeting/?limit=10&offset=0&direction=${direction}`)
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
            {news.length > 0 && news.map((el) => (
                <Meeting key={el.id} str_direction={str_direction} el={el} />
            ))}
            {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '170px', marginBottom: '20px' }}>записи закончились...</p>}
        </>
    );
}

export default Meetings;