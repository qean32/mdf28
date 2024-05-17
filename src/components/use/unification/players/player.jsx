import { useEffect, useState } from "react";
import styles from './players.module.css'
import { useNavigate } from "react-router-dom";

const Player = ({el, host , direction, str_direction, style_}) => {
    let navigate = useNavigate()
    
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
                </p>
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
                <div className={styles.dotas}>
                    <span onClick={() => navigate(`/team/${el.team?.id}`)}> {el.team?.name} </span>
                    {el.number ? <p style={{margin: '12px', fontSize: '22px'}}>{el.number}</p> : <img src={el.rank?.image} style={style_} alt="" />}
                </div>
            </div>
        </>
    );
};

export default Player;
