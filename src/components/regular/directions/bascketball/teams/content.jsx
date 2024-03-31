import { useEffect, useState } from 'react'
import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';

const Content = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [load, setload] = useState(true)
    const [nameP, setnameP] = useState('')
    const [load1, setload1] = useState(false)
    const [link, setlink] = useState('http://qean32.beget.tech/api/bascketball/search/team/?limit=14&offset=0')
    const [fetchind, setfetchind] = useState(true)
    let Searh = async () => {
        if (link) {
            let response = await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setlink(data.next)
            setInfo([...info, ...data.results])
            setfetchind(false)
        } else {
            setload(false)
        }
    }
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
        let response = await fetch(`http://qean32.beget.tech/api/bascketball/search/team/?search=${nameP}&limit=14&offset=0`, {
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
                let response = await fetch(`http://qean32.beget.tech/api/bascketball/search/team/?limit=14&offset=0`, {
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
                        <input type='text' onChange={changeHolder} value={nameP} className={styles.Input} placeholder='найти команду' maxLength={255} /><img src='/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    <div className={styles.panel}>
                        <p style={{ left: '10%' }}>команда</p>
                        <p style={{ left: '68%', transform: 'translateY(2px)' }}>матчи\турниры</p>
                    </div>
                    {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>
                        {info && info.map((el) => (<div className={styles.info_el} onClick={() => navigate(`/bascketball/team/${el.id}`)}><div style={{ backgroundImage: `url(${el.logo})` }} className={styles.ava}></div><p>{el.team_name}
                            {el.is_recognized && <img src='/svg/venok.svg' id={styles.id_2} />}</p><div className={styles.info}><p><div><img src="/svg/flag.svg" />{el.matches}<img src="/svg/cup.svg" style={{ transform: "translateY(1px)" }} />{el.tournament}</div></p></div></div>))}</>}
                    {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Content;