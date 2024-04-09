import { useEffect, useState } from 'react';
import Tournament from './tounament';

const Content = () => {
    let host = 'https://mdf28server.site'
    let direction = 'bascketball'
    const [tournaments, settournaments] = useState([])
    const [load, setload] = useState(true)
    const [link, setlink] = useState(`${host}/api/${direction}/search_short/tournament/?limit=12&offset=0`)
    const [fetchind, setfetchind] = useState(true)
    let SearhTournaments = async () => {
        if (link) {
            let response = await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setlink(data.next)
            settournaments([...tournaments, ...data.results])
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        if (fetchind) {
            SearhTournaments()
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
            {tournaments.length > 0 && tournaments.map((el) => (
                <Tournament el={el} />
            ))}
            {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '170px', marginBottom: '20px' }}>записи закончились...</p>}
            <div style={{ height: '30px' }}></div>
        </>
    );
}

export default Content;