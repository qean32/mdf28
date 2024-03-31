import styles from '../../../regular/news/content.module.css'
import Right_panel_place from '../../../../use/meny/right_panel_place';

const Right_panel = () => {
    return (
        <div className={styles.content_right_}>
            <Right_panel_place namee={'игроки'}/>
            <Right_panel_place namee={'матчи'}/>
            <Right_panel_place namee={'турниры'}/>
            <Right_panel_place namee={'правила'}/>
            <Right_panel_place namee={'протоколы'}/>
        </div>
    );
}

export default Right_panel;