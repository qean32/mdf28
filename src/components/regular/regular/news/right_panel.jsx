import styles from './news.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Right_panel = ({host}) => {
    const navigate = useNavigate();
    const [teamDOTA, setteamDOTA] = useState()
    const [transDOTA, settransDOTA] = useState([])
    const [transCS, settransCS] = useState([])
    const [teamCS, setteamCS] = useState()
    let SearhTeams = async (direction, set) => {
        let response = await fetch(`${host}/api/unification/search/team/?direction=${direction}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        set(data.results)
    }
    let SearhTransfers = async (direction, set) => {
        let response = await fetch(`${host}/api/transfers/search/?limit=1&offset=0&direction=${direction}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        set(data.results)
    }
    useEffect(() => {
        SearhTeams(1, setteamDOTA)
        SearhTeams(3, setteamCS)
        SearhTransfers(3, settransCS)
        SearhTransfers(1, settransDOTA)
    }, [])
    return (
        <>
            <div className={styles.content_right}>
                <p>побед в матчах</p>
                <div className={styles.teams}>
                    {teamDOTA && teamDOTA.map((el) => (
                        <div className='transformup' key={el.id}>
                            <div onClick={() => navigate(`/dota/team/${el.id}`)} style={{ backgroundImage: `url(${el.logo}` }}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.content_right_trans}>
                {transDOTA.map((el) => (<p key={el.id}><span onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name}</span>{el.script?.content}<span onClick={() => navigate(`/dota/team/${el.team?.id}`)}>{el.team?.name ? el.team?.name : 'команда удалена*'}</span></p>))}
            </div>
            <div className={styles.content_right}>
                <p>побед в матчах</p>
                <div className={styles.teams}>
                    {teamCS && teamCS.map((el) => (
                        <div className='transformup' key={el.id}>
                            <div onClick={() => navigate(`/cs/team/${el.id}`)} style={{ backgroundImage: `url(${el.logo}` }}></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.content_right_trans}>
                {transCS.map((el) => (<p key={el.id}><span onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name}</span> {el.script?.content} <span onClick={() => navigate(`/cs/team/${el.team?.id}`)}>{el.team?.name ? el.team?.name : 'команда удалена*'}</span></p>))}
            </div>
        </>
    );
}

export default Right_panel;