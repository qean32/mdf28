import { useContext, useEffect, useState } from 'react'
import styles from './offers.module.css'
import context from '../../../../connections/context'
import { useNavigate } from 'react-router-dom'

const Offer = ({ el, host, go_modal, go_modal_1, go_modal_2 }) => {
    let { user } = useContext(context)
    let navigate = useNavigate()

    let ModalFunc
    if (el.direction.id == 1) {
        ModalFunc = go_modal
    } else if (el.direction.id == 3) {
        ModalFunc = go_modal_1
    } else {
        ModalFunc = go_modal_2
    }

    let str_direction
    if (el.direction.id == 1) {
        str_direction = 'dota'
    } else if (el.direction == 3) {
        str_direction.id = 'cs'
    } else if (el.direction.id == 4) {
        str_direction = 'bascketball'
    }

    const [player, setplayer] = useState(false)
    const [contract, setcontract] = useState(false)
    const [director, setdirector] = useState(false)
    let SearchPlayer = async () => {
        let response = await fetch(`${host}/api/unification/search/player/${str_direction}/?user=${user.user_id}&direction=${el.direction.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0]?.id) {
            setplayer(true)
        }
        if (data.results[0]?.matches_in_offers > 1) {
            setcontract(true)
        }
    }
    let SearhDirector = async () => {
        let response = await fetch(`${host}/api/unification/search/team/?director=${user.user_id}&direction=${el.direction.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0]?.id) {
            setdirector(true)
        }
    }
    useEffect(() => {
        SearhDirector()
        SearchPlayer()
    }, [])
    let Accept = (el) => {
        if (contract || !player || director) {
            ModalFunc()
        } else {
            let Accept_ = async (el) => {
                let pos = []
                for (let index = 0; index < el.position.length; index++) {
                    pos[index] = el.position[index].id
                }
                let response = await fetch(`${host}/api/unification/update/player_user/${str_direction}/${user.user_id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                    },
                    body: JSON.stringify({ team: el.team.id, matches_in_offers: 10, generation: el.generation.id, position: pos })
                })
                let data = await response.json()
                let response1 = await fetch(`${host}/api/unification/delete/offers/${el.id}/`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                    }
                })
                let data1 = await response1.json()
            }
            Accept_(el)
            RegistrationTransfer()
            navigate(`/${str_direction}/team/${el.team.id}`)
        }
    }

    let RegistrationTransfer = async () => {
        let response = await fetch(`${host}/api/transfers/reg/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ user: user.user_id, team: el.team.id, script: 3, direction: el.direction.id })
        })
        let data = await response.json()
    }

    return (
        <div className={styles.content_DOTA}>
            <div className={styles.team_logo} onClick={() => navigate(`/${str_direction}/team/${el?.team?.id}`)} style={{ backgroundImage: `url(${el.team?.logo})`, cursor: 'pointer' }}></div>
            <div className={styles.DOTA_info} onClick={() => navigate(`/${str_direction}/team/${el?.team?.id}`)} style={{ cursor: 'pointer' }}><p>{el.team?.name}</p>
                <div className={styles.pos_list}>
                    {el.position.length > 0 && el.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el?.image_position})` }}></div>))}
                    <p style={{ position: 'absolute', bottom: '19px', left: '365px' }}></p>
                </div>
                <div style={{ display: 'flex', marginLeft: '20px' }}>
                    <div className={styles.value_D}><span>{el.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>матчей</span></span></div>
                </div>
            </div>
            <div className='more' onClick={() => Accept(el)} style={{ margin: '15px', marginLeft: '120px' }}><p>принять</p></div>
        </div>
    );
}

export default Offer;