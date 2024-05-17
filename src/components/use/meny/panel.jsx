import styles from './panel.module.css'
import { useNavigate } from 'react-router-dom';

const Panel = ({ RunModal, style }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.panel} style={style}>
            <div className={styles.all_place}>
                <div className={styles.panel_place} onClick={() => navigate('/')}><img src="/svg/news.svg" /><p>новости</p></div>
                <div className={styles.panel_place} onClick={() => navigate('/musik')}><img src="/svg/nota.svg" id={styles.id_2} /><p>музыка</p></div>
                <div className={styles.panel_place} onClick={() => navigate('/chat')}><img src="/svg/chat.svg" id={styles.id_3} /><p>чат</p></div>
                <div className={styles.panel_place} onClick={() => navigate('/community')}><img src="/svg/people.svg" id={styles.id_1} /><p>сообщество</p></div>
                <div className={styles.panel_place} onClick={RunModal}><img src="/svg/gragon.svg" id={styles.id_4} /><p>дисциплины</p></div>
                <div className={styles.panel_place} onClick={() => navigate('/cash')}><img src="/svg/cash.svg" /><p>расходы</p></div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.panel_esche}>
                <p onClick={() => navigate('/razrabam')}>разработчикам</p>
                {/* <p>еще</p><img src="/svg/arow.svg" id={styles.id_5} /> */}
                <p onClick={() => navigate('/blog')} id={styles.id_5}>о нас</p>
                <p onClick={() => navigate('/help')} id={styles.esche}>помощь</p>
                <p onClick={() => navigate('/blog')} id={styles.esche}>блог</p>
            </div>
        </div>
    );
}

export default Panel;