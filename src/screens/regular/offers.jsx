import Offers_ from "../../components/regular/regular/offers/offers";
import Header from "../../components/use/meny/header";
import { useState, useEffect } from "react";
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import ContentModalOffers from "../../components/use/one/modal_offer";
import context from '../../connections/context';
import { useContext } from 'react';
import Loader from '../../components/use/meny/loader';

const Offers_PAGE = () => {
    const [viewModal_1, setviewModal_1] = useState(false)
    const [viewModal_2, setviewModal_2] = useState(false)
    let { viewModal, viewShadow, host, setviewShadow,setviewModal, view, TitleFUnction } = useContext(context)

    TitleFUnction('приглашения')

    let OfModal = () => {
        setviewModal(false)
        setviewShadow(false)
        setviewModal_1(false)
        setviewModal_2(false)
    }

    let RunModal = (set) => {
        setviewModal(true)
        setviewShadow(true)
        setviewModal_1(false)
        setviewModal_2(false)  
        set(true)    
    }

    let propsStyle_ = {
        width: '97%',
        height: '96%',
    }

    let propsStyle = {
        width: '680px',
        height: '455px',
    }
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<ContentModalOffers OfModal={OfModal} str_direction={'dota'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_1} component={<ContentModalOffers OfModal={OfModal} str_direction={'cs'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_2} component={<ContentModalOffers OfModal={OfModal} str_direction={'bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section></section>
                    <section><Offers_ go_modal={() => RunModal(setviewModal)} go_modal_1={() => RunModal(setviewModal_1)} go_modal_2={() => RunModal(setviewModal_2)} host={host} /></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Offers_PAGE;