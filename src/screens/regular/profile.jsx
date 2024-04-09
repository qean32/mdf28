import Content from "../../components/regular/regular/profile/content";
import Header from "../../components/use/meny/header";
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import context from "../../connections/context";

const Profile = () => {
    let host = 'https://mdf28server.site'
    let { user } = useContext(context)
    let { setUser, setToken } = useContext(context)
    let { id } = useParams()
    const navigate = useNavigate();
    const logoutUser = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
        navigate('/')
    }
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    const [folows, setfolows] = useState()
    let Search = async () => {
        let response = await fetch(`${host}/api/users/search/follow_id/?for_r=${user.user_id}&by=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setfolows(data.results[0])
    }
    useEffect(() => {
        Search()
        SearchOffers('dota')
        SearchOffers('cs')
        SearchOffers('bascketball')
        SearchTeam('dota', setteamDOTA)
        SearchTeam('cs', setteamCS)
        SearchTeam('bascketball', setteamBASCKETBALL)
        SearhDirector('dota', setDirectorDOTA)
        SearhDirector('cs', setDirectorCS)
        SearhDirector('bascketball', setDirectorBASCKETBALL)
    }, [])
    const [sab, setsab] = useState(false)
    useEffect(() => {
        if (folows) {
            setsab(true)
        }
    }, [folows])
    let follow = async () => {
        let response = await fetch('${host}/api/users/reg/follow/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ for_r: user.user_id, by: id })
        })
        let data = await response.json()
        setsab(true)
    }
    let unfollow = async () => {
        setsab(false)
        let response = await fetch(`${host}/api/users/delete/follow/${folows.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
        })
        let data = await response.json()
    }
    let offer = async (direction, team) => {
        let response = await fetch(`${host}/api/${direction}/reg/offers/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team: team, position: pos, generationeration: generation, user: id, matches_in_offers: 10 })
        })
        let data = await response.json()
        console.log(data)
        location.reload();
    }
    const updatepos = (posi, setposi, idp) => {
        if (posi) {
            setposi(false)
            setpos(pos.filter(el => el != idp))
        } else {
            setposi(true)
            setpos([...pos, idp])
        }
    }
    const [teamDOTA, setteamDOTA] = useState()
    const [teamBASCKETBALL, setteamBASCKETBALL] = useState()
    const [teamCS, setteamCS] = useState()
    const [pos1, setpos1] = useState(false)
    const [pos2, setpos2] = useState(false)
    const [pos3, setpos3] = useState(false)
    const [pos4, setpos4] = useState(false)
    const [pos5, setpos5] = useState(false)
    const [d, setd] = useState(false)
    const [cs, setcs] = useState(false)
    const [b, setb] = useState(false)
    const [pos, setpos] = useState([])
    const [generation, setgeneration] = useState()
    let SearchTeam = async (direction, set) => {
        let response = await fetch(`${host}/api/${direction}/search/team/?director=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        set(data.results[0].id)
    }
    const [offers, setoffers] = useState([])
    let SearchOffers = async (direction) => {
        let response = await fetch(`${host}/api/${direction}/search/offers/?user=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
        })
        let data = await response.json()
        setoffers([...data.results, ...offers])
    }
    const [of, setof] = useState([])
    useEffect(() => {
        if (offers) {
            setof(offers.filter((el) => el.is_view == false))
        }
    }, [offers])
    const [DirectorDOTA, setDirectorDOTA] = useState(false)
    const [DirectorCS, setDirectorCS] = useState(false)
    const [DirectorBASCKETBALL, setDirectorBASCKETBALL] = useState(false)
    let SearhDirector = async (direction, set) => {
        let response = await fetch(`${host}/api/${direction}/search/team/?director=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0].id) {
            set(true)
        }
    }
    return (
        <>
            {view ? <main>
                <Header />
                <main>
                    <section></section>
                    <section><Content /></section>
                    <section id="s_id">
                        <div>
                            <div className="content_right_" style={{ transform: 'translateX(15px)', width: '250px' }}>
                                {user && user.user_id != id && DirectorDOTA && <div onClick={() => setd(true)}><p>пригласить в команду D</p></div>}
                                {user && user.user_id != id && DirectorBASCKETBALL && <div onClick={() => setb(true)}><p>пригласить в команду B</p></div>}
                                {user && user.user_id != id && DirectorCS && <div onClick={() => setcs(true)}><p>пригласить в команду CS</p></div>}
                                {user && user.user_id == id && <div onClick={() => navigate(`/editprofile`)}><p>редактировать</p></div>}
                                {user && user.user_id == id && <div onClick={logoutUser}><p>выйти</p></div>}
                                <div onClick={() => navigate(`/follow/${id}`)}><p>подписки</p></div>
                                {user && user.user_id != id && sab && <div onClick={() => unfollow()}><p>отписаться</p></div>}
                                {user && user.user_id != id && !sab && <div onClick={() => follow()}><p>подписаться</p></div>}
                                {user && user.user_id == id && <div className='offers' onClick={() => navigate(`/offers/`)}><p>приглашения</p><div className="point" style={of?.length > 0 ? { opacity: '1' } : { opacity: '0' }}></div></div>}
                            </div>
                            {d && <>
                                <div style={{ marginLeft: '60px', marginTop: '20px', background: '#EAEAEA', width: '170px', padding: '10px', borderRadius: '10px', transform: 'translateX(-40px)' }}>
                                    <label htmlFor="id_1"><img src="/position/pos_1.png" alt="" onClick={() => updatepos(pos1, setpos1, 1)} style={pos1 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_2.png" alt="" onClick={() => updatepos(pos2, setpos2, 2)} style={pos2 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_5.png" alt="" onClick={() => updatepos(pos5, setpos5, 5)} style={pos5 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_4.png" alt="" onClick={() => updatepos(pos4, setpos4, 4)} style={pos4 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_3.png" alt="" onClick={() => updatepos(pos3, setpos3, 3)} style={pos3 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                </div>
                                <div style={{ marginLeft: '60px', marginTop: '10px', background: '#EAEAEA', width: '170px', padding: '10px', borderRadius: '10px', transform: 'translateX(-40px)', display: 'flex', gap: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <p onClick={() => setgeneration(1)} style={generation == 1 ? { color: '#E74343', cursor: 'pointer' } : { cursor: 'pointer' }}>основной</p>
                                    <p onClick={(() => setgeneration(2))} style={generation == 2 ? { color: '#E74343', cursor: 'pointer' } : { cursor: 'pointer' }}>второй</p>
                                </div>
                                <div onClick={() => offer('dota', teamDOTA)} style={{ marginLeft: '60px', marginTop: '10px', background: '#EAEAEA', width: '170px', padding: '10px', borderRadius: '10px', transform: 'translateX(-40px)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}> <p>пригласить</p> </div>
                            </>}
                            {b && <>
                                <div style={{ marginLeft: '60px', marginTop: '20px', background: '#EAEAEA', width: '170px', padding: '10px', borderRadius: '10px', transform: 'translateX(-40px)' }}>
                                    <label htmlFor="id_1"><img src="/position/pos_1_.png" alt="" onClick={() => updatepos(pos1, setpos1, 1)} style={pos1 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_2_.png" alt="" onClick={() => updatepos(pos2, setpos2, 2)} style={pos2 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_5_.png" alt="" onClick={() => updatepos(pos5, setpos5, 5)} style={pos5 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_4_.png" alt="" onClick={() => updatepos(pos4, setpos4, 4)} style={pos4 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_3_.png" alt="" onClick={() => updatepos(pos3, setpos3, 3)} style={pos3 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                </div>
                                <div style={{ marginLeft: '60px', marginTop: '10px', background: '#EAEAEA', width: '170px', padding: '10px', borderRadius: '10px', transform: 'translateX(-40px)', display: 'flex', gap: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <p onClick={() => setgeneration(1)} style={generation == 1 ? { color: '#E74343', cursor: 'pointer' } : { cursor: 'pointer' }}>основной</p>
                                    <p onClick={(() => setgeneration(2))} style={generation == 2 ? { color: '#E74343', cursor: 'pointer' } : { cursor: 'pointer' }}>второй</p>
                                </div>
                                <div onClick={() => offer('bascketball', teamBASCKETBALL)} style={{ marginLeft: '60px', marginTop: '10px', background: '#EAEAEA', width: '170px', padding: '10px', borderRadius: '10px', transform: 'translateX(-40px)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}> <p>пригласить</p> </div>
                            </>}
                            {cs && <>
                                <div style={{ marginLeft: '60px', marginTop: '20px', background: '#EAEAEA', width: '170px', padding: '10px', borderRadius: '10px', transform: 'translateX(-40px)' }}>
                                    <label htmlFor="id_1"><img src="/position/pos_1_.png" alt="" onClick={() => updatepos(pos1, setpos1, 1)} style={pos1 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_2_.png" alt="" onClick={() => updatepos(pos2, setpos2, 2)} style={pos2 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_5_.png" alt="" onClick={() => updatepos(pos5, setpos5, 5)} style={pos5 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_4_.png" alt="" onClick={() => updatepos(pos4, setpos4, 4)} style={pos4 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                    <label htmlFor="id_1"><img src="/position/pos_3_.png" alt="" onClick={() => updatepos(pos3, setpos3, 3)} style={pos3 ? { height: '18px', padding: '5px', margin: '3px', borderRadius: '7px', background: '#d3d3d3' } : { height: '18px', padding: '5px', borderRadius: '7px', margin: '3px' }} /></label>
                                </div>
                                <div style={{ marginLeft: '60px', marginTop: '10px', background: '#EAEAEA', width: '170px', padding: '10px', borderRadius: '10px', transform: 'translateX(-40px)', display: 'flex', gap: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <p onClick={() => setgeneration(1)} style={generation == 1 ? { color: '#E74343', cursor: 'pointer' } : { cursor: 'pointer' }}>основной</p>
                                    <p onClick={(() => setgeneration(2))} style={generation == 2 ? { color: '#E74343', cursor: 'pointer' } : { cursor: 'pointer' }}>второй</p>
                                </div>
                                <div onClick={() => offer('cs', teamCS)} style={{ marginLeft: '60px', marginTop: '10px', background: '#EAEAEA', width: '170px', padding: '10px', borderRadius: '10px', transform: 'translateX(-40px)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}> <p>пригласить</p> </div>
                            </>}
                        </div></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Profile;