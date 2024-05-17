import styles from './meeting.module.css'
import context from '../../../../connections/context';
import { useContext, useEffect, useState } from 'react';

const Match = ({ el, host, direction, str_direction,team_one_, team_two_ }) => {
    let { user } = useContext(context)
    const [time1, settime1] = useState('')
    const [team1, setteam1] = useState()
    const [team2, setteam2] = useState()
    const [team1_ball__, setteam1_ball__] = useState()
    const [team2_ball__, setteam2_ball__] = useState()
    const [idmatch, setidmatch] = useState()
    const [idwin_, setidwin_] = useState()
    const [playersteam1, setplayersteam1] = useState([])
    const [playersteam2, setplayersteam2] = useState([])
    let SearchPlayerTeam1 = async () => {
        if (el?.team_one?.id) {
            let response = await fetch(`${host}/api/unification/search/player/?team=${el?.team_one?.id}&offset=0&limit=16`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setplayersteam1(data.results)
        }
    }
    let SearchPlayerTeam2 = async () => {
        if (el?.team_two?.id) {
            let response = await fetch(`${host}/api/unification/search/player/?team=${el?.team_two?.id}&offset=0&limit=16`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setplayersteam2(data.results)
        }
    }
    useEffect(() => {
        SearchPlayerTeam1()
        SearchPlayerTeam2()
    }, [])

    let UpdatePlayer = async (player) => {
        let zxc;
        if (player.matches_in_offers == 0) {
            zxc = 0
        } else {
            zxc = player.matches_in_offers - 1
        }
        let zxc1;
        if (player?.team?.id == idwin_) {
            zxc1 = player.win_matches + 1
        } else {
            zxc1 = player.win_matches
        }
        let response = await fetch(`${host}/api/unification/update/player_org/${str_direction}/${player.user.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ matches_in_offers: zxc, matches: player.matches + 1, win_matches: zxc1 })
        })
        let data = await response.json()
    }

    let UpdateTeam = async (team) => {
        let zxc1;
        if (team?.id == idwin_) {
            zxc1 = team.win_matches + 1
        } else {
            zxc1 = team.win_matches
        }
        let response = await fetch(`${host}/api/unification/update_org/team/${team.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ matches: team?.matches + 1, win_matches: zxc1 })
        })
        let data = await response.json()
    }

    let UpdateTime = async (id) => {
        let response = await fetch(`${host}/api/unification/update/match_director/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ time: time1 })
        })
        let data = await response.json()
        location.reload()
    }
    let Update = async (id) => {
        UpdateTeam(el?.team_one)
        UpdateTeam(el?.team_two)
        for (let index = 0; index < playersteam1.length; index++) {
            const element = playersteam1[index];
            UpdatePlayer(element)
        }
        for (let index = 0; index < playersteam2.length; index++) {
            const element = playersteam2[index];
            UpdatePlayer(element)
        }
        let response = await fetch(`${host}/api/unification/update/match_org/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ team_one_score: team1_ball__, team_two_score: team2_ball__, win_team: idwin_, id_match: idmatch })
        })
        let data = await response.json()
        location.reload()
    }
    let UpdateTeams = async (id) => {
        let response = await fetch(`${host}/api/unification/update/match_org/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ team_one: team1, team_two: team2 })
        })
        let data = await response.json()
        location.reload()
    }
    return (
        <>
            <div className={styles.content2}>
                <p style={{ position: 'absolute', top: '15px', right: '40px', zIndex: '20' }}>ID MATCH: <br></br> {el.id_match}</p>
                <div className={styles.match}>
                    <div className={styles.team}><p>{el.team_one?.name}</p><div className={styles.line} style={el.win_team?.id == el.team_one?.id ? { opacity: '1' } : {}}></div></div>
                    <div className={styles.info}>
                        <p style={{ transform: 'translateX(-1px)' }}>{el.team_one_score ? el.team_one_score : 0} : {el.team_two_score ? el.team_two_score : 0}</p>
                        <img src='/svg/friends.svg' style={{ transform: 'translateX(-1px)' }} />
                    </div>
                    <div className={styles.team}><p>{el.team_two?.name}</p><div className={styles.line} style={el.win_team?.id == el.team_two?.id ? { opacity: '1' } : {}}></div></div>
                    <div className={styles.infoo} style={{ marginTop: '10px', transform: 'translateX(-35px)' }}>
                        <p>{el.time ? el.time : '------"'}</p>
                        <p>{el.date ? el.date : '------"'}</p>
                    </div>
                </div>
            </div>
            <div className={styles.moreInfo}>
                {!el.id_match ? <div className={styles.repair}><img src="/svg/repair.svg" alt="" style={{ height: '140px' }} /><p>информация отсутствует</p></div> : <div className={styles.repair}><img src="/svg/repair.svg" alt="" style={{ height: '140px' }} /><a href={`https://www.dotabuff.com/matches/${el.id_match}`} style={{color: '#E74343', margin: '20px'}} target="_blank" >ссылка на дотабафф</a></div>}
            </div>
            {user?.is_org && <div style={{ display: 'flex', transform: 'translateX(-68px)' }}>
                <input type="time" onChange={(e) => settime1(e.target.value)} name="" id="" style={{ width: '200px' }} />
                <div className='more' onClick={() => UpdateTime(el.id)} style={{ width: '450px', marginTop: '13px' }}><p>изменить время матча</p></div>
            </div>
            }
            {user?.is_org && <div className={styles.content} style={{ transform: 'translateX(-68px)' }}>
                            <p>первая команда {team_one_?.name} - {team_one_?.id}</p>
                            <p>вторая команда {team_two_?.name} - {team_two_?.id}</p>
                <input type='number' value={team1_ball__} onChange={(e) => setteam1_ball__(e.target.value)} placeholder='счет первой команды' />
                <input type='number' value={team2_ball__} onChange={(e) => setteam2_ball__(e.target.value)} placeholder='счет второй команды' />
                <input type='number' value={idwin_} onChange={(e) => setidwin_(e.target.value)} placeholder='ид победителя' />
                <input type='number' value={idmatch} onChange={(e) => setidmatch(e.target.value)} placeholder='ид матч' />
                <div className='more' onClick={() => Update(el.id)}><p>завершить матч</p></div>
                <input type='number' value={team1} onChange={(e) => setteam1(e.target.value)} placeholder='ид первой команды' />
                <input type='number' value={team2} onChange={(e) => setteam2(e.target.value)} placeholder='ид второй команды' />
                <div className='more' onClick={() => UpdateTeams(el.id)}><p>изменить команды</p></div>
            </div>
            }
        </>
    );
}

export default Match;