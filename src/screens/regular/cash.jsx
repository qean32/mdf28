import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';
import Header from "../../components/use/meny/header";
import Panel from "../../components/use/meny/panel";
import Cash_ from '../../components/regular/regular/cash/cash';
import Right_panel_cash from '../../components/use/right_form/right_form';
import context from '../../connections/context';
import { useContext, useEffect, useState } from "react";
import Loader from '../../components/use/meny/loader';

const Cash_PAGE = () => {
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host } = useContext(context)
    
    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    
    useEffect(() => {
        document.title = 'расходы';
    }, [])
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal} style={{ right: '90px' }} /></section>
                    <section>
                        <Cash_ host={host} />
                    </section>
                    <section id="s_id"><Right_panel_cash /></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Cash_PAGE;