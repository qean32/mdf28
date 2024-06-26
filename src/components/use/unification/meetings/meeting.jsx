import styles from './meetings.module.css'
import { useNavigate } from 'react-router-dom';

const Meeting = ({ el, str_direction }) => {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.content} onClick={() => navigate(`/${str_direction}/meeting/${el.id}`)}>
                <div className={styles.match}>
                    <div className={styles.team}><p>{el?.team_one?.name}</p></div>
                    <div className={styles.info}>
                        {el.is_qualification && <p style={{ transform: 'translateX(-7px)' }}>{el?.team_one_ball ? el?.team_one_ball : 0} : {el?.team_two_ball ? el.team_two_ball : 0}</p>}
                        {el.is_qualification == false && <><p>{el?.team_one_score ? el?.team_one_score : 0} : {el?.team_two_score ? el?.team_two_score : 0}</p></>}
                        {el.is_friends == false && <img src='/svg/cup.svg' style={{ height: '23px', transform: 'translateX(2px) translateY(2px)' }} />}
                        {el.is_friends && <img src='/svg/friends.svg' style={{ transform: 'translateX(-7px) translateY(4px)' }} />}
                    </div>
                    <div className={styles.team}><p>{el?.team_two?.name}</p></div>
                    <div className={styles.infoo}>
                        <p>{el.date ? el.date : '------"'}</p>
                        <p>b0{el.matches}</p>
                        {el.is_qualification && <p style={{ position: 'absolute', top: '20px', right: '15px' }}>квалификация</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Meeting;