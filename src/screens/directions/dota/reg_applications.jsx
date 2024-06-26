import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Panel from '../../../components/use/meny/panel';
import Right_panel from '../../../components/use/unification/players/right_panel';
import Header from '../../../components/use/meny/header';
import Reg_Applications from '../../../components/use/unification/reg_applications/reg_applications';
import Background from '../../../components/use/background/dota_background';
import { useContext, useEffect, useState } from "react";;
import Loader from '../../../components/use/meny/loader';
import context from '../../../connections/context';

const RegApplications_PAGE = () => {

    TitleFUnction('подача заявки')
    
    let direction = 1
    let str_direction = 'dota'
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host, view, TitleFUnction } = useContext(context) 
    return (
        <>
            {view ? <main>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal} /></section>
                    <section><Reg_Applications  host={host} direction={direction} str_direction={str_direction} /></section>
                    <section  id="s_id"><Right_panel str_direction={str_direction}  />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default RegApplications_PAGE;