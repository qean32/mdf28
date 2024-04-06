import { useEffect, useState } from 'react';
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Content_modal from '../../components/regular/regular/news/content_modal';
import Header from '../../components/use/meny/header';
import Panel from '../../components/use/meny/panel';
import Content from '../../components/regular/regular/user_agreement/content';

const User_Agreement = () => {
    const [viewShadow,setviewShadow] = useState(false)
    const [viewModal,setviewModal] = useState(false)
    const [propsStyle,setpropsStyle] = useState({
        width: '680px',
        height: '255px',
    })
    const [propsStyle_two,setpropsStyle_two] = useState({
        display: 'flex',
        width:'97%',
        height:'92%',
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
                <img src="/svg/rediant_creaps.svg" alt="" id="id_bck_1"/>
                <img src="/svg/dire_creaps.svg" alt="" id="id_bck_2" />
                <Shadow viewShadow={viewShadow} of_modal={of_modal}/>
                <Header />
                <main>
                    <section></section>
                    <section><Content/></section>
                    <section></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
     );
}
 
export default User_Agreement;