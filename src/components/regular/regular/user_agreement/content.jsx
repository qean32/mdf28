import { useNavigate } from 'react-router-dom';
import styles from './content.module.css'

const Content = () => {
    let navigate = useNavigate()
    return (
        <>
            <div className={styles.content}>
                <img src="/svg/long_arrow.svg" id={styles.id_04} onClick={() => navigate(-1)} />
            </div>
        </>
    );
}

export default Content 