import { useEffect, useState, useContext } from 'react';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Header from '../../../components/use/meny/header';
import Panel from '../../../components/use/meny/panel';
import Content from '../../../components/regular/directions/cs/applications/content';
import Right_panel from '../../../components/regular/directions/cs/players/right_panel';
import { useNavigate } from 'react-router-dom';
import context from '../../../connections/context';

const Applications_CS = () => {
    let navigate = useNavigate()
    let host = 'https://mdf28server.site'
    let direction = 'cs'
    let { user } = useContext(context)
    const [viewShadow, setviewShadow] = useState(false)
    const [viewModal, setviewModal] = useState(false)
    const [propsStyle, setpropsStyle] = useState({
        width: '680px',
        height: '255px',
    })
    const [propsStyle_two, setpropsStyle_two] = useState({
        display: 'flex',
        width: '97%',
        height: '92%',
        flexDirectoraction: 'row',
    })
    const of_modal = () => {
        setviewModal(false)
        setviewShadow(false)
    }
    const go_modal_directions = () => {
        setviewModal(true)
        setviewShadow(true)
    }
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    const [Director, setDirector] = useState(false)
    let SearhDirectorector = async () => {
        let response = await fetch(`${host}/api/${direction}/search/team/?Directorector=${user?.user_id}`, {
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
        SearhDirectorector()
    }, [])
    return (
        <>
            {view ? <main>
                <img src="/svg/oper_1.svg" alt="" id="id_bck_3"/>
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal={go_modal_directions} /></section>
                    <section style={{ paddingTop: '10px' }}><Content /></section>
                    <section  id="s_id">
                        <Right_panel />
                        {Director && <div className='content_right_'>
                            {Director && <div onClick={() => navigate('/bascketball/meeting/applications/reg')}> <p>подача заявки</p> </div>}
                        </div>}
                    </section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Applications_CS;