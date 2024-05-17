import { useContext, useEffect, useState } from 'react'
import styles from './reg_applications.module.css'
import { useNavigate } from 'react-router-dom';
import context from '../../../../connections/context';

const Reg_Applications = ({ host, direction, str_direction }) => {
    let { user } = useContext(context)
    const navigate = useNavigate();
    const [info, setInfo] = useState([])
    const [search_value, setsearch_value] = useState('')
    const [load1, setload1] = useState(false)
    let Searh = async () => {
        let response = await fetch(`${host}/api/unification/search/team/?limit=1&offset=0&direction=${direction}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        console.log(data)
        setInfo([...data.results])
    }
    useEffect(() => {
        Searh()
        SearhDirector()
    }, [])
    let SearhTeam = async () => {
        setclas(false)
        let response = await fetch(`${host}/api/unification/search/team/?search=${search_value}&limit=1&offset=0&direction=${direction}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        console.log(data)
        setInfo([...data.results])
    }
    useEffect(() => {
        if (search_value.length <= 0) {
            Searh()
        } else if (search_value.length >= 2) {
            SearhTeam(search_value)
        }
    }, [search_value])

    const ChangeHandler = (e) => {
        setsearch_value(e.target.value)
        setload1(true)
        setTimeout(() => {
            setload1(false)
        }, 300);
    }
    const [clas, setclas] = useState(false)
    const ClickHandler = (num) => {
        if (clas) {
            setclas(false)
        } else {
            setclas(num)
        }
    }
    const Registration = async (id) => {
        const response = await fetch(`${host}/api/unification/reg/application/meeting/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: director, team_two: id, time1: time, date: date, time2: time1, direction: direction })
        })
        let data = await response.json()
        navigate(`/${str_direction}/meeting/applications`)
    }
    const [director, setdirector] = useState(false)
    let SearhDirector = async () => {
        let response = await fetch(`${host}/api/unification/search/team/?director=${user.user_id}`, {
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
    const [date, setdate] = useState('2024-04-04')
    const [time, settime] = useState('20:20')
    const [time1, settime1] = useState('21:20')
    return (
        <>
            <div className={styles.content}>
                <div className={styles.headerr}>
                    <div>
                        <input type='text' onChange={ChangeHandler} value={search_value} className={styles.Input} placeholder='найти команду' maxLength={255} /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    <div className={styles.panel}>
                        <p style={{ left: '10%' }}>команда</p>
                        <p style={{ left: '68%', transform: 'translateY(2px)' }}>матчи\турниры</p>
                    </div>
                    {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>
                        {info && info.map((el) => (<div onClick={() => ClickHandler(el.id)} key={el.id} className={styles.info_el}><div style={{ backgroundImage: `url(${el.logo})` }} className={styles.ava}></div><p>{el.name}
                            {el.is_recognized && <img src='/svg/venok.svg' id={styles.id_2} />}</p><div className={styles.info}><p><div><img src="/svg/flag.svg" />
                                {el.matches}<img src="/svg/cup.svg" style={{ transform: "translateY(1px)" }} />{el.tournament}</div></p></div>
                            <div> <img style={clas ? { opacity: 1, height: '30px', margin: '15px', marginRight: '25px' } : { opacity: 0 }} src='/svg/accept.svg' /> </div></div>))}</>}
                </div>
            </div>
            <div className={styles.content} style={{ padding: '10px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <input type="date" value={date} onChange={(e) => setdate(e.target.value)} style={{ margin: '20px', width: '200px' }} placeholder='минуты' />
                    <div onClick={() => Registration(clas)} className='more' style={{ width: '360px', margin: '24px' }}><p>оправить</p></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ margin: '20px' }}>время первого матча</p>
                    <input type="time" value={time} onChange={(e) => settime(e.target.value)} style={{ margin: '20px', width: '400px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p style={{ margin: '20px' }}>время второго матча</p>
                    <input type="time" value={time1} onChange={(e) => settime1(e.target.value)} style={{ margin: '20px', width: '400px' }} />
                </div>
            </div>
        </>
    );
}

export default Reg_Applications;