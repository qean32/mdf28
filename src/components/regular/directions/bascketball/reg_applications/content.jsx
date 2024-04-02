import { useContext, useEffect, useState } from 'react'
import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';
import context from '../../../../../connections/context';

const Content = () => {
    let { user } = useContext(context)
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [nameP, setnameP] = useState('')
    const [load1, setload1] = useState(false)
    let Searh = async () => {
        setclas(false)
        let response = await fetch('https://mdf28server.site/api/bascketball/search/team/?limit=1&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setInfo([...data.results])
    }
    useEffect(() => {
        Searh()
    }, [])
    let SearhTeam = async () => {
        setclas(false)
        let response = await fetch(`https://mdf28server.site/api/bascketball/search/team/?search=${nameP}&limit=1&offset=0`, {
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
            Searh()
        } else if (nameP.length >= 2) {
            SearhTeam(nameP)
        }
    }, [nameP])
    const changeHolder = (e) => {
        setnameP(e.target.value)
        setload1(true)
        setTimeout(() => {
            setload1(false)
        }, 300);
    }
    const [clas, setclas] = useState(false)
    const clickHandler = (num) => {
        if (clas) {
            setclas(false)
        } else {
            setclas(num)
        }
    }
    const reg = async (id) => {
        const response = await fetch('https://mdf28server.site/api/bascketball/reg/application_meeting/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: dir, team_two: id, time1: time, date: date, time2: time1})
        })
        let data = await response.json()
        navigate('/bascketball/meeting/applications')
    }
    const [dir, setdir] = useState(false)
    let SearhDIR = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/search/team/?director=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0].id) {
            setdir(data.results[0].id)
        }
    }
    useEffect(() => {
        SearhDIR()
    }, [])
    const [date, setdate] = useState('2024-04-01')
    const [time, settime] = useState('20:20')
    const [time1, settime1] = useState('21:20')
    return (
        <>
            <div className={styles.content}>
                <div className={styles.headerr}>
                    <div>
                        <input type='text' onChange={changeHolder} value={nameP} className={styles.Input} placeholder='найти команду' maxLength={255} /><img src='/mdf28/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    <div className={styles.panel}>
                        <p style={{ left: '10%' }}>команда</p>
                        <p style={{ left: '68%', transform: 'translateY(2px)' }}>матчи\турниры</p>
                    </div>
                    {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>
                        {info && info.map((el) => (<div onClick={() => clickHandler(el.id)} className={styles.info_el}><div style={{ backgroundImage: `url(${el.logo})` }} className={styles.ava}></div><p>{el.team_name}
                            {el.is_recognized && <img src='/mdf28/svg/venok.svg' id={styles.id_2} />}</p><div className={styles.info}><p><div><img src="/mdf28/svg/flag.svg" />{el.matches}<img src="/mdf28/svg/cup.svg" style={{ transform: "translateY(1px)" }} />{el.tournament}</div></p></div><div style={clas ? { height: '20px', width: '20px', background: '#228b22', opacity: '1', position: 'absolute', right: '30px', marginTop: '17px', borderRadius: '5px' } : { height: '20px', width: '20px', background: '#228b22', opacity: '0', position: 'absolute', right: '30px', marginTop: '17px', borderRadius: '5px' }}></div></div>))}</>}
                </div>
            </div>
            <div className={styles.content} style={{ display: 'flex', flexDirection: 'row' }}>
                <input type="date"  value={date} onChange={(e) => setdate(e.target.value)} style={{ margin: '20px', width: '200px' }} placeholder='минуты' />
                <div onClick={() => reg(clas)} className='more' style={{ width: '360px', margin: '24px' }}><p>оправить</p></div>
            </div>
            <div className={styles.content} style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{margin:'20px'}}>время первого матча</p>
                <input type="time" value={time} onChange={(e) => settime(e.target.value)} style={{ margin: '20px', width: '400px' }}/>
            </div>
            <div className={styles.content} style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{margin:'20px'}}>время второго матча</p>
                <input type="time" value={time1} onChange={(e) => settime1(e.target.value)} style={{ margin: '20px', width: '400px' }}/>
            </div>
        </>
    );
}

export default Content;