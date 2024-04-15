import { useEffect, useState } from "react";
import styles from './content.module.css'
import { useNavigate } from "react-router-dom";

const Player = ({el}) => {
    let navigate = useNavigate()
    let host = 'https://mdf28server.site'
    let direction = 'bascketball'
    const [record, setrecord] = useState([])
    let SearchRecord = async () => {
        let response = await fetch(`${host}/api/${direction}/search/record_stat/?user=${el.user.id}&limit=99`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setrecord(data.results)
        console.log(data.results)
    }
    useEffect(() => {
        SearchRecord()
    }, [])
    const [all_kill,setall_kill] = useState(0)
    const [all_death,setall_death] = useState(0)
    const [all_assist,setall_assist] = useState(0)
    const [all_gamege,setall_gamege] = useState(0)
    useEffect(() => {
        if (record) {
            for (let index = 0; index < record.length; index++) {
                setall_kill((prew) => prew + record[index].point)
                setall_death((prew) => prew  + record[index].blockshot)
                setall_assist((prew) => prew  + record[index].shot_relize)
                setall_gamege(((prew) => prew  + record[index].rebound))
            }
        }
    },[record])
    return (
        <>
            <div
                className={styles.info_el}
                onClick={() => navigate(`/profile/${el.user?.id}`)}
            >
                <div
                    style={{ backgroundImage: `url(${el.user?.ava})` }}
                    className={styles.ava}
                ></div>
                <p>
                    {el.user?.first_name} {el.user?.last_name}{" "}
                    {el.user?.smail && (
                        <div
                            style={{ backgroundImage: `url(${el.user?.smail.image})` }}
                            className={styles.smail}
                        ></div>
                    )}
                    {el.user?.team_sap && (
                        <div
                            style={{ backgroundImage: `url(${el.user?.team_sap.image})` }}
                            className={styles.smail}
                        ></div>
                    )}
                    {el.is_recognized && <img src="/svg/venok.svg" id={styles.id_2} />}{" "}
                </p>
                <div className={styles.dotas}>

                    <span onClick={() => navigate(`/dota/team/${el.team?.id}`)}> {el.team?.team_name} </span>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center',transform: 'translateX(-10px)'}}><p style={{fontSize: '24px'}}>{el.number}</p></div>
                </div>
            <div className={styles.Record} style={{right: '210px'}}>
                <p style={{ marginLeft: '2px' }}>{all_kill}</p> /
                <p style={{ marginLeft: '2px' }}>{all_death}</p> /
                <p style={{ marginLeft: '2px'}}>{all_assist}</p> /
                <p style={{ marginLeft: '2px'}}>{all_gamege}</p> 
            </div>
            </div>
        </>
    );
};

export default Player;
