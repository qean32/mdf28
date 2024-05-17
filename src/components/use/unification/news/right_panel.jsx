import styles from './news.module.css'
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import Right_panel from '../players/right_panel';
import { useNavigate } from 'react-router-dom';
import context from '../../../../connections/context';

const Right_panel_ = ({host, direction, str_direction}) => {
    let { user } = useContext(context)
    const navigate = useNavigate();
    const [team, setteam] = useState()
    const [trans, settrans] = useState([])
    let SearhTeam = async () => {
        let response = await fetch(`${host}/api/unification/search/team/?limit=4&offset=0&direction=${direction}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setteam(data.results)
    }
    let SearhTransfer = async () => {
        let response = await fetch(`${host}/api/transfers/search/?limit=1&offset=0&direction=${direction}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        settrans(data.results)
    }
    const [Player, setPlayer] = useState()
    useEffect(() => {
        SearhTeam()
        SearhTransfer()
        SearhPlayer()
    }, [])
    let SearhPlayer = async () => {
        let response = await fetch(`${host}/api/unification/search/player/${str_direction}/?user=${user?.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setPlayer(data.results[0])
    }

    return (
        <>
            <Right_panel str_direction={str_direction} />
            {trans.map((el) => (<div key={el.id} className={styles.content_right_trans}><p><span onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name}</span> {el.script?.content} <span onClick={() => navigate(`/${direction}/team/${el.team?.id}`)}>{el.team?.name ? el.team?.name : 'команда удалена*'}</span></p></div>))}
            <div className={styles.content_right}>
                <p>побед в матчах</p>
                <div className={styles.teams}>
                    {team && team.map((el) => (
                        <div className='transformup' key={el.id}>
                            <div onClick={() => navigate(`/${str_direction}/team/${el?.id}`)} style={{ backgroundImage: `url(${el.logo}` }}></div>
                        </div>
                    ))}
                </div>
            </div>
            {!Player?.user && <div className='content_right_'><div onClick={() => navigate(`/${str_direction}/regplayer`)}><p>стать игроком</p></div></div>}
        </>
    );
}

export default Right_panel_;