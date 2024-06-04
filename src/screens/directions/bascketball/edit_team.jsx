import Header from "../../../components/use/meny/header";
import Panel from '../../../components/use/meny/panel';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Edit_Team from '../../../components/use/unification/edit_team/edit_Team';
import Background from '../../../components/use/background/bascketball_background';
import { useContext, useEffect, useState } from "react";
import Loader from '../../../components/use/meny/loader';
import context from '../../../connections/context';

const EditTeam_PAGE = () => {
    let direction = 4
    let str_direction = 'bascketball'
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host, view, TitleFUnction } = useContext(context) 
    
    TitleFUnction('редактор команд')
    return (
        <>
            {view ? <main style={{ height: '90px' }}>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />propsStyle_
                <main style={{ height: '912px' }}>
                    <section><Panel RunModal={RunModal} /></section>
                    <section>
                        <Edit_Team host={host} direction={direction} str_direction={str_direction} />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default EditTeam_PAGE;