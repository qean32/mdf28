import { useEffect, useState } from 'react';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Header from '../../../components/use/meny/header';
import Panel from '../../../components/use/meny/panel';
import Content from '../../../components/regular/directions/bascketball/meetings/content';
import Right_panel from '../../../components/regular/directions/bascketball/players/right_panel';
import { useNavigate } from 'react-router-dom';

const Meetings_B = () => {
    let navigate = useNavigate()
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
        flexDiraction: 'row',
    })
    const of_modal = () => {
        setviewModal(false)
        setviewShadow(false)
    }
    const go_modal_dis = () => {
        setviewModal(true)
        setviewShadow(true)
    }
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    return (
        <>
            {view ? <main>
                <img src="/svg/bascketball_2.svg" alt="" id="id_bck_2" style={{transform: 'scaleX(1)', height: '410px', bottom: '20px'}}/>
                <img src="/svg/bascketball_2.svg" alt="" id="id_bck_1" style={{ height: '410px', bottom: '20px', left: '25px'}}/>
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal_dis={go_modal_dis} /></section>
                    <section style={{ paddingTop: '10px' }}><Content /></section>
                    <section  id="s_id">
                        <Right_panel />
                        <div className='content_right_'>
                            <div onClick={() => navigate('/bascketball/meeting/applications')}> <p>заявки</p> </div>
                        </div>
                    </section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Meetings_B;