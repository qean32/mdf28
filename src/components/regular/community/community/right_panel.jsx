import styles from './community.module.css'
import Right_panel_place from '../../../use/meny/right_panel_place';

const Right_panel = () => {
    return (
        <div className={styles.content_right_}>
            <Right_panel_place navigat={'/transfers'} namee={'трансферы'}/>
            <Right_panel_place navigat={'/disputes'} namee={'диспуты'}/>
            <Right_panel_place navigat={'/community'} namee={'комьюнити'}/>
            <Right_panel_place navigat={'/apps'} namee={'приложения'}/>
        </div>
    );
}

export default Right_panel;