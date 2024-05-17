import styles from './tournament.module.css'
import { useNavigate } from 'react-router-dom';

const Match = ({ match, str_direction }) => {
    let navigate = useNavigate()
    return (
        <>
            <div style={{ borderBottom: '1px solid #a5a5a5' }} onClick={() => navigate(`/${str_direction}/meeting/${match.id}`)}>
                <div style={{ backgroundColor: `${match?.team_one?.color}`, opacity: '0.8' }} ><p className={styles.teamm}>{match?.team_one?.name}<span>{match?.team_one_score == '0' & match?.team_two_score == '0' ? ' ' : match?.team_one_score}</span></p></div>
                <div style={{ backgroundColor: `${match?.team_two?.color}`, opacity: '0.8' }} className={styles.store}><p className={styles.teamm}>{match?.team_two?.name}<span>{match?.team_two_score == '0' & match?.team_one_score == '0'  ? ' ' : match?.team_two_score}</span></p></div>
            </div>
        </>
    );
}

export default Match;