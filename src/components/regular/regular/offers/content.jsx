import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../../connections/context';

const Content = () => {
    let host = 'https://mdf28server.site'
    const navigate = useNavigate();
    let { user } = useContext(context)
    const [offersDOTA, setoffersDOTA] = useState()
    const [offersBASCKETBALL, setoffersBASCKETBALL] = useState()
    const [offersCS, setoffersCS] = useState()
    let SearchOffer = async (direction, set) => {
        let response = await fetch(`${host}/api/${direction}/search/offers/?user=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
        })
        let data = await response.json()
        set(data.results)
    }
    const [dotaPlayer, setdotaPlayer] = useState()
    const [csPlayer, setcsPlayer] = useState()
    const [bascketballPlayer, setbascketballPlayer] = useState()
    const [dContract, setdContract] = useState(false)
    const [bContract, setbContract] = useState(false)
    const [csContract, setcsContract] = useState(false)
    let SearchPlayer = async (direction, setPlayer, setContract) => {
        let response = await fetch(`${host}/api/${direction}/search/player/?user=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setPlayer(data.results[0])
        if (data.results[0]?.matches_in_offers > 1) {
            setContract(true)
        }
    }
    const [directorD, setdirectorD] = useState(false)
    const [directorB, setdirectorB] = useState(false)
    const [directorCS, setdirectorCS] = useState(false)
    let SearhDirector = async (direction, setdirector, setContract) => {
        let response = await fetch(`${host}/api/${direction}/search/team/?director=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0]?.id) {
            setdirector(true)
            setContract(true)
        }
    }
    useEffect(() => {
        SearhDirector('dota', setdirectorD, setdContract)
        SearhDirector('cs', setdirectorCS, setcsContract)
        SearhDirector('bascketball', setdirectorB, setbContract)
        SearchPlayer('dota', setdotaPlayer, setdContract)
        SearchPlayer('cs', setcsPlayer, setcsContract)
        SearchPlayer('bascketball', setbascketballPlayer, setbContract)
        SearchOffer('dota', setoffersDOTA)
        SearchOffer('cs', setoffersCS)
        SearchOffer('bascketball', setoffersBASCKETBALL)
    }, [])
    let confirm = (el, direction, directionTransfer, contract) => {
        if (contract) {
            console.log('zxc')
        } else {
            let confirm = async (el) => {
                let pos = []
                for (let index = 0; index < el.position.length; index++) {
                    pos[index] = el.position[index].id
                }
                let response = await fetch(`${host}/api/${direction}/update/player_user/${user.user_id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                    },
                    body: JSON.stringify({ team: el.team.id, matches_in_offers: 10, generation: el.generation.id, position: pos })
                })
                let data = await response.json()
                let response1 = await fetch(`${host}/api/${direction}/delete/offers/${el.id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                    }
                })
                let data1 = await response1.json()
            }
            confirm(el)
            transfer(el, directionTransfer)
            navigate(`/${direction}/team/${el.team.id}`)
        }
    }
    let transfer = async (el, direction) => {
        let response = await fetch(`${host}/api/tranfers/reg/${direction}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ user: user.user_id, team: el.team.id, script: 3 })
        })
        let data = await response.json()
        location.reload();
    }
    let view = async (el, direction) => {
        let response = await fetch(`${host}/api/${direction}/delete/offers/${el.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ is_view: true })
        })
        let data = await response.json()
    }
    useEffect(() => {
        if (offersDOTA) {
            offersDOTA.map((el) => {
                view(el, 'dota')
            })
        }
    }, [offersDOTA])
    useEffect(() => {
        if (offersBASCKETBALL) {
            offersBASCKETBALL.map((el) => {
                view(el, 'bascketball')
            })
        }
    }, [offersBASCKETBALL])
    useEffect(() => {
        if (offersCS) {
            offersCS.map((el) => {
                view(el, 'cs')
            })
        }
    }, [offersCS])
    return (
        <>
            {dotaPlayer?.matches_in_offers > 1 && <div style={{ margin: '25px' }}> <p>у вас есть действующий контракт в лиге dota</p> </div>}
            {directorD && <div style={{ margin: '25px' }}> <p>вы являетесь директором команды dota</p> </div>}
            {!dotaPlayer && <div style={{ margin: '25px' }}> <p>перед вступлением в команду вы должны <span onClick={() => navigate('/dota/regplayer')} className={styles.span}>_ стать игроком лиги</span></p></div>}

            {csPlayer?.matches_in_offers > 1 && <div style={{ margin: '25px' }}> <p>у вас есть действующий контракт в лиге cs</p> </div>}
            {directorCS && <div style={{ margin: '25px' }}> <p>вы являетесь директором команды cs</p> </div>}
            {!csPlayer && <div style={{ margin: '25px' }}> <p>перед вступлением в команду вы должны <span onClick={() => navigate('/cs/regplayer')} className={styles.span}>_ стать игроком лиги</span></p></div>}

            {bascketballPlayer?.matches_in_offers > 1 && <div style={{ margin: '25px' }}> <p>у вас есть действующий контракт в лиге баскетбола</p> </div>}
            {directorB && <div style={{ margin: '25px' }}> <p>вы являетесь директором команды баскетбола</p> </div>}
            {!bascketballPlayer && <div style={{ margin: '25px' }}> <p>перед вступлением в команду вы должны <span onClick={() => navigate('/bascketball/regplayer')} className={styles.span}>_ стать игроком лиги</span></p></div>}
            <div className={styles.content}>
                {offersDOTA && offersDOTA.map((el) => <div className={styles.content_DOTA}>
                    <div className={styles.team_logo} onClick={() => navigate(`/dota/team/${el?.team?.id}`)} style={{ backgroundImage: `url(${el.team?.logo})`, cursor: 'pointer' }}></div>
                    <div className={styles.DOTA_info} onClick={() => navigate(`/dota/team/${el?.team?.id}`)} style={{ cursor: 'pointer' }}><p>{el.team?.team_name}</p>
                        <div className={styles.pos_list}>
                            {el.position.length > 0 && el.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el?.image_position})` }}></div>))}
                            <p style={{ position: 'absolute', bottom: '17px', left: '375px' }}>{el.generation?.generation_name}</p>
                        </div>
                        <div style={{ display: 'flex', marginLeft: '20px' }}>
                            <div className={styles.value_D}><p>контракт</p><span>{el.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>матчей</span></span></div>
                        </div>
                    </div>
                    <div className='more' onClick={() => confirm(el, 'dota', 'DOTA', dContract)} style={{ margin: '20px', marginLeft: '140px' }}><p>принять</p></div>
                </div>)}
            </div>
            <div className={styles.content}>
                {offersCS && offersCS.map((el) => <div className={styles.content_DOTA}>
                    <div className={styles.team_logo} onClick={() => navigate(`/cs/team/${el?.team?.id}`)} style={{ backgroundImage: `url(${el.team?.logo})`, cursor: 'pointer' }}></div>
                    <div className={styles.DOTA_info} onClick={() => navigate(`/cs/team/${el?.team?.id}`)} style={{ cursor: 'pointer' }}><p>{el.team?.team_name}</p>
                        <div className={styles.pos_list}>
                            {el.position.length > 0 && el.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el?.image_position})` }}></div>))}
                            <p style={{ position: 'absolute', bottom: '17px', left: '375px' }}>{el.generation?.generation_name}</p>
                        </div>
                        <div style={{ display: 'flex', marginLeft: '20px' }}>
                            <div className={styles.value_D}><p>контракт</p><span>{el.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>матчей</span></span></div>
                        </div>
                    </div>
                    <div className='more' onClick={() => confirm(el, 'cs', 'CS', csContract)} style={{ margin: '20px', marginLeft: '140px' }}><p>принять</p></div>
                </div>)}
            </div>
            <div className={styles.content}>
                {offersBASCKETBALL && offersBASCKETBALL.map((el) => <div className={styles.content_DOTA}>
                    <div className={styles.team_logo} onClick={() => navigate(`/bascketball/team/${el?.team?.id}`)} style={{ backgroundImage: `url(${el.team?.logo})`, cursor: 'pointer' }}></div>
                    <div className={styles.DOTA_info} onClick={() => navigate(`/bascketball/team/${el?.team?.id}`)} style={{ cursor: 'pointer' }}><p>{el.team?.team_name}</p>
                        <div className={styles.pos_list}>
                            {el.position.length > 0 && el.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el?.image_position})` }}></div>))}
                            <p style={{ position: 'absolute', bottom: '17px', left: '375px' }}>{el.generation?.generation_name}</p>
                        </div>
                        <div style={{ display: 'flex', marginLeft: '20px' }}>
                            <div className={styles.value_D}><p>контракт</p><span>{el.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>матчей</span></span></div>
                        </div>
                    </div>
                    <div className='more' onClick={() => confirm(el, 'bascketball', 'BASCKETBALL', bContract)} style={{ margin: '20px', marginLeft: '140px' }}><p>принять</p></div>
                </div>)}
            </div>
        </>
    );
}

export default Content;