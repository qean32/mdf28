import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Panel from '../../../components/use/meny/panel';
import Right_panel from '../../../components/use/unification/players/right_panel';
import Header from '../../../components/use/meny/header';
import context from '../../../connections/context';
import Background from '../../../components/use/background/cs_background';
import Loader from '../../../components/use/meny/loader';
import Team from '../../../components/use/unification/team/team';

const Team_PAGE = () => {

    useEffect(() => {
        document.title = 'команда';
    }, [])
    
    let direction = 3
    let str_direction = 'cs'
    let { user } = useContext(context)
    let { id } = useParams()
    const navigate = useNavigate();
    const [team, setteam] = useState({})
    let Searh = async (id) => {
        let response = await fetch(`${host}/api/unification/search/team/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setteam(data.results[0])
    }
    
    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])

    useEffect(() => {
        Searh(id)
        SearchPlayer()
        SearchPlayers()
    }, [])
    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host, style_ } = useContext(context)
    const [player, setplayer] = useState()
    const [contract, setcontract] = useState(false)
    let SearchPlayer = async () => {
        let response = await fetch(`${host}/api/unification/search/player/?user=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setplayer(data.results[0])
        if (data.results[0]?.matches_in_offers > 1) {
            setcontract(true)
        }
    }
    const [players, setplayers] = useState([])
    let SearchPlayers = async () => {
        let response = await fetch(`${host}/api/unification/search/player/?team=${id}&offset=0&limit=16`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setplayers(data.results)
    }
    let Accept_ = async (idplayer) => {
        let response = await fetch(`${host}/api/unification/update/player_user/${idplayer}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team: null, matches_in_offers: 0, generation: null, position: null })
        })
        let data = await response.json()
        RegistrationTransfer(idplayer)
    }
    let RegistrationTransfer = async (idplayer) => {
        let response = await fetch(`${host}/api/transfers/reg/DOTA/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ user: idplayer, team: id, script: 1 })
        })
        let data = await response.json()
        location.reload();
    }
    let Delete = async () => {
        let result = confirm('Вы действительно хотите распустить команду?')
        if (result) {
            for (let index = 0; index < players.length; index++) {
                Accept_(players[index].user.id)
            }
            let response = await fetch(`${host}/api/unification/update/team/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                },
            })
            navigate('/')
            alert('Будем скучать!')
            let data = await response.json()
        }
    }
    return (
        <>
            {view ? <main>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal} style={{ right: '90px' }} /></section>
                    <section><Team style_={style_} host={host} direction={direction} str_direction={str_direction} /></section>
                    <section id="s_id" style={{ transform: 'translateX(50px)', width: '25%' }}>
                        <Right_panel str_direction={str_direction} />
                        {user?.user_id == team?.director?.id && <div className='content_right_'>
                            <div onClick={() => navigate(`/${str_direction}/editteam/${team.id}`)}><p>редактировать команду</p></div>
                            <div onClick={() => navigate(`/${str_direction}/editstructure/${team.id}`)}><p>редактировать состав</p></div>
                            <div onClick={() => Delete()}><p>распустить команду</p></div>
                        </div>}
                        {user?.user_id != team?.director?.id && !contract && player?.team?.id == id && <div className='content_right_'>
                            <div onClick={() => Accept_(user?.user_id)}><p>покинуть команду</p></div>
                        </div>}
                    </section>
                </main>a
            </main> : <Loader />}
        </>
    );
}

export default Team_PAGE;