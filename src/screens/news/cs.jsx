import Header from "../../components/use/meny/header";
import Panel from "../../components/use/meny/panel";
import { useEffect, useState } from 'react';
import Shadow from "../../components/use/meny/shadow";
import Modal from "../../components/use/meny/modal";
import Content_modal from "../../components/regular/regular/news/content_modal";
import Right_panel from "../../components/regular/directions/cs/news/right_panel";
import Content from "../../components/regular/directions/cs/news/content";
import Right_panel_place from "../../components/use/meny/right_panel_place";

const Cs = () => {
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
    const go_modal_directions = () => {
        setviewModal(true)
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
                <img src="/svg/oper_1.svg" alt="" id="id_bck_3" />
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal={go_modal_directions} /></section>
                    <section><Content /></section>
                    <section id="s_id">
                        <Right_panel />
                        <div className='content_right_'>
                            <Right_panel_place navigat={'/cs/protokols'} namee={'протоколы'} />
                        </div></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Cs;