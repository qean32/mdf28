import { useContext, useEffect, useState } from 'react';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Panel from '../../../components/use/meny/panel';
import Teams from '../../../components/use/unification/teams/teams';
import Right_panel from '../../../components/use/unification/players/right_panel';
import Header from '../../../components/use/meny/header';
import { useNavigate } from 'react-router-dom';
import Background from '../../../components/use/background/bascketball_background';
import context from '../../../connections/context';
import Loader from '../../../components/use/meny/loader';

const Teams_PAGE = () => {

    TitleFUnction('команды')
    
    let navigate = useNavigate()
    let direction = 4
    let str_direction = 'bascketball'
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host, view, TitleFUnction } = useContext(context) 
    return (
        <>
            {view ? <main>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal} /></section>
                    <section><Teams host={host} direction={direction} str_direction={str_direction} /></section>
                    <section id="s_id"><Right_panel str_direction={str_direction} />
                        <div className='content_right_'>
                            <div onClick={() => navigate(`/${str_direction}/regteam`)}>создать команду</div>
                        </div>
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Teams_PAGE;