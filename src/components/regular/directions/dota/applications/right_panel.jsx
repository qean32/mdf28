import styles from '../../../news/content.module.css'
import { useEffect, useState } from 'react';
import Right_panel_place from '../../../../use/right_panel_place';

const Right_panel_ = () => {
    const [team, setteam] = useState()
    const [trans,settrans] = useState([])
    let SearhTeam = async () => {
        let response = await fetch('http://qean32.beget.tech/api/dota/search/team/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setteam(data.results)
    }
    let SearhTransfer = async () => {
        let response = await fetch('http://qean32.beget.tech/api/tranfers/search/DOTA/?limit=1&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        settrans(data.results)
    }
    useEffect(() => {
        SearhTeam()
        SearhTransfer()
    }, [])
    return (
        <>
        <div className={styles.content_right_}>
            <Right_panel_place namee={'игроки'}/>
            <Right_panel_place namee={'команды'}/>
            <Right_panel_place namee={'матчи'}/>
            <Right_panel_place namee={'турниры'}/>
            <Right_panel_place namee={'протоколы'}/>
        </div>
            <div className={styles.content_right}>
                <p>побед в матчах DOTA</p>
                <div className={styles.teams}>
                    {team && team.map((el) => (
                        <div key={el.id}>
                            <div style={{backgroundImage:`url(${el.logo}`}}></div>
                            <p>{el.win_matches}</p>
                        </div>
                    ))}
                </div>
            </div>
                {trans.map((el) => (<div className={styles.content_right_trans}><p><span>{el.user?.full_name}</span> {el.script?.content} <span>{el.team?.team_name}</span></p></div>))}
        </>
    );
}

export default Right_panel_;