import Content from "../../components/regular/regular/news/content";
import Right_panel from "../../components/regular/regular/news/right_panel";
import Header from "../../components/use/meny/header";
import Panel from "../../components/use/meny/panel";
import { useEffect, useState } from 'react';
import Shadow from "../../components/use/meny/shadow";
import Modal from "../../components/use/meny/modal";
import Content_modal from "../../components/regular/regular/news/content_modal";
import Content_modal_meetings from "../../components/regular/regular/news/content_modal_meetings";
import Content_modal_players from "../../components/regular/regular/news/content_modal_players";
import Content_modal_tournaments from "../../components/regular/regular/news/content_modal_tournament";
import Content_modal_teams from "../../components/regular/regular/news/content_modal_teams";

const News = () => {
    const [viewShadow, setviewShadow] = useState(false)
    const [viewModal, setviewModal] = useState(false)
    const [viewModal_tournaments, setviewModal_tournaments] = useState(false)
    const [viewModal_teams, setviewModal_teams] = useState(false)
    const [viewModal_players, setviewModal_players] = useState(false)
    const [viewModal_meetings, setviewModal_meetings] = useState(false)
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
        setviewModal_tournaments(false)
        setviewModal_meetings(false)
        setviewModal_players(false)
        setviewModal_teams(false)
        setviewShadow(false)
    }
    const go_modal_directions = (set) => {
        set(true)
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
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_meetings} component={<Content_modal_meetings of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_players} component={<Content_modal_players of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_tournaments} component={<Content_modal_tournaments of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Modal viewModal={viewModal_teams} component={<Content_modal_teams of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal={() => go_modal_directions(setviewModal)} /></section>
                    <section><Content /></section>
                    <section id="s_id">
                        <div className='content_right_'>
                            <div onClick={() => go_modal_directions(setviewModal_tournaments)}><p>турниры</p></div>
                            <div onClick={() => go_modal_directions(setviewModal_players)}><p>игроки</p></div>
                            <div onClick={() => go_modal_directions(setviewModal_teams)}><p>команды</p></div>
                            <div onClick={() => go_modal_directions(setviewModal_meetings)}><p>матчи</p></div>
                        </div>
                        <Right_panel />
                    </section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default News;