import { useEffect, useState, useContext } from 'react';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Header from '../../../components/use/meny/header';
import Panel from '../../../components/use/meny/panel';
import { useNavigate } from 'react-router-dom';
import context from '../../../connections/context';
import Applications from '../../../components/use/unification/applications/applications';
import Right_panel from '../../../components/use/unification/players/right_panel';
import Background from '../../../components/use/background/dota_background';
import Loader from '../../../components/use/meny/loader';

const Applications_PAGE = () => {
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
        document.title = 'заявки';
    }, [])

    const [Director, setDirector] = useState(false)
    let SearhDirector = async () => {
        let response = await fetch(`${host}/api/unification/search/team/?director=${user?.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0]?.id) {
            setDirector(true)
        }
    }
    useEffect(() => {
        SearhDirector()
    }, [])

    return (
        <>
            {view ? <main>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section ><Panel RunModal={RunModal} /></section>
                    <section style={{ paddingTop: '10px' }}><Applications host={host} direction={direction} str_direction={str_direction} /></section>
                    <section id="s_id">
                        <Right_panel str_direction={str_direction} />
                        {Director && <div className='content_right_'>
                            <div onClick={() => navigate(`/${str_direction}/meeting/applications/reg`)}> <p>подача заявки</p> </div>
                        </div>}
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Applications_PAGE;