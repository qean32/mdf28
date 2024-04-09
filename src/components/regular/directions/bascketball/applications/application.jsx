import styles from './content.module.css'
import { useContext, useState, useEffect } from 'react';
import context from '../../../../../connections/context';

const Application = ({ el }) => {
    let host = 'https://mdf28server.site'
    let direction = 'bascketball'
    let { user } = useContext(context)
    const [director, setdirector] = useState(false)
    let SearhDirector = async () => {
        let response = await fetch(`${host}/api/${direction}/search/team/?director=${user.user_id}`, {
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
    useEffect(() => {
        SearhDirector()
    }, [])
    let accept = async (id) => {
        let response = await fetch(`${host}/api/${direction}/update/application_meeting/${id}/`, {
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
    let reg = async (el) => {
        let response = await fetch(`${host}/api/${direction}/reg/meeting/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: el.team_one.id, team_two: el.team_two.id , date: el.date, time: el.time })
        })
        let data = await response.json()
        regmatch(el,data.id)
        regmatch1(el,data.id)
    }
    let regmatch = async (el,id) => {
        let response = await fetch(`${host}/api/${direction}/reg/match/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: el.team_one.id, team_two: el.team_two.id , time: el.time1, meeting: id })
        })
        let data = await response.json()
    }
    let regmatch1 = async (el,id) => {
        let response = await fetch(`${host}/api/${direction}/reg/match/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: el.team_one.id, team_two: el.team_two.id , time: el.time2, meeting: id })
        })
        let data = await response.json()
        on(el.id)
    }
    let on = async (id) => {
        let response = await fetch(`${host}/api/${direction}/update/application_meeting/${id}/`, {
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
                    <div className={styles.team}><p>{el.team_one?.team_name}</p></div>
                    <div className={styles.info}>
                        <img src='/svg/friends.svg' />
                    </div>
                    <div className={styles.team}><p>{el.team_two?.team_name}</p></div>
                    <div className={styles.infoo}>
                        <p>{el.date}</p>
                        <p>b0{el.matches}</p>
                    </div>
                    {el.is_accept ? <p style={{ color: 'green', margin: '15px' }}> принято </p> : <p style={{ color: '#E74343', margin: '10px' }}> не принято </p> }
                    {el.is_on ? <p style={{ color: 'green', margin: '15px' }}> одобренно </p> : !el.is_on && <p style={{ color: '#E74343', margin: '15px' }}>не одобренно </p>}
                </div>
            </div>
                {<div style={{ display: 'flex', marginTop: '15px', transform: 'translateX(-80px)' }}>
                    {director == el.team_two?.director && !el.is_accept && <div onClick={() => accept(el.id)} className='more'><p>принять</p></div>}
                    {user?.is_org && !el.is_on && <div className='more' onClick={() => reg(el)}><p>одобрить</p></div>}
                </div>}
            </>
            }
        </>
    );
}

export default Application;