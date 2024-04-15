import { useEffect, useState } from 'react'
import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';

const Content = () => {
    let host = 'https://mdf28server.site'
    let direction = 'bascketball'
    const navigate = useNavigate();
    const [teams, setteams] = useState([])
    const [load, setload] = useState(true)
    const [search_value, setsearch_value] = useState('')
    const [load1, setload1] = useState(false)
    const [link, setlink] = useState(`${host}/api/${direction}/search/team/?limit=14&offset=0`)
    const [fetchind, setfetchind] = useState(true)
    let SearhTeam = async () => {
        if (link) {
            let response = await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setlink(data.next)
            setteams([...teams, ...data.results])
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        if (fetchind) {
            SearhTeam()
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
    let SearhTeam_ = async () => {
        let response = await fetch(`${host}/api/${direction}/search/team/?search=${search_value}&limit=14&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setteams([...data.results])
    }
    useEffect(() => {
        if (search_value.length <= 0) {
            let SearhTeam__ = async () => {
                let response = await fetch(`${host}/api/${direction}/search/team/?limit=14&offset=0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                let data = await response.json()
                setteams([...data.results])
            }
            SearhTeam__()
        } else if (search_value.length >= 2) {
            SearhTeam_(search_value)
        }
    }, [search_value])
    const changeHolder = (e) => {
        setsearch_value(e.target.value)
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
                        <input type='text' onChange={changeHolder} value={search_value} className={styles.Input} placeholder='найти команду' maxLength={255} /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    <div className={styles.panel}>
                        <p style={{ left: '10%' }}>команда</p>
                        <p style={{ left: '68%', transform: 'translateY(2px)' }}>матчи\турниры</p>
                    </div>
                    {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>
                        {teams && teams.map((el) => (<div className={styles.teams_el} onClick={() => navigate(`/${direction}/team/${el.id}`)}><div style={{backgroundImage: `url(${el.logo})`}} className={styles.ava}></div><p>{el.team_name}
                            {el.is_recognized && <img src='/svg/venok.svg' id={styles.id_2} />}</p><div className={styles.teams}><p><div><img src="/svg/flag.svg" />{el.matches}<img src="/svg/cup.svg" style={{ transform: "translateY(1px)" }} />{el.tournament}</div></p></div></div>))}</>}
                    {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Content;