import { useEffect, useState } from 'react'
import styles from './disputes.module.css'
import { useNavigate } from 'react-router-dom'

const Content = () => {
    const navigate = useNavigate()
    const [info, setInfo] = useState([])
    const [load, setload] = useState(true)
    const [load1, setload1] = useState(false)
    const [nameP, setnameP] = useState('')
    const [link, setlink] = useState('https://mdf28server.site/api/disputes/search/disput/?limit=14&offset=0')
    let Searh = async () => {
        if (link) {
            let response = await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setInfo([...info, ...data.results])
            setlink(data.next)
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        Searh()
    }, [])
    const [fetchind, setfetchind] = useState(false)
    useEffect(() => {
        if (fetchind) {
            Searh()
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
    let SearhPl = async () => {
        let response = await fetch(`https://mdf28server.site/api/disputes/search_short/disput/?search=${nameP}&limit=14&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setInfo([...data.results])
    }
    const changeHolder = (e) => {
        setload1(true)
        setTimeout(() => {
            setload1(false)
        }, 300);
        setnameP(e.target.value)
        if (nameP.length <= 0) {
            let SearhPll = async () => {
                let response = await fetch(`https://mdf28server.site/api/disputes/search/disput/?limit=14&offset=0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                let data = await response.json()
                setInfo([...data.results])
            }
            SearhPll()
        } else if (nameP.length >= 2) {
            SearhPl(nameP)
        }
    }
    return (
        <>
            <div className={styles.content}>
                <div className={styles.headerr}>
                    <div>
                        <input type='text' onChange={changeHolder} value={nameP} className={styles.Input} placeholder='найти диспут' maxLength={255} /><img src='/mdf28/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    <div className={styles.head}>
                        <p style={{ left: '3%' }}>автор</p>
                        <p style={{ left: '15%' }}>тема</p>
                        <p style={{ left: '86%' }}>дата</p>
                    </div>
                    {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>{info && info.map((el) => (<div className={styles.info_el} onClick={() => navigate(`/disput/${el.id}`)}><div style={{ backgroundImage: `url(${el.author?.ava})` }} className={styles.ava}></div><p>{el.title}</p><div className={styles.date}><p>{el.created_at}</p></div></div>))}</>}
                    {!load && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Content;