import { useContext, useEffect, useState } from 'react'
import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Tournament_6 from './6_tournament';
import Tournament_7 from './7_tournament';
import Tournament_8 from './8_tournament';
import Tournament_9 from './9_tournament';
import Tournament_10 from './10_tournament';
import Tournament_11 from './11_tournament';
import Tournament_12 from './12_tournament';
import Matchq from './matchq';
import context from '../../../../../connections/context';

const Content = () => {
    let { user } = useContext(context)
    const [match, setmatch] = useState(false)
    let { id } = useParams()
    let SearhUser = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/dota/search/tournament/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmatch(data.results[0])
    }
    const [meetingq, setmeetingq] = useState([])
    const [meeting, setmeeting] = useState([])
    let SearhMeeting = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/dota/search/meeting/?tournament=${id}&is_qualification=false&limit=20&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmeeting(data.results)
    }
    let SearhMeetingq = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/dota/search/meeting/?tournament=${id}&is_qualification=true&limit=20&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmeetingq(data.results)
        console.log(data.results)
    }
    useEffect(() => {
        SearhUser(id)
        SearhMeeting(id)
        SearhMeetingq(id)
    }, [])
    const navigate = useNavigate();
    const [dir, setdir] = useState(false)
    let SearhDIR = async () => {
        let response = await fetch(`https:///mdf28server.site/api/dota/search/team/?director=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0]?.id) {
            setdir(data.results[0].id)
        }
    }
    const [of, setof] = useState([])
    const [uof, setuof] = useState(false)
    let SearhOF = async () => {
        let response = await fetch(`https://mdf28server.site/api/dota/search/application_tournament/?tournament=${id}&limit=20&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setof(data.results)
    }
    let SearhuOF = async () => {
        let response = await fetch(`https://mdf28server.site/api/dota/search/application_tournament/?tournament=${id}&team=${dir}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setuof(data.results[0])
    }
    let regOF = async () => {
        let response = await fetch(`https://mdf28server.site/api/dota/reg/application_tournament/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ author: user?.user_id, team: dir, tournament: id })
        })
        let data = await response.json()
        location.reload()
    }
    let upOF = async (ido) => {
        let response = await fetch(`https://mdf28server.site/api/dota/update/application_tournament/${ido}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ is_on: true })
        })
        let data = await response.json()
    }
    let uptour = async (idj) => {
        let zxc = []
        for (let index = 0; index < match.teams.length; index++) {
            zxc[index] = match.teams[index].id
        }
        let response = await fetch(`https://mdf28server.site/api/dota/update/tournament_org/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ teams: [...zxc, idj] })
        })
        let data = await response.json()
        location.reload()
    }
    let uptour1 = async () => {
        switch (match.teams.length) {
            case 6:
                let zxc6 = 0
                let inter6 = setInterval(() => {
                    reg()
                    zxc6++
                    if (zxc6 == 8) {
                        return clearInterval(inter6)
                    }
                }, 100);
                break;
            case 7:
                let zxc7 = 0
                let inter7 = setInterval(() => {
                    reg()
                    zxc7++
                    if (zxc7 == 9) {
                        return clearInterval(inter7)
                    }
                }, 100);
                break;
            case 8:
                let zxc8 = 0
                let inter8 = setInterval(() => {
                    reg()
                    zxc8++
                    if (zxc8 == 10) {
                        return clearInterval(inter8)
                    }
                }, 100);
                break;
            case 9:
                let zxc9 = 0
                let inter9 = setInterval(() => {
                    reg()
                    zxc9++
                    if (zxc9 == 11) {
                        return clearInterval(inter9)
                    }
                }, 100);
                break;
            case 10:
                let zxc10 = 0
                let inter10 = setInterval(() => {
                    reg()
                    zxc10++
                    if (zxc10 == 13) {
                        return clearInterval(inter10)
                    }
                }, 100);
                break;
            case 11:
                let zxc11 = 0
                let inter11 = setInterval(() => {
                    reg()
                    zxc11++
                    if (zxc11 == 15) {
                        return clearInterval(inter11)
                    }
                }, 100);
                break;
            case 12:
                let zxc12 = 0
                let inter12 = setInterval(() => {
                    reg()
                    zxc12++
                    if (zxc12 == 18) {
                        return clearInterval(inter12)
                    }
                }, 100);
                break;
        }

        switch (match.teams.length) {
            case 6:
                let zxc6 = 0
                let inter6 = setInterval(() => {
                    reg1()
                    zxc6++
                    if (zxc6 == 3) {
                        return clearInterval(inter6)
                    }
                }, 100);
                break;
            case 7:
                let zxc7 = 0
                let inter7 = setInterval(() => {
                    reg1()
                    zxc7++
                    if (zxc7 == 4) {
                        return clearInterval(inter7)
                    }
                }, 100);
                break;
            case 8:
                let zxc8 = 0
                let inter8 = setInterval(() => {
                    reg1()
                    zxc8++
                    if (zxc8 == 4) {
                        return clearInterval(inter8)
                    }
                }, 100);
                break;
            case 9:
                let zxc9 = 0
                let inter9 = setInterval(() => {
                    reg1()
                    zxc9++
                    if (zxc9 == 5) {
                        return clearInterval(inter9)
                    }
                }, 100);
                break;
            case 10:
                let zxc10 = 0
                let inter10 = setInterval(() => {
                    reg1()
                    zxc10++
                    if (zxc10 == 5) {
                        return clearInterval(inter10)
                    }
                }, 100);
                break;
            case 11:
                let zxc11 = 0
                let inter11 = setInterval(() => {
                    reg1()
                    zxc11++
                    if (zxc11 == 6) {
                        return clearInterval(inter11)
                    }
                }, 100);
                break;
            case 12:
                let zxc12 = 0
                let inter12 = setInterval(() => {
                    reg1()
                    zxc12++
                    if (zxc12 == 6) {
                        return clearInterval(inter12)
                    }
                }, 100);
                break;
        }
    }

    let uptour2 = async () => {
        let response = await fetch(`https://mdf28server.site/api/dota/update/tournament_org/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ is_on: true })
        })
        let data = await response.json()
        location.reload()
    }
    let go = (idj, ido) => {
        uptour(idj)
        upOF(ido)
        setTimeout(() => {
            location.reload()
        }, 100);
    }
    useEffect(() => {
        if (dir) {
            SearhuOF()
        }
    }, [dir])
    useEffect(() => {
        SearhDIR()
        SearhOF()
    }, [])
    let reg = async () => {
        let response = await fetch(`https://mdf28server.site/api/dota/reg/meeting/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ is_friends: false, meeting: id,matches: 3, tournament: match.id})
        })
        let data = await response.json()
        console.log(data)
        regm(data.id)
        regm(data.id)
        regm(data.id)
    }
    let regm = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/dota/reg/match/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ meeting: id })
        })
        let data = await response.json()
        console.log(data)
    }
    let reg1 = async () => {
        let response = await fetch(`https://mdf28server.site/api/dota/reg/meeting/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ is_qualification: true, meeting: id, tournament: match.id })
        })
        let data = await response.json()
        regm(data.id)
        console.log(data)
    }
    const [idwin, setidwin] = useState()
    let upteam = async (team) => {
        let zxc1;
        if (team?.id == idwin) {
            zxc1 = team.win_tournament + 1
        } else {
            zxc1 = team.win_tournament
        }
        let response = await fetch(`https://mdf28server.site/api/dota/update_org/team/${team.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ tournament: team?.tournament + 1, win_tournament: zxc1 })
        })
        let data = await response.json()
    }
    const [players, setplayers] = useState()
    let uppl = async (player) => {
        let zxc1;
        if (player?.team?.id == idwin) {
            zxc1 = player.win_tournament + 1
        } else {
            zxc1 = player.win_tournament
        }
        let response = await fetch(`https://mdf28server.site/api/dota/update/player_director/${player.user.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ tournament: player.tournament + 1, win_tournament: zxc1 })
        })
        let data = await response.json()
    }
    let SearchPlayer = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/dota/search/player/?team=${id}&offset=0&limit=16`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setplayers(data.results)
    }
    useEffect(() => {
        if (players) {
            for (let indexx = 0; indexx < players.length; indexx++) {
                uppl(players[indexx])
            }
        }
    }, [players])
    let endtour = () => {
        for (let index = 0; index < match.teams.length; index++) {
            upteam(match.teams[index])
            SearchPlayer(match.teams[index].id)
        }
    }
    return (
        <>
            <div className={styles.content}>
                <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate('/dota/tournaments')} />
                <div className={styles.header}><p>{match.name}</p><p id={styles.id_2}>дата окнчания подачи заявок: {match.date}</p></div>
                <div className={styles.body}>
                    <div className={styles.teams}>
                        <p style={{ transform: 'translateX(12px)', width: '220px', marginBottom: '20px', marginTop: '0px' }}>команды:</p>
                        {match && match.teams.map(el => <div className={styles.fight1} onClick={() => navigate(`/dota/team/${el.id}`)} style={{ backgroundColor: `${el.color}` }}>
                            <p style={{ marginLeft: '10px', color: 'whitesmoke', transform: 'translateY(6px)' }}>{el.team_name}</p>
                        </div>)}
                    </div>
                    <div className={styles.teams} style={{paddingTop: '35px'}}>
                        {!uof && dir && !match.is_on && <div className='more' style={{ marginLeft: '30px' }} onClick={() => regOF()}><p>подать заявку</p></div>}
                        {match && of && of.map((el) => (
                            <>
                                <div className={styles.offers}>
                                    <div className={styles.ava} style={{ backgroundImage: `url(${el.team?.logo})` }}></div>
                                    <p style={{ marginTop: '5px', width: '625px' }}>{el.team?.team_name}</p>
                                    {!el.is_on && <p style={{ color: '#e74343', width: '150px' }}>не одобренно</p>}
                                    {el.is_on && <p style={{ color: 'green', width: '150px' }}>одобренно</p>}
                                    {user?.is_org && <div className='more' onClick={() => go(el.team?.id, el.id)}><p>обобрить</p></div>}
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.content1}>
                {match && match.teams.length < 6 && <p id={styles.id_1}>идет набор команд..<img src="/svg/cezar.png" alt="" id={styles.id_1} style={{ transform: 'translateX(100px) translateY(-50%)' }} /></p>}
                {match && match.teams.length > 12 && <p id={styles.id_1}>идет набор команд..<img src="/svg/cezar.png" alt="" id={styles.id_1} style={{ transform: 'translateX(100px) translateY(-50%)' }} /></p>}
                {match && match.teams.length == 6 && <Tournament_6 matches={meeting} />}
                {match && match.teams.length == 7 && <Tournament_7 matches={meeting} />}
                {match && match.teams.length == 8 && <Tournament_8 matches={meeting} />}
                {match && match.teams.length == 9 && <Tournament_9 matches={meeting} />}
                {match && match.teams.length == 10 && <Tournament_10 matches={meeting} />}
                {match && match.teams.length == 11 && <Tournament_11 matches={meeting} />}
                {match && match.teams.length == 12 && <Tournament_12 matches={meeting} />}
            </div>
            {user?.is_org && <div className='more' onClick={() => uptour1()}><p>сгенерировать матчи</p></div>}
            {user?.is_org && <div className='more' onClick={() => uptour2()}><p>начать турнир</p></div>}
            <div className={styles.content2}>
                <p style={{ marginBottom: '20px' }}>матчи - квалификации</p>
                <div style={{ display: 'block', width: '10%' }}>
                    {meetingq && meetingq.map((el) => <>
                        <Matchq match={el} />
                    </>)}
                </div>
            </div>
            {user?.is_org && <div className='more' onClick={() => endtour()}><p>завершить турнир</p></div>}
            {user?.is_org && <input type="number" name="" id="" value={idwin} onChange={(e) => setidwin(e.target.value)} />}
            {match && user?.is_org && match.teams.map(el => <p style={{ marginLeft: '10px', color: 'whitesmoke', transform: 'translateY(6px)', color: 'black' }}>{el.team_name}: {el.id}</p>)}
            <div style={{ height: '60px' }}></div>
        </>
    );
}

export default Content;