import styles from './content.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Right_panel = ({go_modal_dis1}) => {
    const navigate = useNavigate();
    const [teamDOTA, setteamDOTA] = useState()
    const [transDOTA, settransDOTA] = useState([])
    const [transCS, settransCS] = useState([])
    let SearhTeamDOTA = async () => {
        let response = await fetch('https://mdf28server.site/api/dota/search/team/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setteamDOTA(data.results)
    }
    const [teamCS, setteamCS] = useState()
    let SearhTeamCS = async () => {
        let response = await fetch('https://mdf28server.site/api/cs/search/team/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setteamCS(data.results)
    }
    let SearhTransferDOTA = async () => {
        let response = await fetch('https://mdf28server.site/api/tranfers/search/DOTA/?limit=1&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        settransDOTA(data.results)
    }
    let SearhTransferCS = async () => {
        let response = await fetch('https://mdf28server.site/api/tranfers/search/CS/?limit=1&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        settransCS(data.results)
    }
    useEffect(() => {
        SearhTeamDOTA()
        SearhTeamCS()
        SearhTransferCS()
        SearhTransferDOTA()
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