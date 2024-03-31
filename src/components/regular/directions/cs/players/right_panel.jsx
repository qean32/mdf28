import Right_panel_place from '../../../../use/meny/right_panel_place';
import styles from './content.module.css'

const Right_panel = () => {
    return (
        <div className={styles.content_right_}>
            <Right_panel_place navigat={'/cs/tournaments'} namee={'турниры'} />
            <Right_panel_place navigat={'/cs'} namee={'новости'} />
            <Right_panel_place navigat={'/cs/meetings'} namee={'встречи'} />
            <Right_panel_place navigat={'/cs/players'} namee={'игроки'} />
            <Right_panel_place navigat={'/cs/teams'} namee={'команды'} />
            {/* <Right_panel_place navigat={'/dota/protokols'} namee={'протоколы'}/> */}
        </div>
    );
}

export default Right_panel;