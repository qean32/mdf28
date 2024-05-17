import { useContext, useEffect, useState } from "react";
import Header from "../../components/use/meny/header";
import Panel from '../../components/use/meny/panel';
import Right_panel from '../../components/regular/community/community/right_panel';
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';
import context from '../../connections/context';
import Disputes_ from '../../components/regular/community/disputes/disputes';
import Loader from '../../components/use/meny/loader';

const Disputes = () => {

    useEffect(() => {
        document.title = 'диспуты';
    }, [])
    
    let { user } = useContext(context)
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host } = useContext(context)
    
    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    const [title, settitle] = useState('')
    const RegistrationDisput = async (e, title) => {
        e.preventDefault()
        if (title.length > 0) {
            let response = await fetch('https://mdf28server.site/api/disputes/reg/disput/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
                },
                body: JSON.stringify({ 'author': user?.user_id, 'title': title })
            })
            let data = await response.json()
            console.log(data)
        }
    }
    const [op, setop] = useState(false)
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal} /></section>
                    <section><Disputes_ host={host} /></section>
                    <section><Right_panel />
                        <div className='content_right_' style={{ transform: 'translateX(-30px)' }}><div onClick={() => setop(true)}><p>создать диспут</p></div></div>
                        {op && <form onSubmit={(e) => RegistrationDisput(e, title, user?.user_id)} style={{ display: 'flex', flexDirection: 'column', transform: 'translateX(-28px)' }}>
                            <input maxLength={105} onChange={(e) => settitle(e.target.value)} type="text" name="" id="" placeholder='тема' style={{ background: '#EAEAEA', width: '325px' }} />
                            <button type="submit" style={{ background: '#EAEAEA', width: '343px', padding: '10px', borderRadius: "10px", cursor: 'pointer' }}>отправить</button>
                        </form>}
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Disputes;