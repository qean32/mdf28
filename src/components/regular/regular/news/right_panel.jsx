import styles from './content.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Right_panel = () => {
    let host = 'https://mdf28server.site'
    const navigate = useNavigate();
    const [teamDOTA, setteamDOTA] = useState()
    const [transDOTA, settransDOTA] = useState([])
    const [transCS, settransCS] = useState([])
    const [teamCS, setteamCS] = useState()
    let SearhTeams = async (directions, set) => {
        let response = await fetch(`${host}/api/${directions}/search/team/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        set(data.results)
    }
    let SearhTransfers = async (directions, set) => {
        let response = await fetch(`${host}/api/tranfers/search/${directions}/?limit=1&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        set(data.results)
    }
    useEffect(() => {
        SearhTeams('dota', setteamDOTA)
        SearhTeams('cs', setteamCS)
        SearhTransfers('CS', settransCS)
        SearhTransfers('DOTA', settransDOTA)
    }, [])
    return (
        <>
            <div className={styles.content_right}>
                <p>побед в матчах</p>
                <div className={styles.teams}>
                    {teamDOTA && teamDOTA.map((el) => (
                        <div key={el.id}>
                            <div onClick={() => navigate(`/dota/team/${el.id}`)} style={{ backgroundImage: `url(${el.logo}` }}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.content_right_trans}>
                {transDOTA.map((el) => (<p><span onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name}</span>{el.script?.content}<span onClick={() => navigate(`/dota/team/${el.team?.id}`)}>{el.team?.team_name ? el.team?.team_name : 'команда удалена*'}</span></p>))}
            </div>
            <div className={styles.content_right}>
                <p>побед в матчах</p>
                <div className={styles.teams}>
                    {teamCS && teamCS.map((el) => (
                        <div key={el.id}>
                            <div onClick={() => navigate(`/cs/team/${el.id}`)} style={{ backgroundImage: `url(${el.logo}` }}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.content_right_trans}>
                {transCS.map((el) => (<p><span onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name}</span> {el.script?.content} <span onClick={() => navigate(`/cs/team/${el.team?.id}`)}>{el.team?.team_name ? el.team?.team_name : 'команда удалена*'}</span></p>))}
            </div>
        </>
    );
}

export default Right_panel;