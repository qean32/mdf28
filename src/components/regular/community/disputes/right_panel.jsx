import styles from './disputes.module.css'
import Right_panel_place from '../../../use/right_panel_place';

const Right_panel = () => {
    return (
        <div className={styles.content_right_}>
            <Right_panel_place namee={'трансферы'}/>
            <Right_panel_place namee={'диспуты'}/>
            <Right_panel_place namee={'люди'}/>
            <Right_panel_place namee={'приложения'}/>
        </div>
    );
}

export default Right_panel;