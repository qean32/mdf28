import { useNavigate } from 'react-router-dom';
import styles from './community.module.css'

const Right_panel = () => {
    let navigate = useNavigate()
    return (
        <div className={styles.content_right_}>
            <div onClick={() => navigate('/transfers')}>трансферы</div>
            <div onClick={() => navigate('/disputes')}>диспуты</div>
            <div onClick={() => navigate('/community')}>сообщество</div>
            <div onClick={() => navigate('/apps')}>приложения</div>
        </div>
    );
}

export default Right_panel;