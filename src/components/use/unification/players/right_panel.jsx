import { useNavigate } from 'react-router-dom';
import styles from './players.module.css'

const Right_panel = ({str_direction}) => {
    let navigate = useNavigate()
    return (
        <div className={styles.content_right_}>
            <div onClick={() => navigate(`/${str_direction}/tournaments`)}>турниры</div>
            <div onClick={() => navigate(`/${str_direction}/meetings`)}>матчи</div>
            <div onClick={() => navigate(`/${str_direction}`)}>новости</div>
            <div onClick={() => navigate(`/${str_direction}/teams`)}>команды</div>
            <div onClick={() => navigate(`/${str_direction}/players`)}>игроки</div>
        </div>
    );
}

export default Right_panel;