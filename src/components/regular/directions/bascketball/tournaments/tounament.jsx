import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';

const Tounament = ({ el }) => {
    const navigate = useNavigate();
    return (
        <>
            {el.name && <div className={styles.content} onClick={() => navigate(`/bascketball/tournament/${el.id}`)}>
                <div className={styles.match}>
                    <div className={styles.team}><p>{el.name}</p><img src="/mdf28/svg/venok.svg" id={styles.id_5} /></div>
                    <div><p style={{ color: '#a5a5a5', fontSize: '16px', transform: 'translateX(-10px)' }}>дата окончания принятия заявок: - {el.date}</p></div>
                </div>
            </div>}
        </>
    );
}

export default Tounament;