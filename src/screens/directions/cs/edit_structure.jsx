import Header from "../../../components/use/meny/header";
import Panel from '../../../components/use/meny/panel';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Edit_structure from '../../../components/use/unification/edit_structure/edit_structure';
import Background from '../../../components/use/background/cs_background';
import PlayerEdit from '../../../components/use/unification/edit_structure/player';
import PlayerEdit_ from '../../../components/use/unification/edit_structure/player_';
import { useContext, useEffect, useState } from "react";
import Loader from '../../../components/use/meny/loader';
import context from '../../../connections/context';

const EditStructure_PAGE = () => {
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
        document.title = 'редактор команды';
    }, [])
    return (
        <>
            {view ? <main style={{ height: '90px' }}>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main style={{ height: '912px' }}>
                    <section><Panel RunModal={RunModal} /></section>
                    <section>
                        <Edit_structure Player_={<PlayerEdit_ />} host={host} direction={direction} str_direction={str_direction} />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default EditStructure_PAGE;