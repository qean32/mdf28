import Right_panel_place from '../../../../use/meny/right_panel_place';
import styles from './content.module.css'

const Right_panel = () => {
    return (
        <div className={styles.content_right_}>
            <Right_panel_place navigat={'/dota/tournaments'} namee={'турниры'} />
            <Right_panel_place navigat={'/dota'} namee={'новости'} />
            <Right_panel_place navigat={'/dota/meetings'} namee={'встречи'} />
            <Right_panel_place navigat={'/dota/players'} namee={'игроки'} />
            <Right_panel_place navigat={'/dota/teams'} namee={'команды'} />
            {/* <Right_panel_place navigat={'/dota/protokols'} namee={'протоколы'}/> */}
        </div>
    );
}

export default Right_panel;