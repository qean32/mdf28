import { useContext, useEffect, useState } from 'react'
import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';
import context from '../../../../../connections/context';

const Content = () => {
    let host = 'https://mdf28server.site'
    let direction = 'bascketball'
    let { user } = useContext(context)
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [search_value, setsearch_value] = useState('')
    const [load1, setload1] = useState(false)
    let Searh = async () => {
        setclas(false)
        let response = await fetch(`${host}/api/${direction}/search/team/?limit=1&offset=0`, {
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
        Searhdirector()
    }, [])
    let SearhTeam = async () => {
        setclas(false)
        let response = await fetch(`${host}/api/${direction}/search/team/?search=${search_value}&limit=1&offset=0`, {
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
            Searh()
        } else if (search_value.length >= 2) {
            SearhTeam(search_value)
        }
    }, [search_value])
    const changeHolder = (e) => {
        setsearch_value(e.target.value)
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
        const response = await fetch(`${host}/api/${direction}/reg/application_meeting/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: director, team_two: id, time: time, date: date})
        })
        let data = await response.json()
        navigate(`/${direction}/meeting/applications`)
    }
    const [director, setdirector] = useState(false)
    let Searhdirector = async () => {
        let response = await fetch(`${host}/api/${direction}/search/team/?director=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0].id) {
            setdirector(data.results[0].id)
        }
    }
    const [date, setdate] = useState('2024-04-01')
    const [time, settime] = useState('20:20')
    return (
        <>
            <div className={styles.content}>
                <div className={styles.headerr}>
                    <div>
                        <input type='text' onChange={changeHolder} value={search_value} className={styles.Input} placeholder='найти команду' maxLength={255} /><img src='/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    <div className={styles.panel}>
                        <p style={{ left: '10%' }}>команда</p>
                        <p style={{ left: '68%', transform: 'translateY(2px)' }}>матчи\турниры</p>
                    </div>
                    {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>
                        {info && info.map((el) => (<div onClick={() => clickHandler(el.id)} className={styles.info_el}><div style={{ backgroundImage: `url(${el.logo})` }} className={styles.ava}></div><p>{el.team_name}
                            {el.is_recognized && <img src='/svg/venok.svg' id={styles.id_2} />}</p><div className={styles.info}><p><div><img src="/svg/flag.svg" />{el.matches}<img src="/svg/cup.svg" style={{ transform: "translateY(1px)" }} />{el.tournament}</div></p></div><div style={clas ? { height: '20px', width: '20px', background: '#228b22', opacity: '1', position: 'absolute', right: '30px', marginTop: '17px', borderRadius: '5px' } : { height: '20px', width: '20px', background: '#228b22', opacity: '0', position: 'absolute', right: '30px', marginTop: '17px', borderRadius: '5px' }}></div></div>))}</>}
                </div>
            </div>
            <div className={styles.content} style={{ display: 'flex', flexDirection: 'row' }}>
                <input type="date"  value={date} onChange={(e) => setdate(e.target.value)} style={{ margin: '20px', width: '200px' }} placeholder='минуты' />
                <div onClick={() => reg(clas)} className='more' style={{ width: '360px', margin: '24px' }}><p>оправить</p></div>
            </div>
            <div className={styles.content} style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{margin:'20px'}}>время матча</p>
                <input type="time" value={time} onChange={(e) => settime(e.target.value)} style={{ margin: '20px', width: '400px' }}/>
            </div>
            {/* <div className={styles.content} style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{margin:'20px'}}>время второго матча</p>
                <input type="time" value={time1} onChange={(e) => settime1(e.target.value)} style={{ margin: '20px', width: '400px' }}/>
            </div> */}
        </>
    );
}

export default Content;