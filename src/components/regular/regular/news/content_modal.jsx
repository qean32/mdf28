import styles from './content.module.css'
import Directions from './directions';
import { useEffect, useState } from 'react';

const Content_modal = ({ of_modal }) => {
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 300)
    }, [])
    return (
        <>
            {view ? <>
                <img src="/svg/krestik.svg" onClick={of_modal} className={styles.krestik} />
                <p id={styles.id_23}>спорт</p>
                <p id={styles.id_22}>киберспорт</p>
                <Directions navigat={'/cs'} text={'CS2'} img={'/svg/cs.png'} LOGO={'/svg/cs_logo_small.svg'} id={'id_111'} style={{ border: 'none' }} />
                <Directions navigat={'/dota'} text={'DOTA2'} img={'/svg/dota.svg'} LOGO={'/svg/dota_logo_small.svg'} id={'id_112'} />
                <Directions navigat={''} />
                <Directions navigat={'/bascketball'} text={'баскетбол'} img={'/svg/bascketball.svg'} id={'id_113'} LOGO={'/svg/bascketball_logo_small.svg'} />
            </> : <span className='loader'>загрузка..</span>}
        </>
    );
}

export default Content_modal;