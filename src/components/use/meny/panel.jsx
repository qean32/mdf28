import styles from './panel.module.css'
import { useNavigate } from 'react-router-dom';

const Panel = ({ go_modal_dis, one, three, four, five, six, seven, style }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.panel} style={style}>
            <div className={styles.all_place}>
                <div className={styles.panel_place} onClick={() => navigate('/')}><img src="/mdf28/svg/news.svg" /><p>новости</p>{one == true && <img src="/mdf28/svg/aroww.svg" id={styles.id_57} />}</div>
                <div className={styles.panel_place} onClick={() => navigate('/musik')}><img src="/mdf28/svg/nota.svg" id={styles.id_2} /><p>музыка</p>{three == true && <img src="/svg/aroww.svg" id={styles.id_57} />}</div>
                <div className={styles.panel_place} onClick={() => navigate('/chat')}><img src="/mdf28/svg/chat.svg" id={styles.id_3} /><p>чат</p>{four == true && <img src="/svg/aroww.svg" id={styles.id_57} />}</div>
                <div className={styles.panel_place} onClick={() => navigate('/community')}><img src="/mdf28/svg/people.svg" id={styles.id_1} /><p>сообщество</p>{five == true && <img src="/svg/aroww.svg" id={styles.id_57} />}</div>
                <div className={styles.panel_place} onClick={go_modal_dis}><img src="/mdf28/svg/gragon.svg" id={styles.id_4} /><p>дисциплины</p>{six == true && <img src="/svg/aroww.svg" id={styles.id_57} />}</div>
                <div className={styles.panel_place} onClick={() => navigate('/cash')}><img src="/mdf28/svg/cash.svg" /><p>расходы</p> {seven == true && <img src="/svg/aroww.svg" id={styles.id_57} />}</div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.panel_esche}>
                <p onClick={() => navigate('/razrabam')}>разработчикам</p>
                {/* <p>еще</p><img src="/svg/arow.svg" id={styles.id_5} /> */}
                <p onClick={() => navigate('/info')} id={styles.id_5}>о нас</p>
                <p onClick={() => navigate('/help')} id={styles.esche}>помощь</p>
                <p onClick={() => navigate('/blog')} id={styles.esche}>блог</p>
            </div>
        </div>
    );
}

export default Panel;