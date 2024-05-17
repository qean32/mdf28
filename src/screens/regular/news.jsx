import Right_panel from "../../components/regular/regular/news/right_panel";
import Header from "../../components/use/meny/header";
import Panel from "../../components/use/meny/panel";
import { useEffect, useState } from 'react';
import Shadow from "../../components/use/meny/shadow";
import Modal from "../../components/use/meny/modal";
import Content_modal from "../../components/regular/regular/news/content_modal";
import News_ from "../../components/regular/regular/news/news";
import context from '../../connections/context';
import { useContext } from 'react';
import Loader from '../../components/use/meny/loader';
import Stream_ from "../../components/use/meny/stream_";

const News_PAGE = () => {
    const [viewModal_tournaments, setviewModal_tournaments] = useState(false)
    const [viewModal_teams, setviewModal_teams] = useState(false)
    const [viewModal_players, setviewModal_players] = useState(false)
    const [viewModal_meetings, setviewModal_meetings] = useState(false)
    let { viewModal, viewShadow, propsStyle, propsStyle_, host, setviewShadow, setviewModal } = useContext(context)

    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])

    let RunModal = (set) => {
        set(true)
        setviewShadow(true)
    }

    let OfModal = () => {
        setviewModal_meetings(false)
        setviewModal_tournaments(false)
        setviewModal_teams(false)
        setviewModal_players(false)
        setviewShadow(false)
        setviewModal(false)
    }

    useEffect(() => {
        document.title = 'новости';
    }, [])

    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_meetings} component={<Content_modal OfModal={OfModal} linkcs={'/cs/meetings'} linkdota={'/dota/meetings'} linkbascketball={'/bascketball/meetings'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_players} component={<Content_modal OfModal={OfModal} linkcs={'/cs/players'} linkdota={'/dota/players'} linkbascketball={'/bascketball/players'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_teams} component={<Content_modal of_modal={OfModal} linkcs={'/cs/teams'} linkdota={'/dota/teams'} linkbascketball={'/bascketball/teams'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_tournaments} component={<Content_modal OfModal={OfModal} linkcs={'/cs/tournaments'} linkdota={'/dota/tournaments'} linkbascketball={'/bascketball/tournaments'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={() => RunModal(setviewModal)} /></section>
                    <section>
                        <News_ host={host} /></section>
                    <section id="s_id">
                        <div className='content_right_'>
                            <div onClick={() => RunModal(setviewModal_tournaments)}><p>турниры</p></div>
                            <div onClick={() => RunModal(setviewModal_players)}><p>игроки</p></div>
                            <div onClick={() => RunModal(setviewModal_teams)}><p>команды</p></div>
                            <div onClick={() => RunModal(setviewModal_meetings)}><p>матчи</p></div>
                        </div>
                        <Right_panel host={host} />
                        <Stream_ />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default News_PAGE;