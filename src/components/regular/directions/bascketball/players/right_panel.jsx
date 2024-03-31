import Right_panel_place from '../../../../use/meny/right_panel_place';
import styles from './content.module.css'

const Right_panel = () => {
    return (
        <div className={styles.content_right_}>
            <Right_panel_place navigat={'/bascketball/tournaments'} namee={'турниры'} />
            <Right_panel_place navigat={'/bascketball'} namee={'новости'} />
            <Right_panel_place navigat={'/bascketball/meetings'} namee={'встречи'} />
            <Right_panel_place navigat={'/bascketball/players'} namee={'игроки'} />
            <Right_panel_place navigat={'/bascketball/teams'} namee={'команды'} />
            {/* <Right_panel_place navigat={'/dota/protokols'} namee={'протоколы'}/> */}
        </div>
    );
}

export default Right_panel;