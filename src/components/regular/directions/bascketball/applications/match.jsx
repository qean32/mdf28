import styles from './content.module.css'
import { useContext, useState, useEffect } from 'react';
import context from '../../../../../connections/context';

const Match = ({ el }) => {
    console.log(el)
    let { user } = useContext(context)
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
            setdir(data.results[0]?.director?.id)
        }
    }
    useEffect(() => {
        SearhDIR()
    }, [])
    let accept = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/update/application_meeting/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ is_accept: true })
        })
        let data = await response.json()
        location.reload()
    }
    let reg = async (el) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/reg/meeting/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: el.team_one.id, team_two: el.team_two.id , date: el.date })
        })
        let data = await response.json()
        on()
    }
    let regm = async (el,id) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/reg/match/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: el.team_one.id, team_two: el.team_two.id , time: el.time1, meeting: id })
        })
        let data = await response.json()
    }
    let regm1 = async (el,id) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/reg/match/`, {
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
        let response = await fetch(`https://mdf28server.site/api/bascketball/update/application_meeting/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_on: true })
        })
        let data = await response.json()
        location.reload()
    }
    return (
        <>
            {el.team_one && el.team_two && <><div className={styles.content}>
                <div className={styles.match}>
                    <div className={styles.team}><p>{el.team_one.team_name}</p></div>
                    <div className={styles.info}>
                        <img src='/mdf28/svg/friends.svg' />
                    </div>
                    <div className={styles.team}><p>{el.team_two.team_name}</p></div>
                    <div className={styles.infoo}>
                        <p>{el.date}</p>
                        <p>b0{el.matches}</p>
                    </div>
                    {el.is_accept && <p style={{ color: 'green', margin: '15px' }}> принято </p>}
                    {!el.is_accept && <p style={{ color: '#E74343', margin: '10px' }}> не принято </p>}
                    {el.is_on && <p style={{ color: 'green', margin: '15px' }}> одобренно </p>}
                    {!el.is_on && <p style={{ color: '#E74343', margin: '15px' }}>не одобренно </p>}
                </div>
            </div>
                {<div style={{ display: 'flex', marginTop: '15px', transform: 'translateX(-80px)' }}>
                    {dir == el.team_two.director && !el.is_accept && <div onClick={() => accept(el.id)} className='more'><p>принять</p></div>}
                    {user.is_org && !el.is_on && <div className='more' onClick={() => reg(el)}><p>одобрить</p></div>}
                </div>}
            </>
            }
        </>
    );
}

export default Match;