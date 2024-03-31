import { useState } from 'react'
import styles from './content.module.css'

const Player = ({ el, select, setselect }) => {
    const [on, seton] = useState(false)
    let pro = (idp) => {
        if (on) {
            seton(false)
            setselect(select.filter(el => el != idp))
            console.log(select)
        } else {
            seton(true)
            setselect([...select, idp])
            console.log(select)
        }
    }
    return (
        <div className={styles.info_el} onClick={() => pro(el.user?.id)}><div style={{ backgroundImage: `url(${el.user?.ava})` }} className={styles.ava1}></div><p>{el.user?.first_name} {el.user?.last_name} {el.user?.smail && <div style={{ backgroundImage: `url(${el.user?.smail.image})` }} className={styles.smail}></div>}
            {el.user?.team_sap && <div style={{ backgroundImage: `url(${el.user?.team_sap.image})` }} className={styles.smail}></div>}
            {el.is_recognized && <img src='/svg/venok.svg' id={styles.id_2} />} </p><div className={styles.dotas}> <div style={on ? { height: '20px', width: '20px', background: 'green', position: 'absolute', right: '80px', opacity: '0.7', marginTop: '15px', borderRadius: '5px' } : { height: '20px', width: '20px', background: 'green', position: 'absolute', right: '80px', opacity: '0', marginTop: '15px', borderRadius: '5px' }}> </div><img src={el.rank?.image_rank} alt="" /></div></div>
    );
}

export default Player;