import { useEffect, useState } from 'react';
import Header from "../../components/use/meny/header";
import Panel from '../../components/use/meny/panel';
import Right_panel from '../../components/regular/community/community/right_panel';
import Content from '../../components/regular/community/disputes/disputes';
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';
import { useContext } from 'react';
import context from '../../connections/context';

const Disputes = () => {
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
    const [title, settitle] = useState('')
    const go = async (e, title, id) => {
        e.preventDefault()
        if (title.length > 0) {
            let response = await fetch('http://qean32.beget.tech/api/disputes/reg/disput/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
                },
                body: JSON.stringify({ 'author': user.user_id, 'title': title })
            })
            let data = await response.json()
            console.log(data)
        }
    }
    const [op, setop] = useState(false)
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal_dis={go_modal_dis} /></section>
                    <section><Content /></section>
                    <section><Right_panel />
                        <div className='content_right_' style={{ transform: 'translateX(-50px)' }}><div onClick={() => setop(true)}><p>создать диспут</p></div></div>
                        {op && <form onSubmit={(e) => go(e, title, user?.user_id)} style={{ display: 'flex', flexDirection: 'column', transform: 'translateX(-48px)' }}>
                            <input maxLength={105} onChange={(e) => settitle(e.target.value)} type="text" name="" id="" placeholder='тема' style={{ background: '#EAEAEA', width: '325px' }} />
                            <button type="submit" style={{ background: '#EAEAEA', width: '343px', padding: '10px', borderRadius: "10px", cursor: 'pointer' }}>отправить</button>
                        </form>}
                    </section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Disputes;