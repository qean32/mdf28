import styles from './tournament.module.css'
import Match from './match';

const Tournament_10 = ({ matches, str_direction }) => {
    return (
        <>
            <div className={styles.grid}>
                <div className={styles.first}>
                    <p style={{ marginLeft: '25px', transform: 'translateY(-9px)' }}>верхняя сетка: </p>
                    <div><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '180px', right: '-180px' }}></div>
                        <div id={styles.line} style={{ width: '80px', right: '-220px', transform: 'rotate(90deg) translateX(40px)' }}></div>
                        <div id={styles.line} style={{ width: '120px', right: '-300px', transform: 'translateY(56px)' }}></div>
                        <Match str_direction={str_direction} match={matches[0]} />
                        <div></div>
                    </div></div>
                    <div><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '180px', right: '-180px' }}></div>
                        <Match str_direction={str_direction} match={matches[1]} />
                        <div></div>
                    </div></div>
                    <div><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '420px', right: '-420px' }}></div>
                        <div id={styles.line} style={{ width: '105px', right: '-472px', transform: 'rotate(90deg) translateX(-52px)' }}></div>
                        <Match str_direction={str_direction} match={matches[2]} />
                        <div></div>
                    </div></div>
                    <p style={{ marginBlock: '16px', marginLeft: '40px' }}>нижняя сетка: </p>
                    <div className={styles.prev_f}><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '65px', right: '-65px' }}></div>
                        <Match str_direction={str_direction} match={matches[3]} />
                        <div></div>
                    </div></div>
                    <div className={styles.prev_f}><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '65px', right: '-65px' }}></div>
                        <Match str_direction={str_direction} match={matches[4]} />
                        <div></div>
                    </div></div>
                </div>
                <div className={styles.first}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div><div className={styles.fight}>
                        <div className={styles.prev_f} id={styles.line} style={{ width: '85px', right: '-65px' }}></div>
                        <Match str_direction={str_direction} match={matches[5]} />
                        <div></div>
                    </div></div>
                    <div><div className={styles.fight}>
                        <div className={styles.prev_f} id={styles.line} style={{ width: '85px', right: '-31px' }}></div>
                        <div id={styles.line} style={{ width: '80px', right: '-90px', transform: 'rotate(90deg) translateX(-40px)' }}></div>
                        <Match str_direction={str_direction} match={matches[6]} />
                        <div></div>
                    </div></div>
                </div>
                <div className={styles.first}>
                    <div></div>
                    <div><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '459px', right: '-459px' }}></div>
                        <div id={styles.line} style={{ width: '240px', right: '-579px', transform: 'rotate(90deg) translateX(120px)' }}></div>
                        <Match str_direction={str_direction} match={matches[7]} />
                        <div></div>
                    </div></div>
                    <div></div>
                    <div></div>
                    <div className={styles.prev_f}><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '70px', right: '-70px' }}></div>
                        <Match str_direction={str_direction} match={matches[8]} />
                        <div></div>
                    </div></div>
                </div>
                <div className={styles.first}>
                    <div></div>
                    <div className={styles.prev_f}><div className={styles.fight}>
                        <Match str_direction={str_direction} match={matches[9]} />
                        <div></div>
                    </div></div>
                    <div></div>
                    <div></div>
                    <div className={styles.prev_f}><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '70px', right: '-70px' }}></div>
                        <Match str_direction={str_direction} match={matches[10]} />
                        <div></div>
                    </div></div>
                </div>
                <div className={styles.first}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className={styles.prev_f}><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '70px', right: '-69px' }}></div>
                        <div id={styles.line} style={{ width: '37px', right: '-107px', top: '-191px' }}></div>
                        <Match str_direction={str_direction} match={matches[11]} />
                    </div></div>
                    <div></div>
                </div>
                <div className={styles.first}>
                    <p style={{ marginLeft: '25px', transform: 'translateY(-9px)', color: 'whitesmoke' }}>-</p>
                    <div></div>
                    <div style={{ transform: 'translateX(55px)' }}><div className={styles.fight}>
                        <Match str_direction={str_direction} match={matches[12]} />
                    </div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
}

export default Tournament_10;