import { useEffect, useState } from 'react';
import Tournament from './tounament';

const Content = () => {
    const [news, setnews] = useState([])
    const [load, setload] = useState(true)
    const [link, setlink] = useState('http://qean32.beget.tech/api/dota/search_short/tournament/?limit=12&offset=0')
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
                <Tournament el={el} />
            ))}
            {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '170px', marginBottom: '20px' }}>записи закончились...</p>}
            <div style={{ height: '30px' }}></div>
        </>
    );
}

export default Content;