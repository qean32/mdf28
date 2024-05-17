import { useState } from 'react'
import styles from './meeting.module.css'

const Record = ({ el }) => {
    return (
        <div className={styles.Record}>
            <div className={styles.hero} style={{ backgroundImage: `url(${el.hero?.hero_image})` }}></div>
            <p style={{ marginRight: '40px', fontSize: '18px', width: '120px' }}>{el.user.first_name} {el.user.last_name}</p>
            <p style={{ marginLeft: '2px' }}>{el.kill == 0 ? 0 : el.kill}</p> /
            <p style={{ marginLeft: '2px' }}>{el.death == 0 ? 0 : el.death}</p> /
            <p style={{ marginLeft: '2px', marginRight: '40px' }}>{el.assist == 0 ? 0 : el.assist}</p>
            <p>{el.damage == 0 ? 0 : el.damage}</p> /
            <p>{el.heal == 0 ? 0 : el.heal}</p> /
            <p style={{ marginRight: '130px' }}>{el.damage_t == 0 ? 0 : el.damage_t}</p>
        </div>
    );
}

export default Record;