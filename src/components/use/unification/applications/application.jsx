import styles from './application.module.css'
import { useContext, useState, useEffect } from 'react';
import context from '../../../../connections/context';

const Application = ({ el, host, direction, str_direction }) => {
    let { user } = useContext(context)
    const [director, setdirector] = useState(false)
    let SearhDirector = async () => {
        if (user) {
            let response = await fetch(`${host}/api/unification/search/team/?director=${user.user_id}&direction=${direction}&limit=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            if (data.results[0]?.id) {
                setdirector(data.results[0]?.director?.id)
            }
        }
    }
    useEffect(() => {
        SearhDirector()
    }, [])
    let Accept = async (id) => {
        let response = await fetch(`${host}/api/unification/update/application/meeting/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ is_accept: true })
        })
        let data = await response.json()
        location.reload()
    }
    let Registration = async (el) => {
        let response = await fetch(`${host}/api/unification/reg/meeting/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: el.team_one.id, team_two: el.team_two.id, date: el.date, direction: direction })
        })
        let data = await response.json()
        Regmatch(el, data.id)
        Regmatch1(el, data.id)
    }
    let Regmatch = async (el, id) => {
        let response = await fetch(`${host}/api/unification/reg/match/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: el.team_one.id, team_two: el.team_two.id, time: el.time1, meeting: id, direction: direction })
        })
        let data = await response.json()
    }
    let Regmatch1 = async (el, id) => {
        let response = await fetch(`${host}/api/unification/reg/match/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: el.team_one.id, team_two: el.team_two.id, time: el.time2, meeting: id, direction: direction  })
        })
        let data = await response.json()
        on(el.id)
    }
    let on = async (id) => {
        let response = await fetch(`${host}/api/unification/update/application/meeting/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ is_on: true })
        })
        let data = await response.json()
        location.reload()
    }
    return (
        <>
            {<><div className={styles.content}>
                <div className={styles.match}>
                    <div className={styles.team}><p>{el.team_one?.name}</p></div>
                    <div className={styles.info}>
                        <img src='/svg/friends.svg' style={{marginTop: '10px'}}/>
                    </div>
                    <div className={styles.team}><p>{el.team_two?.name}</p></div>
                    <div className={styles.infoo}>
                        <p>{el.date}</p>
                        <p>b0{el.matches}</p>
                    </div>
                    {el.is_accept ? <><p>кеп</p><img className={styles.accept} src='/svg/accept.svg' /></> : <><p>кеп</p><img className={styles.accept} src='/svg/an_accept.svg' /></>}
                    {el.is_on ? <><p>орг</p><img className={styles.accept} src='/svg/accept.svg' /></>  : <><p>орг</p><img className={styles.accept} src='/svg/an_accept.svg' /></> }
                </div>
                {<div style={{ display: 'flex', marginBottom: '15px'}}>
                    {director == el.team_two?.director && !el.is_accept && <div onClick={() => Accept(el.id)} className='more'><p>принять</p></div>}
                    {user?.is_org && !el.is_on && <div className='more' onClick={() => Registration(el)}><p>одобрить</p></div>}
                </div>}
            </div>
            </>
            }
        </>
    );
}

export default Application;