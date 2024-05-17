import styles from './tournament.module.css'
import { useNavigate } from 'react-router-dom';

const Matchq = ({ match, str_direction }) => {
    let navigate = useNavigate()
    return (
        <>
            <div><div className={styles.fight} style={{ margin: '10px' }} onClick={() => navigate(`/${str_direction}/meeting/${match.id}`)}>
                <div style={{ borderBottom: '1px solid #a5a5a5' }}>
                    <div style={{ backgroundColor: `${match?.team_one?.color}`, opacity: '0.8' }} ><p className={styles.teamm}>{match?.team_one?.name}<span>{match?.team_one_ball == '0' & match?.team_two_ball == '0' ? ' ' : match?.team_one_ball}</span></p></div>
                    <div style={{ backgroundColor: `${match?.team_two?.color}`, opacity: '0.8' }} className={styles.store}><p className={styles.teamm}>{match?.team_two?.name}<span>{match?.team_two_ball == '0' & match?.team_one_ball == '0' ? ' ' : match?.team_two_ball}</span></p></div>
                </div>
                <div></div>
            </div></div>
        </>
    );
}

export default Matchq;