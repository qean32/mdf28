import { useEffect, useState } from 'react'
import styles from './teams.module.css'
import { useNavigate } from 'react-router-dom';

const Team = ({ el, host,str_direction }) => {
    const navigate = useNavigate();

    const [countMatch, seetcountMatch] = useState(0)

    let SearhCountMatch = async (id) => {
        let response = await fetch(`${host}/api/unification/search/match/?team_one=${id}&limit=299`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        seetcountMatch((prew) => prew + data.count)
    }
    let SearhCountMatch_ = async (id) => {
        let response = await fetch(`${host}/api/unification/search/match/?team_two=${id}&limit=299`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        seetcountMatch((prew) => prew + data.count)
    }

    useEffect(() => {
        SearhCountMatch(el.id)
        SearhCountMatch_(el.id)
    }, [])

    return (
        <div className={styles.teams_el} onClick={() => navigate(`/${str_direction}/team/${el.id}`)}>
            <div style={{ backgroundImage: `url(${el.logo})` }} className={styles.ava}></div><p>{el.name} {el.is_recognized && <img src='/svg/venok.svg' id={styles.id_2} />}</p>
            <div className={styles.teams}><div><div><img src="/svg/flag.svg" />{countMatch}<img src="/svg/cup.svg" style={{ transform: "translateY(1px)" }} />{el.tournament}</div>
            </div></div></div>)
}

export default Team;