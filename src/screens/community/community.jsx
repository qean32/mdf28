import { useContext, useEffect, useState } from "react";
import Header from "../../components/use/meny/header";
import Panel from '../../components/use/meny/panel';
import Right_panel from '../../components/regular/community/community/right_panel';
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';
import Community_ from '../../components/regular/community/community/community';
import Loader from '../../components/use/meny/loader';
import context from '../../connections/context';

const Community_PAGE = () => {

    useEffect(() => {
        document.title = 'сообщество';
    }, [])
    
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host } = useContext(context)
    
    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal} /></section>
                    <section><Community_ host={host} /></section>
                    <section><Right_panel /></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Community_PAGE;