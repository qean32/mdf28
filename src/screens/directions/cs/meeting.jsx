import Header from "../../../components/use/meny/header";
import Panel from '../../../components/use/meny/panel';
import Right_panel from '../../../components/use/unification/players/right_panel';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Meeting from '../../../components/use/unification/meeting/meeting';
import Background from '../../../components/use/background/cs_background';
import { useContext, useEffect, useState } from "react";
import Loader from '../../../components/use/meny/loader';
import context from '../../../connections/context';

const Meeting_PAGE = () => {
    let direction = 3
    let str_direction = 'cs'
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host } = useContext(context)
    
    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])

    useEffect(() => {
        document.title = 'матч';
    }, [])
    return (
        <>
            {view ? <main>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal}  style={{right: '90px'}}  /></section>
                    <section style={{ paddingTop: '10px' }}><Meeting host={host} direction={direction} str_direction={str_direction} /></section>
                    <section  id="s_id">
                        <Right_panel str_direction={str_direction} />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Meeting_PAGE;