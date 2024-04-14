import { useState } from 'react'
import styles from './content.module.css'

const Record = ({ el }) => {
    return (
        <div className={styles.Record}>
        <p style={{marginRight: '40px', fontSize: '18px', width: '220px'}}>{el.user.first_name} {el.user.last_name}</p>
            <p style={{marginLeft: '10px'}}>{el.rebound == 0 ? 0 : el.rebound}</p> /
            <p style={{marginLeft: '10px'}}>{el.shot == 0 ? 0 : el.shot}</p> /
            <p style={{marginLeft: '10px'}}>{el.point == 0 ? 0 : el.point}</p>
            <p style={{marginLeft: '10px'}}>{el.shot_relize == 0 ? 0 : el.shot_relize}</p> /
            <p style={{marginLeft: '10px'}}>{el.passage == 0 ? 0 : el.passage}</p> /
            <p style={{marginLeft: '10px'}}>{el.blockshot == 0 ? 0 : el.blockshot}</p>
        </div>
    );
}

export default Record;