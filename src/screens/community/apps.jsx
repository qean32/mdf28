import { useEffect, useState } from 'react';
import Header from "../../components/use/meny/header";
import Panel from '../../components/use/meny/panel';
import Right_panel from '../../components/regular/community/community/right_panel';
import Content from '../../components/regular/community/apps/apps';
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';
import Content_modal_app_2 from '../../components/use/one/modal_app_2';
import Content_modal_app_1 from '../../components/use/one/modal_app_1';

const Apps = () => {
    const [viewShadow, setviewShadow] = useState(false)
    const [viewModal, setviewModal] = useState(false)
    const [viewModalone, setviewModalone] = useState(false)
    const [viewModalonetwo, setviewModalonetwo] = useState(false)
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
        width: '680px',
        height: '455px',
    })
    const [propsStyle_two1, setpropsStyle_two1] = useState({
        display: 'flex',
        width: '97%',
        height: '96%',
        flexDiraction: 'row',
    })
    const of_modal = () => {
        setviewModal(false)
        setviewModalone(false)
        setviewModalonetwo(false)
        setviewShadow(false)
    }
    const go_modal_dis = () => {
        setviewModal(true)
        setviewShadow(true)
    }
    const go_modal_one = () => {
        setviewModalone(true)
        setviewShadow(true)
    }
    const go_modal_two = () => {
        setviewModalonetwo(true)
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
                <Modal viewModal={viewModalone} component={<Content_modal_app_1 of={of_modal} />} propsStyle_two={propsStyle_two1} propsStyle={propsStyle1} />
                <Modal viewModal={viewModalonetwo} component={<Content_modal_app_2 of={of_modal} />} propsStyle_two={propsStyle_two1} propsStyle={propsStyle1} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal={go_modal_dis} /></section>
                    <section><Content model_go_two={go_modal_two} modal_go_one={go_modal_one} /></section>
                    <section><Right_panel /></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Apps;