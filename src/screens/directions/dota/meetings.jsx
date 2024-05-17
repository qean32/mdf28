import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Header from '../../../components/use/meny/header';
import Panel from '../../../components/use/meny/panel';
import Meetings from '../../../components/use/unification/meetings/meetings';
import Right_panel from '../../../components/use/unification/players/right_panel';
import { useNavigate } from 'react-router-dom';
import Background from '../../../components/use/background/dota_background';
import { useContext, useEffect, useState } from "react";
import Loader from '../../../components/use/meny/loader';
import context from '../../../connections/context';

const Meetings_PAGE = () => {
    let direction = 1
    let str_direction = 'dota'
    let navigate = useNavigate()
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host } = useContext(context)
    
    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])

    useEffect(() => {
        document.title = 'матчи';
    }, [])
    return (
        <>
            {view ? <main>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal} /></section>
                    <section style={{ paddingTop: '10px' }}><Meetings host={host} direction={direction} str_direction={str_direction} /></section>
                    <section  id="s_id">
                        <Right_panel str_direction={str_direction}  />
                        <div className='content_right_'>
                            <div onClick={() => navigate(`/${str_direction}/meeting/applications`)}> <p>заявки</p> </div>
                        </div>
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Meetings_PAGE;