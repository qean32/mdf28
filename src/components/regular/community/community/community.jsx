import { useEffect, useState } from 'react'
import styles from './community.module.css'
import { useNavigate } from 'react-router-dom';

const Content = () => {
    let host = 'https://mdf28server.site'
    const navigate = useNavigate();
    const [users, setusers] = useState([])
    const [load, setload] = useState(true)
    const [load1, setload1] = useState(false)
    const [search_value, setsearch_value] = useState('')
    const [link, setlink] = useState(`${host}/api/users/search/user/?limit=16&offset=0`)
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
            setusers([...users, ...data.results])
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
        let response = await fetch(`${host}/api/users/search_short/user/?search=${search_value}&limit=14&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setusers([...data.results])
    }
    useEffect(() => {
        if (search_value.length <= 0) {
            let SearhUser = async () => {
                let response = await fetch(`${host}/api/users/search/user/?limit=16&offset=0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                let data = await response.json()
                setusers([...data.results])
            }
            SearhUser()
        } else if (search_value.length >= 2) {
            SearhPl(search_value)
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
                        <input type='text' onChange={changeHolder} value={search_value} className={styles.Input} placeholder='найти человека' maxLength={255} /><img src='/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>{users && users.map((el) => (<div className={styles.users_el} onClick={() => navigate(`/profile/${el.id}`)}><div style={{ backgroundImage: `url(${el.ava})` }} className={styles.ava}></div><p>{el.first_name} {el.last_name} {el.smail && <div style={{ backgroundImage: `url(${el.smail?.image})` }} className={styles.smail}></div>}
                        {el.team_sap && <div style={{ backgroundImage: `url(${el.team_sap?.image})` }} className={styles.smail}></div>}</p><img src='/svg/user_plus.svg' /></div>))}</>}
                    {!load && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Content;