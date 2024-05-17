import { useEffect, useState } from 'react';
import Application from './application';

const Applications = ({host, direction, str_direction}) => {
    const [application, setapplication] = useState([])
    const [load, setload] = useState(true)
    const [link, setlink] = useState(`${host}/api/unification/search/application/meeting/?limit=10&offset=0&direction=${direction}`)
    const [fetchind, setfetchind] = useState(true)
    let SearhApplication = async () => {
        if (link) {
            let response = await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setlink(data.next)
            setapplication([...application, ...data.results])
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        if (fetchind) {
            SearhApplication()
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
            {application.length > 0 && application.map((el) => (
                <Application key={el?.id} el={el} host={host} direction={direction} />
            ))}
            {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '170px', marginBottom: '20px' }}>записи закончились...</p>}
        </>
    );
}

export default Applications;