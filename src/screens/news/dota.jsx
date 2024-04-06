import Header from "../../components/use/meny/header";
import Panel from "../../components/use/meny/panel";
import { useEffect, useState } from 'react';
import Shadow from "../../components/use/meny/shadow";
import Modal from "../../components/use/meny/modal";
import Content_modal from "../../components/regular/regular/news/content_modal";
import Right_panel from "../../components/regular/directions/dota/news/right_panel";
import Content from "../../components/regular/directions/dota/news/content";
import Content_modal_pts_dota from "../../components/use/one/modal_pts_dota";
import Right_panel_place from "../../components/use/meny/right_panel_place";

const Dota = () => {
    const [viewShadow, setviewShadow] = useState(false)
    const [viewModal, setviewModal] = useState(false)
    const [viewModal1, setviewModal1] = useState(false)
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
    const [propsStyle1, setpropsStyle1] = useState({
        width: '380px',
        height: '200px',
    })
    const [propsStyle_two1, setpropsStyle_two1] = useState({
        display: 'flex',
        width: '94%',
        height: '88%',
        flexDiraction: 'row',
    })
    const of_modal = () => {
        setviewModal(false)
        setviewShadow(false)
        setviewModal1(false)
    }
    const go_modal_dis = () => {
        setviewModal(true)
        setviewShadow(true)
    }
    const go_modal = () => {
        setviewModal1(true)
        setviewShadow(true)
    }
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    return (
        <>
            {view ? <main>
                <img src="/svg/rediant_creaps.svg" alt="" id="id_bck_1"/>
                <img src="/svg/dire_creaps.svg" alt="" id="id_bck_2" />
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Modal viewModal={viewModal1} component={<Content_modal_pts_dota of_modal={of_modal} />} propsStyle_two={propsStyle_two1} propsStyle={propsStyle1} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal_dis={go_modal_dis} /></section>
                    <section><Content /></section>
                    <section id="s_id"><Right_panel of_modal={of_modal} go_modal={go_modal} />
                        <div className='content_right_'>
                            <Right_panel_place navigat={'/dota/protokols'} namee={'протоколы'} />
                        </div></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Dota;