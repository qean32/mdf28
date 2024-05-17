import styles from './tournament.module.css'
import Match from './match';

const Tournament_11 = ({ matches, str_direction }) => {
    return (
        <>
            <div className={styles.grid}>
                <div className={styles.first}>
                    <p style={{ marginLeft: '25px', transform: 'translateY(-9px)' }}>верхняя сетка: </p>
                    <div><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '360px', right: '-360px' }}></div>
                        <div id={styles.line} style={{ width: '80px', right: '-400px', transform: 'rotate(90deg) translateX(40px)' }}></div>
                        <div id={styles.line} style={{ width: '100px', right: '-460px', transform: 'translateY(56px)' }}></div>
                        <Match str_direction={str_direction} match={matches[0]} />
                        <div></div>
                    </div></div>
                    <div><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '360px', right: '-360px' }}></div>
                        <Match str_direction={str_direction} match={matches[1]} />
                        <div></div>
                    </div></div>
                    <div><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '620px', right: '-590px' }}></div>
                        <div id={styles.line} style={{ width: '105px', right: '-642px', transform: 'rotate(90deg) translateX(-52px)' }}></div>
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
                    <div><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '240px', right: '-240px' }}></div>
                        <div id={styles.line} style={{ width: '160px', right: '-320px', transform: 'rotate(90deg) translateX(-80px)' }}></div>
                        <div id={styles.line} style={{ width: '20px', right: '125px', transform: "translateY(12px)" }}></div>
                        <Match str_direction={str_direction} match={matches[7]} />
                        <div></div>
                    </div></div>
                </div>
                <div className={styles.first}>
                    <div></div>
                    <div></div>
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
                    <div><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '410px', right: '-410px' }}></div>
                        <div id={styles.line} style={{ width: '240px', right: '-530px', transform: 'rotate(90deg) translateX(120px)' }}></div>
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
                    <div><div className={styles.fight}>
                        <Match str_direction={str_direction} match={matches[11]} />
                        <div></div>
                    </div></div>
                    <div></div>
                    <div></div>
                    <div className={styles.prev_f}><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '70px', right: '-70px' }}></div>
                        <Match str_direction={str_direction} match={matches[12]} />
                        <div></div>
                    </div></div>
                </div>
                <div className={styles.first}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div className={styles.prev_f}><div className={styles.fight}>
                        <div id={styles.line} style={{ width: '20px', right: '-19px' }}></div>
                        <div id={styles.line} style={{ width: '37px', right: '-57px', top: '-191px' }}></div>
                        <Match str_direction={str_direction} match={matches[13]} />
                    </div></div>
                    <div></div>
                </div>
                <div className={styles.first}>
                    <p style={{ marginLeft: '25px', transform: 'translateY(-9px)', color: 'whitesmoke' }}>-</p>
                    <div></div>
                    <div><div className={styles.fight}>
                        <Match str_direction={str_direction} match={matches[14]} />
                    </div></div>
                    <div></div>
                </div>
            </div>
        </>
    );
}

export default Tournament_11;