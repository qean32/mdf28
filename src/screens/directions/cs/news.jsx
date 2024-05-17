import Header from "../../../components/use/meny/header";
import Panel from "../../../components/use/meny/panel";
import Shadow from "../../../components/use/meny/shadow";
import Modal from "../../../components/use/meny/modal";
import Content_modal from "../../../components/regular/regular/news/content_modal";
import Right_panel_ from '../../../components/use/unification/news/right_panel';
import News from "../../../components/use/unification/news/news";
import { useNavigate } from "react-router-dom";
import Background from '../../../components/use/background/cs_background';
import { useContext, useEffect, useState } from "react";
import Loader from '../../../components/use/meny/loader';
import context from '../../../connections/context';
import Stream_ from "../../../components/use/meny/stream_";

const News_PAGE = () => {
    let navigate = useNavigate()
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
        document.title = 'новости';
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
                    <section><News host={host} direction={direction} str_direction={str_direction}  /></section>
                    <section id="s_id">
                        <Right_panel_ host={host} direction={direction} str_direction={str_direction}  />
                        <div className='content_right_'>
                            <div onClick={() => navigate(`/${str_direction}/protokols`)}><p> протоколы </p></div>
                        </div>
                        <Stream_ />
                        </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default News_PAGE;