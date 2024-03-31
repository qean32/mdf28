import { useEffect, useState } from 'react'
import styles from './transfers.module.css'
import { useNavigate } from 'react-router-dom'

const Content = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [info1, setInfo1] = useState([])
    const [info3, setInfo3] = useState([])
    const [load, setload] = useState(true)
    const [link1, setlink1] = useState('http://qean32.beget.tech/api/tranfers/search/DOTA/?limit=8&offset=0')
    const [link2, setlink2] = useState('http://qean32.beget.tech/api/tranfers/search/CS/?limit=8&offset=0')
    const [link3, setlink3] = useState('http://qean32.beget.tech/api/tranfers/search/BASCKETBALL/?limit=8&offset=0')
    let Searh1 = async () => {
        if (link1) {
            let response = await fetch(link1, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setInfo([...info, ...data.results])
            setlink1(data.next)
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    let Searh2 = async () => {
        if (link2) {
            let response = await fetch(link2, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setInfo1([...info, ...data.results])
            setlink2(data.next)
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    let Searh3 = async () => {
        if (link2) {
            let response = await fetch(link3, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setInfo3([...info, ...data.results])
            setlink3(data.next)
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        Searh2()
        Searh1()
        Searh3()
    }, [])
    const [fetchind, setfetchind] = useState(false)
    useEffect(() => {
        if (fetchind) {
            Searh1()
            Searh2()
            Searh3()
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
                    {info && info.map((el) => (<div className={styles.info_el}><p onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.full_name} <span>{el.script?.content}</span> {el.team?.team_name}</p><div className={styles.date}><p>{el.date_crate}</p></div></div>))}
                    {info1 && info1.map((el) => (<div className={styles.info_el}><p onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.full_name} <span>{el.script?.content}</span> {el.team?.team_name}</p><div className={styles.date}><p>{el.date_crate}</p></div></div>))}
                    {info3 && info3.map((el) => (<div className={styles.info_el}><p onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.full_name} <span>{el.script?.content}</span> {el.team?.team_name}</p><div className={styles.date}><p>{el.date_crate}</p></div></div>))}
                    {!load && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Content;