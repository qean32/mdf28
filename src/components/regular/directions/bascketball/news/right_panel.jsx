import styles from '../../../regular/news/content.module.css'
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import Right_panel from '../players/right_panel';
import { useNavigate } from 'react-router-dom';
import context from '../../../../../connections/context';

const Right_panel_ = ({ go_modal }) => {
    let { user } = useContext(context)
    const navigate = useNavigate();
    const [team, setteam] = useState()
    const [trans, settrans] = useState([])
    let SearhTeam = async () => {
        let response = await fetch('http://qean32.beget.tech/api/bascketball/search/team/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setteam(data.results)
    }
    let SearhTransfer = async () => {
        let response = await fetch('http://qean32.beget.tech/api/tranfers/search/BASCKETBALL/?limit=1&offset=0', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        settrans(data.results)
    }

    const [UsInfoDOTA, setUsinfoDOTA] = useState()
    useEffect(() => {
        SearhTeam()
        SearhTransfer()
        SearhDOTAUser()
    }, [])
    let SearhDOTAUser = async () => {
        let response = await fetch(`http://qean32.beget.tech/api/bascketball/search/player/?user=${user?.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setUsinfoDOTA(data.results[0])
    }

    return (
        <>
            <Right_panel />
            {trans.map((el) => (<div className={styles.content_right_trans}><p><span onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name}</span> {el.script?.content} <span onClick={() => navigate(`/dota/team/${el.team?.id}`)}>{el.team?.team_name}</span></p></div>))}
            <div className={styles.content_right}>
                <p>побед в матчах</p>
                <div className={styles.teams}>
                    {team && team.map((el) => (
                        <div key={el.id}>
                            <div onClick={() => navigate(`/bascketball/team/${el?.id}`)} style={{ backgroundImage: `url(${el.logo}` }}></div>
                        </div>
                    ))}
                </div>
            </div>
            {!UsInfoDOTA?.user && <div className='content_right_'><div onClick={() => navigate('/bascketball/regplayer')}><p>стать игроком</p></div></div>}
        </>
    );
}

export default Right_panel_;