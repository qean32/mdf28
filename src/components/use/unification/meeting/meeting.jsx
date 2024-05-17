import { useContext, useEffect, useState } from 'react'
import styles from './meeting.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import context from '../../../../connections/context';
import Match from './match';

const Meeting = ({ host, direction, str_direction }) => {
    let { user } = useContext(context)
    const [match, setmatch] = useState(false)
    const [match_match, setmatch_match] = useState(false)
    let { id } = useParams()
    let SearchMatch = async (id) => {
        let response = await fetch(`${host}/api/unification/search/match/?meeting=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmatch_match(data.results)
    }
    let SearhMeeting = async (id) => {
        let response = await fetch(`${host}/api/unification/search/meeting/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmatch(data.results[0])
    }

    useEffect(() => {
        SearhMeeting(id)
        SearchMatch(id)
    }, [])

    const navigate = useNavigate();
    let Update = async () => {
        let response = await fetch(`${host}/api/unification/update/meeting_org/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one_score: team1_ball, team_two_score: team2_ball, team_one_ball: team1_ball_, team_two_ball: team2_ball_, win_team: idwin, date: date })
        })
        let data = await response.json()
    }
    let UpdateTeams = async () => {
        let response = await fetch(`${host}/api/unification/update/meeting_org/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one: id1, team_two: id2 })
        })
        let data = await response.json()
        location.reload()
    }
    const [team1_ball, setteam1_ball] = useState()
    const [team2_ball, setteam2_ball] = useState()
    const [team1_ball_, setteam1_ball_] = useState()
    const [team2_ball_, setteam2_ball_] = useState()
    const [idwin, setidwin] = useState()
    const [searh_value, setsearh_value] = useState('')
    const [info, setInfo] = useState([])
    useEffect(() => {
        if (searh_value.length <= 1) {
            let SearhTeam__ = async () => {
                let response = await fetch(`${host}/api/unification/search/team/?limit=1&offset=0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                let data = await response.json()
                setInfo([...data.results])
            }
            SearhTeam__()
        } else if (searh_value.length >= 2) {
            SearhTeam_(searh_value)
        }
    }, [searh_value])
    let SearhTeam_ = async () => {
        let response = await fetch(`${host}/api/unification/search/team/?search=${searh_value}&limit=1&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setInfo([...data.results])
    }
    const ChangeHandler = (e) => {
        setsearh_value(e.target.value)
    }
    const [id1, setid1] = useState()
    const [id2, setid2] = useState()
    const [date, setdate] = useState()

    return (
        <>
            {match.team_one &&
                <>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate(-1)} />
                            <div><p onClick={() => navigate(`/team/${match?.team_one?.id}`)} style={{ transition: '.7s' }}>{match.team_one?.name} </p><div onClick={() => navigate(`/${str_direction}/team/${match?.team_one?.id}`)} className={styles.ava} style={{ backgroundImage: `url(${match.team_one?.logo})`, marginRight: '0' }}></div>  </div>
                            <div style={{ transform: 'translateY(-5px)' }}>
                                {match.is_qualification && <><p style={{ fontSize: '24px' }}>{match.team_one_ball ? match.team_one_ball : 0} : {match.team_two_ball ? match.team_two_ball : 0}</p><p style={{ marginBlock: '0px', color: '#E74343' }}>квалификация</p></>}
                                {!match.is_qualification && <><p style={{ fontSize: '24px' }}>{match.team_one_score ? match.team_one_score : 0} : {match.team_two_score ? match.team_two_score : 0}</p></>}
                                {match.is_friends && <img src='/svg/friends.svg' />}
                                {!match.is_friends && <img src='/svg/cup.svg' style={{ height: '27px' }} />}
                                <p style={{ fontSize: '22px' }}>
                                    <p>{match.date ? match.date : '------"'}</p></p>
                            </div>
                            <div><p onClick={() => navigate(`/team/${match?.team_two?.id}`)} style={{ transition: '.7s' }}> {match.team_two?.name} </p> <div onClick={() => navigate(`/team/${match?.team_two?.id}`)} className={styles.ava} style={{ backgroundImage: `url(${match.team_two?.logo})`, marginRight: '0' }}></div>  </div>
                        </div>
                        <div className={styles.body}>
                            <img src="/svg/sword.svg" id={styles.id_32} />
                            <div>
                                <div>
                                    <p style={{ position: 'absolute', top: '50%', right: '36%' }}>состав не закреплен</p>
                                </div>
                            </div>
                            <div style={{ marginTop: '40px' }}>
                                <div>
                                    <p style={{ position: 'absolute', top: '50%', right: '36%' }}>состав не закреплен</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {match_match && match_match.map((el) => <Match host={host} team_one_={match.team_one} team_two_={match.team_two} key={el.id} el={el} />)}
                    {user?.is_org && <>
                        <div className={styles.content} style={{ transform: 'translateX(-68px)' }}>
                            <p>обновление встречи</p>
                            <p>первая команда {match?.team_one?.name} - {match?.team_one?.id}</p>
                            <p>вторая команда {match?.team_two?.name} - {match?.team_two?.id}</p>
                            <input type='number' value={team1_ball} onChange={(e) => setteam1_ball(e.target.value)} placeholder='счет первой тим' />
                            <input type='number' value={team2_ball} onChange={(e) => setteam2_ball(e.target.value)} placeholder='счет второй тим' />
                            <input type='number' value={team1_ball_} onChange={(e) => setteam1_ball_(e.target.value)} placeholder='баллы первой тим' />
                            <input type='number' value={team2_ball_} onChange={(e) => setteam2_ball_(e.target.value)} placeholder='баллы второй тим' />
                            <input type='number' value={idwin} onChange={(e) => setidwin(e.target.value)} placeholder='ид победителя' />
                            <input type="date" value={date} onChange={(e) => setdate(e.target.value)} style={{ margin: '20px', width: '100px' }} />
                            <div className='more' onClick={() => Update()}><p>завершить встречу</p></div>
                        </div>
                    </>}
                    <div style={{ height: '40px' }}></div>
                </>
            }
            {user?.is_org && <>
                <div className={styles.content}>
                    <div className={styles.headerr}>
                        <div>
                            <input type='text' onChange={ChangeHandler} value={searh_value} className={styles.Input} placeholder='найти команду' maxLength={255} /><img src='/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
                        </div>
                    </div>
                    <div>
                        <div className={styles.panel}>
                        </div><>
                            {info && info.map((el) => (<div key={el.id} className={styles.info_el}><div style={{ backgroundImage: `url(${el.logo})` }} className={styles.ava}></div><p>{el.name}
                                {el.is_recognized && <img src='/svg/venok.svg' id={styles.id_2} />}</p><div className={styles.info}><p>ID {el.id}</p></div></div>))}</>
                    </div>
                <input type='number' value={id1} onChange={(e) => setid1(e.target.value)} placeholder='первая команда' />
                <input type='number' value={id2} onChange={(e) => setid2(e.target.value)} placeholder='вторая команда' />
                <div className='more' onClick={() => UpdateTeams()}><p>поставить команды</p></div>
                </div>
            </>}
            {!match.team_one && <div className={styles.content} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                <img src="/svg/long_arrow.svg" id={styles.id_04} onClick={() => navigate(-1)} />
                <img src="/svg/repair.svg" style={{ height: '120px', marginTop: '120px' }} alt="" />
                <p style={{margin: '60px'}}>нет информации о встрече</p>
            </div>}
        </>
    );
}

export default Meeting;