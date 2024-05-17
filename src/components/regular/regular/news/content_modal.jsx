import styles from './news.module.css'
import Directions from './directions';
import { useEffect, useState } from 'react';

const Content_modal = ({ OfModal, linkcs, linkdota, linkbascketball }) => {
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 300)
    }, [])
    return (
        <>
            {view ? <>
                <img src="/svg/krestik.svg" onClick={OfModal} className={styles.krestik} />
                <p id={styles.id_23}>спорт</p>
                <p id={styles.id_22}>киберспорт</p>
                <Directions navigat={linkcs} text={'CS2'} img={'/svg/cs.png'} LOGO={'/svg/cs_logo_small.svg'} id={'id_111'} style_={{ border: 'none' }} />
                <Directions navigat={linkdota} text={'DOTA2'} img={'/svg/dota.svg'} LOGO={'/svg/dota_logo_small.svg'} id={'id_112'} />
                <Directions navigat={''} />
                <Directions navigat={linkbascketball} text={'баскетбол'} img={'/svg/bascketball.svg'} id={'id_113'} LOGO={'/svg/bascketball_logo_small.svg'} />
            </> : <span className='loader'>загрузка..</span>}
        </>
    );
}

export default Content_modal;