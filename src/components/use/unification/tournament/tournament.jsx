import { useContext, useEffect, useState } from 'react'
import styles from './tournament.module.css'
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
import context from '../../../../connections/context';
import Calendar from 'react-calendar';
import moment from "moment";

const Tournament = ({ host, direction, str_direction }) => {
    let { user } = useContext(context)
    const [match, setmatch] = useState(false)
    let { id } = useParams()
    let SearhTournament = async () => {
        let response = await fetch(`${host}/api/unification/search/tournament/?id=${id}`, {
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
    let SearhMeeting = async () => {
        let response = await fetch(`${host}/api/unification/search/meeting/?tournament=${id}&is_qualification=false&limit=50&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmeeting(data.results)
    }
    let SearhMeetingq = async () => {
        let response = await fetch(`${host}/api/unification/search/meeting/?tournament=${id}&is_qualification=true&limit=50&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setmeetingq(data.results)
    }
    useEffect(() => {
        SearhTournament()
        SearhMeeting()
        SearhMeetingq()
        SearhDirector()
        SearhOffers()
    }, [])
    const navigate = useNavigate();
    const [director, setdirector] = useState(false)
    let SearhDirector = async () => {
        let response = await fetch(`${host}/api/unification/search/team/?director=${user.user_id}&direction=${direction}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0]?.id) {
            setdirector(data.results[0].id)
        }
    }
    const [offers, setoffers] = useState([])
    const [youoffers, setyouoffers] = useState(false)
    let SearhOffers = async () => {
        let response = await fetch(`${host}/api/unification/search/application/tournament/?tournament=${id}&limit=20&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setoffers(data.results)
    }
    let SearhYouOffers = async () => {
        if (user) {
            let response = await fetch(`${host}/api/unification/search/application/tournament/?tournament=${id}&team=${director}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setyouoffers(data.results[0])
        }
    }
    let RegistrationOffers = async () => {
        let response = await fetch(`${host}/api/unification/reg/application/tournament/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ author: user?.user_id, team: director, tournament: id, direction: direction })
        })
        let data = await response.json()
        location.reload()
    }
    let UpdateON = async (ido) => {
        let response = await fetch(`${host}/api/unification/update/application/tournament/${ido}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ is_on: true })
        })
        let data = await response.json()
    }
    let UpdateTournament = async (idj) => {
        let zxc = []
        for (let index = 0; index < match.teams.length; index++) {
            zxc[index] = match.teams[index].id
        }
        let response = await fetch(`${host}/api/unification/update/tournament_org/${id}/`, {
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
    let UpdateTournament_1 = async () => {
        switch (match.teams.length) {
            case 6:
                let zxc6 = 0
                let inter6 = setInterval(() => {
                    Registration()
                    zxc6++
                    if (zxc6 == 8) {
                        return clearInterval(inter6)
                    }
                }, 100);
                break;
            case 7:
                let zxc7 = 0
                let inter7 = setInterval(() => {
                    Registration()
                    zxc7++
                    if (zxc7 == 9) {
                        return clearInterval(inter7)
                    }
                }, 100);
                break;
            case 8:
                let zxc8 = 0
                let inter8 = setInterval(() => {
                    Registration()
                    zxc8++
                    if (zxc8 == 10) {
                        return clearInterval(inter8)
                    }
                }, 100);
                break;
            case 9:
                let zxc9 = 0
                let inter9 = setInterval(() => {
                    Registration()
                    zxc9++
                    if (zxc9 == 11) {
                        return clearInterval(inter9)
                    }
                }, 100);
                break;
            case 10:
                let zxc10 = 0
                let inter10 = setInterval(() => {
                    Registration()
                    zxc10++
                    if (zxc10 == 13) {
                        return clearInterval(inter10)
                    }
                }, 100);
                break;
            case 11:
                let zxc11 = 0
                let inter11 = setInterval(() => {
                    Registration()
                    zxc11++
                    if (zxc11 == 15) {
                        return clearInterval(inter11)
                    }
                }, 100);
                break;
            case 12:
                let zxc12 = 0
                let inter12 = setInterval(() => {
                    Registration()
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
                    RegistrationQwal()
                    zxc6++
                    if (zxc6 == 3) {
                        return clearInterval(inter6)
                    }
                }, 100);
                break;
            case 7:
                let zxc7 = 0
                let inter7 = setInterval(() => {
                    RegistrationQwal()
                    zxc7++
                    if (zxc7 == 4) {
                        return clearInterval(inter7)
                    }
                }, 100);
                break;
            case 8:
                let zxc8 = 0
                let inter8 = setInterval(() => {
                    RegistrationQwal()
                    zxc8++
                    if (zxc8 == 4) {
                        return clearInterval(inter8)
                    }
                }, 100);
                break;
            case 9:
                let zxc9 = 0
                let inter9 = setInterval(() => {
                    RegistrationQwal()
                    zxc9++
                    if (zxc9 == 5) {
                        return clearInterval(inter9)
                    }
                }, 100);
                break;
            case 10:
                let zxc10 = 0
                let inter10 = setInterval(() => {
                    RegistrationQwal()
                    zxc10++
                    if (zxc10 == 5) {
                        return clearInterval(inter10)
                    }
                }, 100);
                break;
            case 11:
                let zxc11 = 0
                let inter11 = setInterval(() => {
                    RegistrationQwal()
                    zxc11++
                    if (zxc11 == 6) {
                        return clearInterval(inter11)
                    }
                }, 100);
                break;
            case 12:
                let zxc12 = 0
                let inter12 = setInterval(() => {
                    RegistrationQwal()
                    zxc12++
                    if (zxc12 == 6) {
                        return clearInterval(inter12)
                    }
                }, 100);
                break;
        }
    }

    let UpdateTournament_2 = async () => {
        let response = await fetch(`${host}/api/unification/update/tournament_org/${id}/`, {
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
        UpdateTournament(idj)
        UpdateON(ido)
        setTimeout(() => {
            location.reload()
        }, 100);
    }
    useEffect(() => {
        if (director) {
            SearhYouOffers()
        }
    }, [director])
    let Registration = async () => {
        let response = await fetch(`${host}/api/unification/reg/meeting/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ is_friends: false, meeting: id, matches: 3, tournament: match.id, direction: direction })
        })
        let data = await response.json()
        console.log("регистрация")
    }
    let RegistrationQwal = async () => {
        let response = await fetch(`${host}/api/unification/reg/meeting/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ is_qualification: true, meeting: id, tournament: match.id, direction: direction, matches: 2, is_friends: false })
        })
        let data = await response.json()
        console.log("регистрация")
    }
    const [idwin, setidwin] = useState()
    let UpdateTeam = async (team) => {
        let zxc1;
        if (team?.id == idwin) {
            zxc1 = team.win_tournament + 1
        } else {
            zxc1 = team.win_tournament
        }
        let response = await fetch(`${host}/api/unification/update_org/team/${team.id}/`, {
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
    let UpdatePlayer = async (player) => {
        let zxc1;
        if (player?.team?.id == idwin) {
            zxc1 = player.win_tournament + 1
        } else {
            zxc1 = player.win_tournament
        }
        let response = await fetch(`${host}/api/unification/update/player_director/${player.user.id}/`, {
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
        let response = await fetch(`${host}/api/unification/search/player/?team=${id}&offset=0&limit=16`, {
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
                UpdatePlayer(players[indexx])
            }
        }
    }, [players])
    let EndTournament = () => {
        for (let index = 0; index < match.teams.length; index++) {
            UpdateTeam(match.teams[index])
            SearchPlayer(match.teams[index].id)
        }
    }

    const [date, setDate] = useState(new Date());
    const [mark, setmark] = useState([])
    const [mark_, setmark_] = useState([])

    useEffect(() => {
        if (meeting) {
            for (let index = 0; index < meeting.length; index++) {
                if (meeting[index].date) {
                    setmark(prew => [...prew, meeting[index].date])
                }
            }
            for (let index = 0; index < meeting.length; index++) {
                if (meeting[index].date) {
                    setmark_(prew => [...prew, { 'date': meeting[index].date, 'id': meeting[index].id }])
                }
            }
        }
    }, [meeting])

    let CheckFunction = (array, value) => {
        let result = false
        for (let index = 0; index < array.length; index++) {
            if (array[index].date == value) {
                result = array[index].id
            }
        }
        return result
    }

    return (
        <>
            <div className={styles.content}>
                <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate(-1)} />
                <div className={styles.header}><p>{match.name}</p><p id={styles.id_2}>дата окнчания подачи заявок: {match.date}</p></div>
                <div className={styles.body}>
                    <div className={styles.teams}>
                        {/* {match && match.teams.map(el => <div key={el.id} className={styles.fight1} onClick={() => navigate(`/${str_direction}/team/${el.id}`)} style={{ backgroundColor: `${el.color}` }}>
                            <p style={{ marginLeft: '10px', color: 'whitesmoke', transform: 'translateY(6px)' }}>{el.name}</p>
                        </div>)} */}
                        <div>
                            <p style={{ transform: 'translateX(12px)' }}>расписание / команды </p>
                            <div className={styles.teams} style={{ marginRight: '35px' }}>
                                {!youoffers && director && !match.is_on && <div className='more' style={{ margin: '30px', marginTop: '10px' }} onClick={() => RegistrationOffers()}><p>подать заявку</p></div>}
                                {match && offers && offers.map((el) => (
                                    <div key={el.id} className={styles.offers}>
                                        <div className={styles.ava} onClick={() => navigate(`/${str_direction}/team/${el.id}`)} style={{ backgroundImage: `url(${el.team?.logo})` }}></div>
                                        <p onClick={() => navigate(`/${str_direction}/team/${el.id}`)} style={{ marginTop: '5px', width: '315px', cursor: 'pointer' }}>{el.team?.name}</p>
                                        одобренно:
                                        {!el.is_on && <img src='/svg/an_accept.svg' style={{ height: '30px', marginTop: '4px' }} />}
                                        {el.is_on && <img src='/svg/accept.svg' style={{ height: '30px', marginTop: '4px' }} />}
                                        {user?.is_org && <div className='more' onClick={() => go(el.team?.id, el.id)}><p>обобрить</p></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Calendar onChange={setDate} value={date} defaultActiveStartDate={new Date(date.getFullYear(mark[0]), date.getMonth(mark[0]))}
                        onClickDay={(e) => {
                            let id = CheckFunction(mark_, moment(new Date(e).toISOString(), "YYYY-MM-DDTHH:mm:ss.sssZ").format("DD.MM.YY"))
                            if (id) {
                                navigate(`/${str_direction}/meeting/${id}`)
                            }
                        }}
                        tileClassName={({ date, view }) => {
                            if (mark.find(x => x === moment(date).format("DD.MM.YY"))) {
                                return 'highlight'
                            }
                        }} />
                </div>
            </div>
            <div className={styles.content1}>
                {match && match.teams.length < 6 && <p id={styles.id_1}>идет набор команд..<img src="/svg/cezar.png" alt="" id={styles.id_1} style={{ transform: 'translateX(100px) translateY(-50%)' }} /></p>}
                {match && match.teams.length > 12 && <p id={styles.id_1}>идет отбор команд..<img src="/svg/cezar.png" alt="" id={styles.id_1} style={{ transform: 'translateX(100px) translateY(-50%)' }} /></p>}
                {match && match.teams.length == 6 && <Tournament_6 matches={meeting} str_direction={str_direction} />}
                {match && match.teams.length == 7 && <Tournament_7 matches={meeting} str_direction={str_direction} />}
                {match && match.teams.length == 8 && <Tournament_8 matches={meeting} str_direction={str_direction} />}
                {match && match.teams.length == 9 && <Tournament_9 matches={meeting} str_direction={str_direction} />}
                {match && match.teams.length == 10 && <Tournament_10 matches={meeting} str_direction={str_direction} />}
                {match && match.teams.length == 11 && <Tournament_11 matches={meeting} str_direction={str_direction} />}
                {match && match.teams.length == 12 && <Tournament_12 matches={meeting} str_direction={str_direction} />}
            </div>
            <div className={styles.content2}>
                <p style={{ marginBottom: '20px' }}>матчи - квалификации</p>
                <div style={{ display: 'block', width: '10%' }}>
                    {meetingq && meetingq.map((el) => <>
                        <Matchq key={el.id} str_direction={str_direction} match={el} />
                    </>)}
                </div>
            </div>
            {user?.is_org && <div className={styles.content3} style={{ padding: '20px' }}>
                <div className='more' onClick={() => UpdateTournament_1()}><p>сгенерировать матчи</p></div>
                <div className='more' onClick={() => UpdateTournament_2()}><p>начать турнир</p></div>
                <input type="number" placeholder='ид победителя' name="" id="" value={idwin} onChange={(e) => setidwin(e.target.value)} />
                <div className='more' onClick={() => EndTournament()}><p>завершить турнир</p></div>
                {match && user?.is_org && match.teams.map(el => <p key={el.id} style={{ marginLeft: '10px', color: 'whitesmoke', transform: 'translateY(6px)', color: 'black' }}>{el.name} - {el.id}</p>)}
            </div>}
            <div style={{ height: '60px' }}></div>
        </>
    );
}

export default Tournament;