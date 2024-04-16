import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Panel from '../../../components/use/meny/panel';
import Content from '../../../components/regular/directions/dota/team/content';
import Right_panel from '../../../components/regular/directions/dota/players/right_panel';
import Header from '../../../components/use/meny/header';
import Right_panel_place from '../../../components/use/meny/right_panel_place';
import context from '../../../connections/context';

const Team_D = () => {
    let host = 'https://mdf28server.site'
    let direction = 'dota'
    let { user } = useContext(context)
    let { id } = useParams()
    const navigate = useNavigate();
    const [team, setteam] = useState({})
    let Searh = async (id) => {
        let response = await fetch(`${host}/api/${direction}/search/team/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setteam(data.results[0])
    }
    useEffect(() => {
        Searh(id)
        SearchPlayer()
        SearchPlayers()
    }, [])
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
    const go_modal_directions = () => {
        setviewModal(true)
        setviewShadow(true)
    }
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    const [player, setplayer] = useState()
    const [contract, setcontract] = useState(false)
    let SearchPlayer = async (id) => {
        let response = await fetch(`${host}/api/${direction}/search/player/?user=${user.user_id}`, {
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
        let response = await fetch(`${host}/api/${direction}/search/player/?team=${id}&offset=0&limit=16`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setplayers(data.results)
    }
    let confirmm = async (idplayer) => {
        let response = await fetch(`${host}/api/${direction}/update/player_user/${idplayer}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team: null, matches_in_offers: 0})
        })
        let data = await response.json()
        reg_transfer(idplayer)
    }
    let reg_transfer = async (idplayer) => {
        let response = await fetch(`${host}/api/tranfers/reg/DOTA/`, {
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
    let deletee = async () => {
        let result = confirm('Вы действительно хотите распустить команду?')
        if (result) {
            for (let index = 0; index < players.length; index++) {
                confirmm(players[index].user.id)
            }
            let response = await fetch(`${host}/api/${direction}/update/team/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                },
            })
            navigate('/')
            alert('Будем скучать!')
            let data = await response.json()
        } else {
            console.log('zxc')
        }
    }
    return (
        <>
            {view ? <main>
                <img src="/svg/rediant_creaps.svg" alt="" id="id_bck_1"/>
                <img src="/svg/dire_creaps.svg" alt="" id="id_bck_2" />
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal={go_modal_directions}  style={{right: '90px'}}  /></section>
                    <section><Content /></section>
                    <section id="s_id" style={{ transform: 'translateX(50px)', width: '25%' }}><Right_panel />
                        {user?.user_id == team?.director?.id && <div className='content_right_'>
                            <Right_panel_place namee={'редактировать команду'} navigat={(`/${direction}/editteam/${team.id}`)} />
                            <Right_panel_place namee={'редактировать состав'} navigat={(`/${direction}/editteam/${team.id}`)} />
                            <div onClick={() => deletee()}><p>распустить команду</p></div>
                        </div>}
                        {user?.user_id != team?.director?.id && !contract && player?.team?.id == id && <div className='content_right_'>
                            <div onClick={() => confirmm()}><p>покинуть команду</p></div>
                        </div>}
                    </section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Team_D;