import { useContext, useEffect, useState } from "react";
import Header from '../../components/use/meny/header';
import Content from '../../components/regular/regular/user_agreement/content';
import context from '../../connections/context';
import Loader from '../../components/use/meny/loader';

const UserAgreement_PAGE = () => {
    let { viewShadow, host } = useContext(context)
    
    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])

    useEffect(() => {
        document.title = 'пользовотельское соглашение';
    }, [])

    return (
        <>
            {view ? <main>
                <img src="/svg/rediant_creaps.svg" alt="" id="id_bck_1" />
                <img src="/svg/dire_creaps.svg" alt="" id="id_bck_2" />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section></section>
                    <section><Content /></section>
                    <section></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default UserAgreement_PAGE;