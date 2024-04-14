import { useContext, useEffect, useState } from 'react'
import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Player from './player'
import Form from './form'
import context from '../../../../../connections/context';
import Match from './match';

const Content = () => {
    let host = 'https://mdf28server.site'
    let direction = 'bascketball'
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
        let response = await fetch(`${host}/api/${direction}/search/match/?meeting=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmatch_match(data.results)
    }
    let SearhUser = async (id) => {
        let response = await fetch(`${host}/api/${direction}/search/meeting/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmatch(data.results[0])
        console.log(data)
    }
    let SearchPlayer = async (user, set) => {
        let response = await fetch(`${host}/api/${direction}/search/player/?user=${user}`, {
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
                SearchPlayer(match.teams_structure_one[0], setplayer1)
            }
            if (match.teams_structure_one[1]) {
                SearchPlayer(match.teams_structure_one[1], setplayer2)
            }
            if (match.teams_structure_one[2]) {
                SearchPlayer(match.teams_structure_one[2], setplayer3)
            }
            if (match.teams_structure_one[3]) {
                SearchPlayer(match.teams_structure_one[3], setplayer4)
            }
            if (match.teams_structure_one[4]) {
                SearchPlayer(match.teams_structure_one[4], setplayer5)
            }
            if (match.teams_structure_two[0]) {
                SearchPlayer(match.teams_structure_two[0], setplayer6)
            }
            if (match.teams_structure_two[1]) {
                SearchPlayer(match.teams_structure_two[1], setplayer7)
            }
            if (match.teams_structure_two[2]) {
                SearchPlayer(match.teams_structure_two[2], setplayer8)
            }
            if (match.teams_structure_two[3]) {
                SearchPlayer(match.teams_structure_two[3], setplayer9)
            }
            if (match.teams_structure_two[4]) {
                SearchPlayer(match.teams_structure_two[4], setplayer10)
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
            let response = await fetch(`${host}/api/${direction}/search/player/?team=${match?.team_one?.id}&offset=0&limit=16`, {
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
            let response = await fetch(`${host}/api/${direction}/search/player/?team=${match?.team_two?.id}&offset=0&limit=16`, {
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
            let response = await fetch(`${host}/api/${direction}/update/meeting_director/${id}/`, {
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
            let response = await fetch(`${host}/api/${direction}/update/meeting_director/${id}/`, {
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
    let upmeeting = async () => {
        let response = await fetch(`${host}/api/${direction}/update/meeting_org/${id}/`, {
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
        let response = await fetch(`${host}/api/${direction}/update/meeting_org/${id}/`, {
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
                let response = await fetch(`${host}/api/${direction}/search/team/?limit=1&offset=0`, {
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
        let response = await fetch(`${host}/api/${direction}/search/team/?search=${searh_value}&limit=1&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setInfo([...data.results])
    }
    const changeHolder = (e) => {
        setsearh_value(e.target.value)
    }
    const [id1, setid1] = useState()
    const [id2, setid2] = useState()
    const [date, setdate] = useState('2024.04.01')
    return (
        <>
            {match.team_one &&
                <>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate('/dota/meetings')} />
                            <div><p onClick={() => navigate(`/dota/team/${match?.team_one?.id}`)} style={{ transition: '.7s' }}>{match.team_one?.team_name} </p><div onClick={() => navigate(`/dota/team/${match?.team_one?.id}`)} className={styles.ava} style={{ backgroundImage: `url(${match.team_one?.logo})`, marginRight: '0' }}></div>  </div>
                            <div style={{ transform: 'translateY(-5px)' }}>
                                {match.is_qualification && <><p style={{ fontSize: '24px' }}>{match.team_one_ball ? match.team_one_ball : 0} : {match.team_two_ball ? match.team_two_ball : 0}</p><p style={{ marginBlock: '0px', color: '#E74343' }}>квалификация</p></>}
                                {!match.is_qualification && <><p style={{ fontSize: '24px' }}>{match.team_one_score ? match.team_one_score : 0} : {match.team_two_score ? match.team_two_score : 0}</p></>}
                                {match.is_friends && <img src='/svg/friends.svg' />}
                                {!match.is_friends && <img src='/svg/cup.svg' style={{ height: '27px' }} />}
                                <p style={{ fontSize: '22px' }}>
                                <p>{match.date ? match.date : '------"'}</p></p>
                            </div>
                            <div><p onClick={() => navigate(`/dota/team/${match?.team_two?.id}`)} style={{ transition: '.7s' }}> {match.team_two?.team_name} </p> <div onClick={() => navigate(`/dota/team/${match?.team_two?.id}`)} className={styles.ava} style={{ backgroundImage: `url(${match.team_two?.logo})`, marginRight: '0' }}></div>  </div>
                        </div>
                        <div className={styles.body}>
                            <img src="/svg/sword.svg" id={styles.id_32} />
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
                    {match_match && match_match.map((el) => <Match el={el} />)}
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
                            <div className='more' onClick={() => upmeeting()}><p>вычесть встречу</p></div>
                        </div>
                    </>}
                    <div style={{ height: '40px' }}></div>
                </>
            }
            {!match.team_one && !match.team_two && user?.user_id && <>
                <div>
                    <div className={styles.headerr}>
                        <div>
                            <input type='text' onChange={changeHolder} value={searh_value} className={styles.Input} placeholder='найти команду' maxLength={255} /><img src='/svg/venok.svg' /><img id={styles.id_1} src='/svg/lupa.svg' />
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
                <img src="/svg/long_arrow.svg" id={styles.id_04} onClick={() => navigate('/dota/meetings')} />
                <p style={{marginLeft: '40px',transform: 'translateY(-12px)'}}>нет информации о встрече</p>
                <img src="/svg/repair.svg" style={{height: '200px',marginTop: '140px'}} alt="" />
            </div>}
        </>
    );
}

export default Content;