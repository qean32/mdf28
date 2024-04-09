import Right_panel_place from '../../../../use/meny/right_panel_place';
import styles from './content.module.css'

const Right_panel = () => {
    let direction = 'bascketball'
    return (
        <div className={styles.content_right_}>
            <Right_panel_place navigat={`/${direction}/tournaments`} namee={'турниры'} />
            <Right_panel_place navigat={`/${direction}`} namee={'новости'} />
            <Right_panel_place navigat={`/${direction}/meetings`} namee={'встречи'} />
            <Right_panel_place navigat={`/${direction}/players`} namee={'игроки'} />
            <Right_panel_place navigat={`/${direction}/teams`} namee={'команды'} />
        </div>
    );
}

export default Right_panel;