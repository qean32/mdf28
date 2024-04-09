import { useEffect, useState } from 'react'
import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';

const Content = () => {
    let host = 'https://mdf28server.site'
    let direction = 'cs'
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [search_value, setsearch_value] = useState('')
    const [load, setload] = useState(true)
    const [load1, setload1] = useState(false)
    const [link, setlink] = useState(`${host}/api/${direction}/search/player/?limit=16&offset=0`)
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
    let SearhPlayer = async () => {
        let response = await fetch(`${host}/api/${direction}/search/player/?search=${search_value}&limit=14&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setInfo([...data.results])
    }
    useEffect(() => {
        if (search_value.length <= 0) {
            let SearhPlayer_ = async () => {
                let response = await fetch(`${host}/api/${direction}/search/player/?limit=16&offset=0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                let data = await response.json()
                setInfo([...data.results])
            }
            SearhPlayer_()
        } else if (search_value.length >= 2) {
            SearhPlayer(search_value)
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
                        <input type='text' onChange={changeHolder} value={search_value} className={styles.Input} placeholder='найти игрока' maxLength={255} /><img src='/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    <div className={styles.panel}>
                        <p style={{ left: '3.8%' }}>игрок</p>
                        <p style={{ right: '19%' }}>команда</p>
                        <p style={{ right: '5.5%' }}>ранг</p>
                    </div>
                    <div>
                        {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>{info && info.map((el) => (<div className={styles.info_el} onClick={() => navigate(`/profile/${el.user?.id}`)}><div style={{ backgroundImage: `url(${el.user?.ava})` }} className={styles.ava}></div><p>{el.user?.first_name} {el.user?.last_name} {el.user?.smail && <div style={{ backgroundImage: `url(${el.user?.smail.image})` }} className={styles.smail}></div>}
                            {el.user?.team_sap && <div style={{ backgroundImage: `url(${el.user?.team_sap.image})` }} className={styles.smail}></div>}
                            {el.is_recognized && <img src='/svg/venok.svg' id={styles.id_2} />} </p><div className={styles.dotas}><span> {el.team?.team_name} </span><img style={{height: '45px', width: '45px'}} src={el.rank?.image_rank} alt="" /></div></div>))}</>}
                    </div>
                    {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Content;