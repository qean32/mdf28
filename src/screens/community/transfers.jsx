import { useEffect, useState } from 'react';
import Header from "../../components/use/meny/header";
import Panel from '../../components/use/meny/panel';
import Right_panel from '../../components/regular/community/community/right_panel';
import Content from '../../components/regular/community/transfers/transfers';
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';

const Transfers = () => {
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
        flexDirectoraction: 'row',
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
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal={go_modal_directions} /></section>
                    <section><Content /></section>
                    <section><Right_panel /></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Transfers;