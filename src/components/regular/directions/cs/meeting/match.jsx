import styles from './content.module.css'
import context from '../../../../../connections/context';
import { useContext, useEffect, useState } from 'react';
import Record from './record';

const Match = ({ el }) => {
    let host = 'https://mdf28server.site'
    let direction = 'cs'
    let { user } = useContext(context)
    const [record, setrecord] = useState([])
    let SearchRecord = async () => {
        let response = await fetch(`${host}/api/${direction}/search/record_stat/?match=${el.id}&limit=24`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setrecord(data.results)
    }
    useEffect(() => {
        SearchRecord()
    }, [])

    const [time1, settime1] = useState('')
    const [team1, setteam1] = useState()
    const [team2, setteam2] = useState()
    const [team1_ball__, setteam1_ball__] = useState()
    const [team2_ball__, setteam2_ball__] = useState()
    const [idmatch, setidmatch] = useState()
    const [idwin_, setidwin_] = useState()
    const [playersteam1, setplayersteam1] = useState([])
    const [playersteam2, setplayersteam2] = useState([])

    let Searchplayerteam1 = async () => {
        if (el?.team_one?.id) {
            let response = await fetch(`${host}/api/${direction}/search/player/?team=${el?.team_one?.id}&offset=0&limit=16`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setplayersteam1(data.results)
        }
    }
    let Searchplayerteam2 = async () => {
        if (el?.team_two?.id) {
            let response = await fetch(`${host}/api/${direction}/search/player/?team=${el?.team_two?.id}&offset=0&limit=16`, {
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
        Searchplayerteam1()
        Searchplayerteam2()
    }, [])

    let UpdatePlayer = async (player) => {
        let zxc;
        if (player.matches_in_offers == 0) {
            zxc = 0
        } else {
            zxc = player.matches_in_offers - 1
        }
        let zxc1;
        if (player?.team?.id == idwin) {
            zxc1 = player.win_matches + 1
            console.log('player')
        } else {
            zxc1 = player.win_matches
        }
        let response = await fetch(`${host}/api/${direction}/update/player_director/${player.user.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ matches_in_offers: zxc, matches: player.matches + 1, win_matches: zxc1 })
        })
        let data = await response.json()
    }

    let upteam = async (team) => {
        let zxc1;
        if (team?.id == idwin_) {
            zxc1 = team.win_matches + 1
        } else {
            zxc1 = team.win_matches
        }
        let response = await fetch(`${host}/api/${direction}/update_org/team/${team.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ matches: team?.matches + 1, win_matches: zxc1 })
        })
        let data = await response.json()
    }
    let [first_team, setfirst_team] = useState([])
    let [second_team, setsecond_team] = useState([])

    useEffect(() => {
        if (record) {
            setfirst_team(record.filter((el) => el.first_team == true))
            setsecond_team(record.filter((el) => el.first_team != true))
        }
    }, [record])

    let upmatch = async (id) => {
        let response = await fetch(`${host}/api/${direction}/update/match_director/${id}/`, {
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
    let upmatch_org = async (id) => {
        upteam(el?.team_one)
        upteam(el?.team_two)
        for (let index = 0; index < playersteam1.length; index++) {
            const element = playersteam1[index];
            UpdatePlayer(element)
        }
        for (let index = 0; index < playersteam2.length; index++) {
            const element = playersteam2[index];
            UpdatePlayer(element)
        }
        let response = await fetch(`${host}/api/${direction}/update/match_org/${id}/`, {
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
    let upmatch_org_team = async (id) => {
        let response = await fetch(`${host}/api/${direction}/update/match_org/${id}/`, {
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

    const [kill, setkill] = useState()
    const [assist, setassist] = useState()
    const [death, setdeath] = useState()
    const [dmg, setdmg] = useState()
    const [user_, setuser_] = useState()
    const [win, setwin] = useState()
    const [first_team_, setfirst_team_] = useState()

    let regrecord = async () => {
        let response = await fetch(`${host}/api/${direction}/reg/record_stat/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ kill: kill, assist: assist, death: death, damage: dmg, user: user_, match: el.id, first_team: first_team_, win: win })
        })
        let data = await response.json()
        console.log(data)
    }
    return (
        <>
            <div className={styles.content2}>
                <p style={{ position: 'absolute', top: '15px', right: '40px' }}>ID MATCH: <br></br> {el.id_match}</p>
                <div className={styles.match}>
                    <div className={styles.team}><p>{el.team_one?.team_name}</p><div className={styles.line} style={el.win_team?.id == el.team_one?.id ? { opacity: '1' } : {}}></div></div>
                    <div className={styles.info}>
                        <p style={{ transform: 'translateX(-1px)' }}>{el.team_one_score ? el.team_one_score : 0} : {el.team_two_score ? el.team_two_score : 0}</p>
                        <img src='/svg/friends.svg' style={{ transform: 'translateX(-1px)' }} />
                    </div>
                    <div className={styles.team}><p>{el.team_two?.team_name}</p><div className={styles.line} style={el.win_team?.id == el.team_two?.id ? { opacity: '1' } : {}}></div></div>
                    <div className={styles.infoo} style={{ marginTop: '10px', transform: 'translateX(-35px)' }}>
                        <p>{el.time ? el.time : '------"'}</p>
                        <p>{el.date ? el.date : '------"'}</p>
                    </div>
                </div>
            </div>
            <div className={styles.moreInfo}>
                {record.length == 0 ? <><div className={styles.repair}><img src="/svg/repair.svg" alt="" style={{ height: '140px' }} /><p>информация отсутствует</p></div></>
                    :
                    <><div>
                        <div className={styles.list}><p style={{ marginLeft: '5px' }}>пользователь</p> <p style={{ marginLeft: '455px' }}>У/С/П/dmg</p></div>
                        <p className={styles.team_name_}>{el.team_one.team_name}</p>
                        {first_team.map((el) => <Record el={el} />)}
                    </div>
                        <div>
                            <p className={styles.team_name_}>{el.team_two.team_name}</p>
                            {second_team.map((el) => <Record el={el} />)}
                        </div>
                    </>
                }
                {user?.is_org ? <div className={styles.record_reg}>
                    <p>{el.team_one?.team_name}</p>
                    <div>
                        <div className={styles.team_}>{playersteam1.map((el) => <>{el.user?.first_name} {el.user?.last_name} {el.user?.id}</>)}</div>
                    </div>
                    <p>{el.team_two?.team_name}</p>
                    <div className={styles.team_}>
                        <div className={styles.team_}>{playersteam2.map((el) => <>{el.user?.first_name} {el.user?.last_name} {el.user?.id}</>)}</div>
                    </div>
                    <div>
                        
                    <input type="number" onChange={(e) => setkill(e.target.value)} placeholder="kill" id="" />
                    <input type="number" onChange={(e) => setdeath(e.target.value)} placeholder="death" id="" />
                    <input type="number" onChange={(e) => setassist(e.target.value)} placeholder="assist" id="" />
                    <input type="number" onChange={(e) => setdmg(e.target.value)} placeholder="dmg" id="" />
                    <input type="number" onChange={(e) => setuser_(e.target.value)} placeholder="user" id="" />
                    1 тим
                    <input type="checkbox" onChange={(e) => setfirst_team_(e.target.value)} name="" id="" />
                    win
                    <input type="checkbox" onChange={(e) => setwin(e.target.value)} name="" id="" />
                    <div className='more' onClick={() => regrecord()}><p>готово</p></div>
                    </div>
                </div> : <></>}
            </div>
            {user?.is_org && <div style={{ display: 'flex', transform: 'translateX(-68px)' }}>
                <input type="time" onChange={(e) => settime1(e.target.value)} name="" id="" style={{ width: '200px' }} />
                <div className='more' onClick={() => upmatch(el.id)} style={{ width: '450px', marginTop: '13px' }}><p>изменить время матча</p></div>
            </div>
            }
            {user?.is_org && <div style={{ transform: 'translateX(-68px)' }}>
                <input type='number' value={team1_ball__} onChange={(e) => setteam1_ball__(e.target.value)} placeholder='счет1' />
                <input type='number' value={team2_ball__} onChange={(e) => setteam2_ball__(e.target.value)} placeholder='счет2' />
                <p>{el?.team_one?.team_name} {el?.team_one?.id}</p>
                <p>{el?.team_two?.team_name} {el?.team_two?.id}</p>
                <input type='number' value={idwin_} onChange={(e) => setidwin_(e.target.value)} placeholder='ид победителя' />
                <input type='number' value={idmatch} onChange={(e) => setidmatch(e.target.value)} placeholder='ид матч' />
                <div className='more' onClick={() => upmatch_org(el.id)}><p>изменить матч</p></div>
                <input type='number' value={team1} onChange={(e) => setteam1(e.target.value)} placeholder='ид команды' />
                <input type='number' value={team2} onChange={(e) => setteam2(e.target.value)} placeholder='ид команды' />
                <div className='more' onClick={() => upmatch_org_team(el.id)}><p>изменить команды</p></div>
            </div>
            }
        </>
    );
}

export default Match;