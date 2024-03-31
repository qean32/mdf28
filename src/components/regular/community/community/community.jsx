import { useEffect, useState } from 'react'
import styles from './community.module.css'
import { useNavigate } from 'react-router-dom';

const Content = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [load, setload] = useState(true)
    const [load1, setload1] = useState(false)
    const [nameP, setnameP] = useState('')
    const [link, setlink] = useState('http://qean32.beget.tech/api/users/search/user/?limit=16&offset=0')
    const [fetchind, setfetchind] = useState(false)
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
    useEffect(() => {
        if (fetchind) {
            Searh()
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
    let SearhPl = async () => {
        let response = await fetch(`http://qean32.beget.tech/api/users/search_short/user/?search=${nameP}&limit=14&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setInfo([...data.results])
    }
    useEffect(() => {
        if (nameP.length <= 0) {
            let SearhPll = async () => {
                let response = await fetch(`http://qean32.beget.tech/api/users/search/user/?limit=16&offset=0`, {
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
    }, [nameP])
    const changeHolder = (e) => {
        setnameP(e.target.value)
        setload1(true)
        setTimeout(() => {
            setload1(false)
        }, 300);
    }
    return (
        <>
            <div className={styles.content}>
                <div className={styles.headerr}>
                    <div>
                        <input type='text' onChange={changeHolder} value={nameP} className={styles.Input} placeholder='найти человека' maxLength={255} /><img src='/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>{info && info.map((el) => (<div className={styles.info_el} onClick={() => navigate(`/profile/${el.id}`)}><div style={{ backgroundImage: `url(${el.ava})` }} className={styles.ava}></div><p>{el.first_name} {el.last_name} {el.smail && <div style={{ backgroundImage: `url(${el.smail?.image})` }} className={styles.smail}></div>}
                        {el.team_sap && <div style={{ backgroundImage: `url(${el.team_sap?.image})` }} className={styles.smail}></div>}</p><img src='/svg/user_plus.svg' /></div>))}</>}
                    {!load && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Content;