import Header from "../../components/use/meny/header";
import Panel from '../../components/use/meny/panel';
import Right_panel from '../../components/regular/community/community/right_panel';
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';
import Disput_ from '../../components/regular/community/disput/disput';
import Loader from '../../components/use/meny/loader';
import { useContext, useEffect, useState } from "react";
import context from '../../connections/context';


const Disput = () => {

    TitleFUnction('диспут')
    
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host, view, TitleFUnction } = useContext(context)
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal} /></section>
                    <section><Disput_ host={host} /></section>
                    <section><Right_panel /></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Disput;