import Header from "../../components/use/meny/header";
import Shadow from "../../components/use/meny/shadow";
import Modal from "../../components/use/meny/modal";
import Content_modal_musik from '../../components/use/one/modal_musik';
import context from '../../connections/context';
import { useContext, useEffect, useState } from "react";
import Loader from '../../components/use/meny/loader';

const Musik_PAGE = () => {
    let { host, view, TitleFUnction } = useContext(context) 

    let viewModal = true
    let viewShadow = true

    TitleFUnction('музыка')
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} />
                <Modal viewModal={viewModal} component={<Content_modal_musik />} />
                <Header />
                <main>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Musik_PAGE;