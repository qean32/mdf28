import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';
import Header from "../../components/use/meny/header";
import Panel from "../../components/use/meny/panel";
import Chat_ from '../../components/regular/regular/chat/chat';
import context from '../../connections/context';
import { useContext, useEffect, useState } from "react";
import Loader from '../../components/use/meny/loader';

const Chat_PAGE = () => {
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host, view, TitleFUnction } = useContext(context) 

    TitleFUnction('расходы')
    return (
        <>
            {view ? <main style={{ height: '90px' }}>
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main style={{ height: '912px' }}>
                    <section><Panel RunModal={RunModal} /></section>
                    <section>
                        <Chat_ host={host} />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Chat_PAGE;