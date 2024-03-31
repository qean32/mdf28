import { useEffect, useState } from 'react';
import Header from "../../../components/use/meny/header";
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Content from '../../../components/regular/directions/bascketball/reg_player/content';

const RegPlayer_B = () => {
    const [viewShadow, setviewShadow] = useState(false)
    const [viewModal, setviewModal] = useState(false)
    const [propsStyle, setpropsStyle] = useState({
        width: '680px',
        height: '255px',
    })
    const [propsStyle_two, setpropsStyle_two] = useState({
        display: 'flex',
        width: '97%',
        height: '92%',
        flexDiraction: 'row',
    })
    const of_modal = () => {
        setviewModal(false)
        setviewShadow(false)
    }
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    return (
        <>
            {view ? <main style={{ height: '90px' }}>
                <img src="/svg/bascketball_2.svg" alt="" id="id_bck_2" style={{transform: 'scaleX(1)', height: '410px', bottom: '20px'}}/>
                <img src="/svg/bascketball_2.svg" alt="" id="id_bck_1" style={{ height: '410px', bottom: '20px', left: '25px'}}/>
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Header />
                <main style={{ height: '912px' }}>
                    <section></section>
                    <section>
                        <Content />
                    </section>
                    <section></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default RegPlayer_B;