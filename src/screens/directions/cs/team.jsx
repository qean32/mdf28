import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Panel from '../../../components/use/meny/panel';
import Content from '../../../components/regular/directions/cs/team/content';
import Right_panel from '../../../components/regular/directions/cs/players/right_panel';
import Header from '../../../components/use/meny/header';
import Right_panel_place from '../../../components/use/meny/right_panel_place';
import context from '../../../connections/context';

const Team_D = () => {
    let { user } = useContext(context)
    let { id } = useParams()
    const navigate = useNavigate();
    const [team, setteam] = useState({})
    let Searh = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/cs/search/team/?id=${id}`, {
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
        SearhDOTA()
        SearchPlayer()
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
    const [dota, setdota] = useState()
    const [dcont, setdcont] = useState(false)
    let SearhDOTA = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/cs/search/player/?user=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setdota(data.results[0])
        if (data.results[0]?.matches_in_offers > 1) {
            setdcont(true)
        }
    }
    const [players, setplayers] = useState([])
    let SearchPlayer = async () => {
        let response = await fetch(`https://mdf28server.site/api/dota/search/player/?team=${id}&offset=0&limit=16`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setplayers(data.results)
    }
    let confirmm = async (idplayer) => {
        let response = await fetch(`https://mdf28server.site/api/cs/update/player_user/${idplayer}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team: null, matches_in_offers: 0})
        })
        let data = await response.json()
        trans()
    }
    let trans = async () => {
        let response = await fetch(`https://mdf28server.site/api/tranfers/reg/CS/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ user: user.user_id, team: id, script: 1 })
        })
        let data = await response.json()
        location.reload();
    }
    let deletee = async () => {
        let result = confirm('Вы действительно хотите распустить команду?')
        if (result) {
            for (let index = 0; index < players.length; index++) {
                confirmm(players[index].id)
            }
            let response = await fetch(`https://mdf28server.site/api/cs/update/team/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                },
            })
            navigate('/cs')
            alert('Будем скучать!')
            let data = await response.json()
        } else {
            console.log('zxc')
        }
    }
    return (
        <>
            {view ? <main>
                <img src="/svg/oper_1.svg" alt="" id="id_bck_3"/>
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal of_modal={of_modal} />} propsStyle_two={propsStyle_two} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel one={true} go_modal_dis={go_modal_dis} /></section>
                    <section><Content /></section>
                    <section  id="s_id" style={{ transform: 'translateX(50px)', width: '25%' }}><Right_panel />
                    {user?.user_id == team?.director?.id && <div className='content_right_'>
                            <Right_panel_place namee={'редактировать команду'} navigat={(`/cs/editteam/${team.id}`)} />
                            <Right_panel_place namee={'редактировать состав'} navigat={(`/cs/editteam/${team.id}`)} />
                            <div onClick={() => deletee()}><p>распустить команду</p></div>
                        </div>}
                        {user?.user_id != team?.director?.id && !dcont && dota?.team?.id == id && <div className='content_right_'>
                            {user?.user_id != team?.director?.id && !dcont && dota?.team?.id == id && <div onClick={() => confirmm()}><p>покинуть команду</p></div>}
                        </div>}
                    </section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Team_D;