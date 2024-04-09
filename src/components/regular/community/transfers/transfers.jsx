import { useEffect, useState } from 'react'
import styles from './transfers.module.css'
import { useNavigate } from 'react-router-dom'

const Content = () => {
    let host = 'https://mdf28server.site'
    const navigate = useNavigate();
    const [transfers, settransfers] = useState([])
    const [transfers1, settransfers1] = useState([])
    const [transfers3, settransfers3] = useState([])
    const [load, setload] = useState(true)
    const [link1, setlink1] = useState(`${host}/api/tranfers/search/DOTA/?limit=8&offset=0`)
    const [link2, setlink2] = useState(`${host}/api/tranfers/search/CS/?limit=8&offset=0`)
    const [link3, setlink3] = useState(`${host}/api/tranfers/search/BASCKETBALL/?limit=8&offset=0`)
    let SearhTransfers1 = async () => {
        if (link1) {
            let response = await fetch(link1, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            settransfers([...transfers, ...data.results])
            setlink1(data.next)
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    let SearhTransfers2 = async () => {
        if (link2) {
            let response = await fetch(link2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            settransfers1([...transfers1, ...data.results])
            setlink2(data.next)
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    let SearhTransfers3 = async () => {
        if (link2) {
            let response = await fetch(link3, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            settransfers3([...transfers3, ...data.results])
            setlink3(data.next)
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        SearhTransfers2()
        SearhTransfers1()
        SearhTransfers3()
    }, [])
    const [fetchind, setfetchind] = useState(false)
    useEffect(() => {
        if (fetchind) {
            SearhTransfers1()
            SearhTransfers2()
            SearhTransfers3()
            setfetchind(false)
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
            <div className={styles.content}>
                <img src='/svg/venok.svg' id={styles.id_1} />
                <div>
                    {transfers && transfers.map((el) => (<div className={styles.transfers_el}><p onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name} <span>{el.script?.content}</span> {el.team?.team_name ? el.team?.team_name : 'команда удалена*'}</p><div className={styles.date}><p>{el.date_crate}</p></div></div>))}
                    {transfers1 && transfers1.map((el) => (<div className={styles.transfers_el}><p onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name} <span>{el.script?.content}</span> {el.team?.team_name ? el.team?.team_name : 'команда удалена*'}</p><div className={styles.date}><p>{el.date_crate}</p></div></div>))}
                    {transfers3 && transfers3.map((el) => (<div className={styles.transfers_el}><p onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name} <span>{el.script?.content}</span> {el.team?.team_name ? el.team?.team_name : 'команда удалена*'}</p><div className={styles.date}><p>{el.date_crate}</p></div></div>))}
                    {!load && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Content;