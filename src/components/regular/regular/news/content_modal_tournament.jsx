import styles from './content.module.css'
import Directions from './directions';
import { useEffect, useState } from 'react';

const Content_modal_tournaments = ({ of_modal }) => {
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
                <Directions navigat={'/cs/tournaments'} id={'id_111'} text={'CS2'} img={'/svg/cs.png'} LOGO={'/svg/cs_logo_small.svg'} iscs={true} style={{ border: 'none' }} />
                <Directions navigat={'/dota/tournaments'} text={'DOTA'} id={'id_112'} img={'/svg/dota.svg'} LOGO={'/svg/dota_logo_small.svg'} />
                <Directions navigat={''} />
                <Directions navigat={'/bascketball/tournaments'} text={'баскетбол'} id={'id_113'} img={'/svg/bascketball.svg'} LOGO={'/svg/bascketball_logo_small.svg'} />
            </> : <span className='loader'>загрузка..</span>}
        </>
    );
}

export default Content_modal_tournaments;