import { useEffect, useState } from 'react'
import styles from './apps.module.css'

const App = ({ text, img, style, go }) => {
    return (
        <>
            <div className={styles.app}>
                <img src={img} style={style} />
                <div>
                    <div><p>{text}</p></div>
                    <div className={styles.more} onClick={go}><p>побробнее</p></div>
                </div>
            </div>
        </>
    );
}

export default App;