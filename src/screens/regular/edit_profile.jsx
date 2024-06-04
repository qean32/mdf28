import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';
import Header from "../../components/use/meny/header";
import Panel from "../../components/use/meny/panel";
import Edit_Profile_ from '../../components/regular/regular/edit_profile/edit_profile';
import context from '../../connections/context';
import { useContext, useEffect, useState } from "react";
import Loader from '../../components/use/meny/loader';

const EditProfile_PAGE = () => {
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host, view, TitleFUnction } = useContext(context) 
    
    TitleFUnction('редактирование профиля')
    return (
        <>
            {view ? <main style={{ height: '90px' }}>
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main style={{ height: '912px' }}>
                    <section><Panel RunModal={RunModal} /></section>
                    <section>
                        <Edit_Profile_ host={host} />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default EditProfile_PAGE;