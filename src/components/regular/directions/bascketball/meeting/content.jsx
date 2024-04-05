import { useContext, useEffect, useState } from 'react'
import styles from './content.module.css'
import { json, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Player from './player'
import Form from './form'
import context from '../../../../../connections/context';

const Content = () => {
    let { user } = useContext(context)
    const [match, setmatch] = useState(false)
    const [match_match, setmatch_match] = useState(false)
    const [player1, setplayer1] = useState(false)
    const [player2, setplayer2] = useState(false)
    const [player3, setplayer3] = useState(false)
    const [player4, setplayer4] = useState(false)
    const [player5, setplayer5] = useState(false)
    const [player6, setplayer6] = useState(false)
    const [player7, setplayer7] = useState(false)
    const [player8, setplayer8] = useState(false)
    const [player9, setplayer9] = useState(false)
    const [player10, setplayer10] = useState(false)
    let { id } = useParams()
    let SearchMatch = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/search/match/?meeting=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmatch_match(data.results)
    }
    let SearhUser = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/search/meeting/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmatch(data.results[0])
        console.log(data)
    }
    let Searchplayer = async (user, set) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/search/player/?user=${user}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data?.results[0]) {
            set(data.results[0])
        }
    }
    useEffect(() => {
        if (match) {
            if (match.teams_structure_one[0]) {
                Searchplayer(match.teams_structure_one[0], setplayer1)
            }
            if (match.teams_structure_one[1]) {
                Searchplayer(match.teams_structure_one[1], setplayer2)
            }
            if (match.teams_structure_one[2]) {
                Searchplayer(match.teams_structure_one[2], setplayer3)
            }
            if (match.teams_structure_one[3]) {
                Searchplayer(match.teams_structure_one[3], setplayer4)
            }
            if (match.teams_structure_one[4]) {
                Searchplayer(match.teams_structure_one[4], setplayer5)
            }
            if (match.teams_structure_two[0]) {
                Searchplayer(match.teams_structure_two[0], setplayer6)
            }
            if (match.teams_structure_two[1]) {
                Searchplayer(match.teams_structure_two[1], setplayer7)
            }
            if (match.teams_structure_two[2]) {
                Searchplayer(match.teams_structure_two[2], setplayer8)
            }
            if (match.teams_structure_two[3]) {
                Searchplayer(match.teams_structure_two[3], setplayer9)
            }
            if (match.teams_structure_two[4]) {
                Searchplayer(match.teams_structure_two[4], setplayer10)
            }
        }
    }, [match])
    useEffect(() => {
        SearhUser(id)
        SearchMatch(id)
    }, [])
    const navigate = useNavigate();
    const [playersteam1, setplayersteam1] = useState([])
    const [playersteam2, setplayersteam2] = useState([])
    const [selected1, setselected1] = useState([])
    const [selected2, setselected2] = useState([])
    let Searchplayerteam1 = async () => {
        if (match?.team_one?.id) {
            let response = await fetch(`https://mdf28server.site/api/bascketball/search/player/?team=${match?.team_one?.id}&offset=0&limit=16`, {
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
        if (match?.team_two?.id) {
            let response = await fetch(`https://mdf28server.site/api/bascketball/search/player/?team=${match?.team_two?.id}&offset=0&limit=16`, {
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
        if (match) {
            Searchplayerteam1()
            Searchplayerteam2()
        }
    }, [match])
    const upteam1 = async () => {
        if (selected1.length > 4 && selected1.length < 6) {
            let response = await fetch(`https://mdf28server.site/api/bascketball/update/meeting_director/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                },
                body: JSON.stringify({ teams_structure_one: selected1 })
            })
            let data = await response.json()
            location.reload()
        }
    }
    const upteam2 = async () => {
        if (selected2.length > 4 && selected2.length < 6) {
            let response = await fetch(`https://mdf28server.site/api/bascketball/update/meeting_director/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                },
                body: JSON.stringify({ teams_structure_two: selected2 })
            })
            let data = await response.json()
            location.reload()
        }
    }
    let uppl = async (player) => {
        console.log(player)
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
        let response = await fetch(`https://mdf28server.site/api/bascketball/update/player_director/${player.user.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ matches_in_offers: zxc, matches: player.matches + 1, win_matches: zxc1 })
        })
        let data = await response.json()
        console.log(data)
    }
    let upteam = async (team) => {
        let zxc1;
        if (team?.id == idwin) {
            zxc1 = team.win_matches + 1
        } else {
            zxc1 = team.win_matches
        }
        let response = await fetch(`https://mdf28server.site/api/bascketball/update_org/team/${team.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ matches: team?.matches + 1, win_matches: zxc1 })
        })
        let data = await response.json()
    }
    let upmeeting = async () => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/update/meeting_org/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team_one_score: team1_ball, team_two_score: team2_ball, team_one_ball: team1_ball_, team_two_ball: team2_ball_, win_team: idwin })
        })
        let data = await response.json()
        console.log(data)
    }
    let upteams = async () => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/update/meeting_org/${id}/`, {
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
    const upof = () => {
        upmeeting()
        upteam(match?.team_one)
        upteam(match?.team_two)
        for (let index = 0; index < playersteam1.length; index++) {
            const element = playersteam1[index];
            uppl(element)
        }
        for (let index = 0; index < playersteam2.length; index++) {
            const element = playersteam2[index];
            uppl(element)
        }
    }
    const [team1_ball, setteam1_ball] = useState()
    const [team2_ball, setteam2_ball] = useState()
    const [team1_ball_, setteam1_ball_] = useState()
    const [team2_ball_, setteam2_ball_] = useState()
    const [team1_ball__, setteam1_ball__] = useState()
    const [team2_ball__, setteam2_ball__] = useState()
    const [idmatch, setidmatch] = useState()
    const [idwin, setidwin] = useState()
    const [idwin_, setidwin_] = useState()
    const [nameP, setnameP] = useState('')
    const [info, setInfo] = useState([])
    useEffect(() => {
        if (nameP.length <= 1) {
            let SearhPll = async () => {
                let response = await fetch(`https://mdf28server.site/api/bascketball/search/team/?limit=1&offset=0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                let data = await response.json()
                setInfo([...data.results])
            }
            SearhPll()
        } else if (nameP.length >= 2) {
            SearhPl(nameP)
        }
    }, [nameP])
    let SearhPl = async () => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/search/team/?search=${nameP}&limit=1&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setInfo([...data.results])
    }
    const changeHolder = (e) => {
        setnameP(e.target.value)
        setload1(true)
        setTimeout(() => {
            setload1(false)
        }, 300);
    }
    const [id1, setid1] = useState()
    const [id2, setid2] = useState()
    const [date, setdate] = useState('2024.04.01')
    const [time, settime] = useState('21:20')
    const [time1, settime1] = useState('')
    let upmatch = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/update/match_director/${id}/`, {
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
        let response = await fetch(`https://mdf28server.site/api/bascketball/update/match_org/${id}/`, {
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
    return (
        <>
            {match.team_one && match.team_two &&
                <>
                    <div className={styles.content}>
                        <div className={styles.header}>
                        <p style={{ position: 'absolute', bottom: '-11px', left: '20px' }}>адрес проведения:</p>
                            <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate('/bascketball/meetings')} />
                            <div><p onClick={() => navigate(`/bascketball/team/${match?.team_one?.id}`)} style={{ transition: '.7s' }}>{match.team_one?.team_name} </p><div onClick={() => navigate(`/dota/team/${match?.team_one?.id}`)} className={styles.ava} style={{ backgroundImage: `url(${match.team_one?.logo})`, marginRight: '0' }}></div>  </div>
                            <div style={{ transform: 'translateY(-5px)' }}>
                                {match.is_qualification && <><p style={{ fontSize: '24px' }}>{match.team_one_ball ? match.team_one_ball : 0} : {match.team_two_ball ? match.team_two_ball : 0}</p><p style={{ marginBlock: '0px', color: '#E74343' }}>квалификация</p></>}
                                {!match.is_qualification && <><p style={{ fontSize: '24px' }}>{match.team_one_score ? match.team_one_score : 0} : {match.team_two_score ? match.team_two_score : 0}</p></>}
                                {match.is_friends && <img src='/svg/friends.svg' />}
                                {!match.is_friends && <img src='/svg/cup.svg' style={{ height: '27px' }} />}
                                <p style={{ fontSize: '22px' }}>{match.date}</p>
                            </div>
                            <div><p onClick={() => navigate(`/bascketball/team/${match?.team_two?.id}`)} style={{ transition: '.7s' }}> {match.team_two?.team_name} </p> <div onClick={() => navigate(`/dota/team/${match?.team_two?.id}`)} className={styles.ava} style={{ backgroundImage: `url(${match.team_two?.logo})`, marginRight: '0' }}></div>  </div>
                        </div>
                        <div className={styles.body}>
                            <img src="/svg/sword.png" id={styles.id_32} />
                            <div>
                                <div>
                                    {player1 ? <>
                                        {player1 && <Form player={player1} stylee={{transform: 'translateY(-40px)'}} />}
                                        {player2 && <Form player={player2} stylee={{transform: 'translateY(-45px)'}} />}
                                        {player3 && <Form player={player3} stylee={{transform: 'translateY(-40px)'}} />}
                                        {player4 && <Form player={player4} stylee={{transform: 'translateY(-50px)'}} />}
                                        {player5 && <Form player={player5} stylee={{transform: 'translateY(-40px)'}} />}
                                    </> : <><p style={{ position: 'absolute', top: '50%', right: '36%' }}>состав не закреплен</p></>}
                                </div>
                            </div>
                            <div style={{ marginTop: '40px' }}>
                                <div>
                                    {player6 ? <>
                                        {player6 && <Form player={player6} stylee={{transform: 'translateY(-25px)'}} />}
                                        {player7 && <Form player={player7} stylee={{transform: 'translateY(-20px)'}} />}
                                        {player8 && <Form player={player8} stylee={{transform: 'translateY(-25px)'}} />}
                                        {player9 && <Form player={player9} stylee={{transform: 'translateY(-15px)'}} />}
                                        {player10 && <Form player={player10} stylee={{transform: 'translateY(-25px)'}} />}
                                    </> : <><p style={{ position: 'absolute', top: '50%', right: '36%' }}>состав не закреплен</p></>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {match_match && match_match.map((el) => <> <div className={styles.content2}>
                        <p style={{ position: 'absolute', top: '15px', right: '40px' }}>адрес проведения:<br></br></p>
                        <div className={styles.match}>
                            <div className={styles.team}><p>{el.team_one.team_name}</p><div className={styles.line} style={el.win_team?.id == el.team_one.id ? { opacity: '1' } : {}}></div></div>
                            <div className={styles.info}>
                                <p style={{ transform: 'translateX(-1px)' }}>{el.team_one_score ? el.team_one_score : 0} : {el.team_two_score ? el.team_two_score : 0}</p>
                                <img src='/svg/friends.svg' style={{ transform: 'translateX(-1px)' }} />
                            </div>
                            <div className={styles.team}><p>{el.team_two.team_name}</p><div className={styles.line} style={el.win_team?.id == el.team_two.id ? { opacity: '1' } : {}}></div></div>
                            <div className={styles.infoo} style={{ marginTop: '10px', transform: 'translateX(-35px)' }}>
                                <p>{el.time}</p>
                                <p>{match.date}</p>
                            </div>
                        </div>
                    </div>
                        {match.team_one?.director == user?.user_id && <div style={{ display: 'flex', transform: 'translateX(-68px)' }}>
                            <input type="time" onChange={(e) => settime1(e.target.value)} name="" id="" style={{ width: '200px' }} />
                            <div className='more' onClick={() => upmatch(el.id)} style={{ width: '450px', marginTop: '13px' }}><p>изменить время матча</p></div>
                        </div>
                        }
                        {match.team_two?.director == user?.user_id && <div style={{ display: 'flex', transform: 'translateX(-68px)' }}>
                            <input type="time" onChange={(e) => settime1(e.target.value)} name="" id="" style={{ width: '200px' }} />
                            <div className='more' onClick={() => upmatch(el.id)} style={{ width: '450px', marginTop: '13px' }}><p>изменить время матча</p></div>
                        </div>
                        }
                        {user?.is_org && <div style={{ transform: 'translateX(-68px)' }}>
                            <input type='number' value={team1_ball__} onChange={(e) => setteam1_ball__(e.target.value)} placeholder='счет1' />
                            <input type='number' value={team2_ball__} onChange={(e) => setteam2_ball__(e.target.value)} placeholder='счет2' />
                            <p>{match?.team_one?.team_name} {match?.team_one?.id}</p>
                            <p>{match?.team_two?.team_name} {match?.team_two?.id}</p>
                            <input type='number' value={idwin_} onChange={(e) => setidwin_(e.target.value)} placeholder='ид победителя' />
                            <input type='number' value={idmatch} onChange={(e) => setidmatch(e.target.value)} placeholder='ид матч' />
                            <div className='more' onClick={() => upmatch_org(el.id)}><p>изменить матч</p></div>
                        </div>
                        }
                    </>)}
                    {match.team_one?.director == user?.user_id && <div className={styles.content1}>
                        {playersteam1.map((el) => <Player el={el} setselect={setselected1} select={selected1} />)}
                        <p style={{ margin: '30px', marginLeft: '20px' }}>выберете 5 игроков для закрепления</p>
                        <div className='more' onClick={() => upteam1()}><p>закрепить состав</p></div>
                    </div>}
                    {match.team_two?.director == user?.user_id && <div className={styles.content1}>
                        {playersteam2.map((el) => <Player el={el} setselect={setselected2} select={selected2} />)}
                        <p style={{ margin: '30px', marginLeft: '20px' }}>выберете 5 игроков для закрепления</p>
                        <div className='more' onClick={() => upteam2()}><p>закрепить состав</p></div>
                    </div>}
                    {user?.is_org && <>
                        <div style={{ transform: 'translateX(-68px)' }}>
                            <input type='number' value={team1_ball} onChange={(e) => setteam1_ball(e.target.value)} placeholder='счет1' />
                            <input type='number' value={team2_ball} onChange={(e) => setteam2_ball(e.target.value)} placeholder='счет2' />
                            <input type='number' value={team1_ball_} onChange={(e) => setteam1_ball_(e.target.value)} placeholder='баллы1' />
                            <input type='number' value={team2_ball_} onChange={(e) => setteam2_ball_(e.target.value)} placeholder='баллы2' />
                            <p>{match?.team_one?.team_name} {match?.team_one?.id}</p>
                            <p>{match?.team_two?.team_name} {match?.team_two?.id}</p>
                            <input type='number' value={idwin} onChange={(e) => setidwin(e.target.value)} placeholder='ид победителя' />
                            <input type="date" value={date} onChange={(e) => setdate(e.target.value)} style={{ margin: '20px', width: '100px' }} />
                            <div className='more' onClick={() => upof()}><p>вычесть встречу</p></div>
                        </div>
                    </>}
                    <div style={{ height: '40px' }}></div>
                </>
            }
            {!match.team_one && !match.team_two && user?.user_id && <>
                <div>
                    <div className={styles.headerr}>
                        <div>
                            <input type='text' onChange={changeHolder} value={nameP} className={styles.Input} placeholder='найти команду' maxLength={255} /><img src='/mdf28/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
                        </div>
                    </div>
                    <div>
                        <div className={styles.panel}>
                        </div><>
                            {info && info.map((el) => (<div className={styles.info_el}><div style={{ backgroundImage: `url(${el.logo})` }} className={styles.ava}></div><p>{el.team_name}
                                {el.is_recognized && <img src='/svg/venok.svg' id={styles.id_2} />}</p><div className={styles.info}><p>ID {el.id}</p></div></div>))}</>
                    </div>
                </div>
                {user?.is_org && <input type='number' value={id1} onChange={(e) => setid1(e.target.value)} placeholder='1 ком' />}
                {user?.is_org && <input type='number' value={id2} onChange={(e) => setid2(e.target.value)} placeholder='2 ком' />}
                {user?.is_org && <div className='more' onClick={() => upteams()}><p>матч</p></div>}
            </>}
            {!match.team_one && <div className={styles.content}>
                <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate('/bascketball/meetings')} />
                нет информации о встрече    
                <img src="/svg/repair.svg" style={{height: '200px',marginTop: '140px'}} alt="" />
            </div>}
        </>
    );
}

export default Content;