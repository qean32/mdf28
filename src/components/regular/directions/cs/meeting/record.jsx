import { useState } from 'react'
import styles from './content.module.css'

const Record = ({ el }) => {
    return (
        <div className={styles.Record}>
        <p style={{marginRight: '40px', fontSize: '18px', width: '120px'}}>{el.user.first_name} {el.user.last_name}</p>
            <p style={{marginLeft: '2px'}}>{el.kill == 0 ? 0 : el.kill}</p> /
            <p style={{marginLeft: '2px'}}>{el.death == 0 ? 0 : el.death}</p> /
            <p style={{marginLeft: '2px'}}>{el.assist == 0 ? 0 : el.assist}</p>
            <p style={{marginLeft: '2px'}}>{el.damage == 0 ? 0 : el.damage}</p> /
        </div>
    );
}

export default Record;