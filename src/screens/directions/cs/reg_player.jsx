import Header from "../../../components/use/meny/header";
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Reg_Player from '../../../components/use/unification/reg_player/cs/reg_player';
import Background from '../../../components/use/background/cs_background';
import { useContext, useEffect, useState } from "react";
import Loader from '../../../components/use/meny/loader';
import context from '../../../connections/context';

const RegPlayer_PAGE = () => {

    TitleFUnction('регистрация игрока')
    
    let direction = 3
    let str_direction = 'cs'
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host, view, TitleFUnction } = useContext(context) 
    return (
        <>
            {view ? <main style={{ height: '90px' }}>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main style={{ height: '912px' }}>
                    <section></section>
                    <section>
                        <Reg_Player host={host} direction={direction} str_direction={str_direction} />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default RegPlayer_PAGE;