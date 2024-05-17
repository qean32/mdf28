import styles from './edit_structure.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../../connections/context';

const PlayerEdit_ = ({ el, idteam, host, direction, str_direction }) => {
    let {user} = useContext(context)
    let { id } = useParams()
    const navigate = useNavigate()
    const [gen, setgen] = useState()
    useEffect(() => {
        if (el.generation?.id) {
            setgen(el.generation?.id)
        }
    }, [])
    const [pos1, setpos1] = useState(false)
    const [pos2, setpos2] = useState(false)
    const [pos3, setpos3] = useState(false)
    const [pos4, setpos4] = useState(false)
    const [pos5, setpos5] = useState(false)
    const [pos, setpos] = useState([])
    useEffect(() => {
        if (el.position) {
            for (let index = 0; index < el.position.length; index++) {
                let zxc = el.position[index].id;
                if (zxc == 6) {
                    setpos1(true)
                }
                if (zxc == 7) {
                    setpos2(true)
                }
                if (zxc == 8) {
                    setpos3(true)
                }
                if (zxc == 9) {
                    setpos4(true)
                }
                if (zxc == 10) {
                    setpos5(true)
                }
            }
        }
        let posl = [];
        for (let index = 0; index < el.position.length; index++) {
            posl[index] = el.position[index].id
        }
        setpos(posl)
    }, [])
    let Update = async (idj) => {
        let response = await fetch(`${host}/api/unification/update/player_director/${idj}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ user: idj, position: pos, generation: gen })
        })
        let data = await response.json()
        location.reload()
    }
    let Delete = async (idj) => {
        let response = await fetch(`${host}/api/unification/update/player_director/${idj}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team: null, user: idj, generation: null, position: null })
        })
        let data = await response.json()
        Transfer(idj)
    }
    let Transfer = async (idj) => {
        let response = await fetch(`${host}/api/tranfers/reg/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ user: idj, team: id, script: 2 })
        })
        let data = await response.json()
        location.reload();
    }

    let Director = async (idj, idu) => {
        let response = await fetch(`${host}/api/unification/update/team/${idj}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ director: idu, })
        })
        let data = await response.json()
        navigate(`/${direction}/team/${idteam}`)
    }

    const uppos = (posid, setposid, idp) => {
        if (posid) {
            setposid(false)
            setpos(pos.filter(el => el != idp))
        } else {
            setposid(true)
            setpos([...pos, idp])
        }
    }
    
    return (
        <>
            <div className={styles.info_el} style={{ justifyContent: 'start' }} onClick={() => navigate(`/profile/${el.user?.id}`)}>
                <div style={{ backgroundImage: `url(${el.user?.ava})` }} className={styles.ava}>
                </div><p>{el.user?.first_name} {el.user?.last_name}
                    {el.user?.smail && <div style={{ backgroundImage: `url(${el.user?.smail.image})` }} className={styles.smail}></div>}
                    {el.user?.team_sap && <div style={{ backgroundImage: `url(${el.user?.team_sap.image})` }} className={styles.smail}></div>}
                </p><div className={styles.dotas}><img src={el.rank?.image_rank} /></div></div>
            <div className={styles.editplayer}>
                <div>
                    <div>
                        <p>состав</p>
                        <div>
                            <label htmlFor="id_6" onClick={() => setgen(1)} className={gen == 1 ? styles.color : {}}>основной</label>
                            <label htmlFor="id_7" onClick={() => setgen(2)} className={gen == 2 ? styles.color : {}} style={{ marginLeft: '10px' }}>скамейка</label>
                        </div>
                    </div>
                    <div className={styles.pos} style={{ marginLeft: '50px', marginRight: '10px' }}>
                        <p>позиции</p>
                        <label htmlFor="id_1"><img src="/position/pos_1_.png" alt="" onClick={() => uppos(pos1, setpos1, 6)} className={pos1 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                        <label htmlFor="id_1"><img src="/position/pos_2_.png" alt="" onClick={() => uppos(pos2, setpos2, 7)} className={pos2 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                        <label htmlFor="id_1"><img src="/position/pos_3_.png" alt="" onClick={() => uppos(pos3, setpos3, 8)} className={pos3 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                        <label htmlFor="id_1"><img src="/position/pos_4_.png" alt="" onClick={() => uppos(pos4, setpos4, 9)} className={pos4 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                        <label htmlFor="id_1"><img src="/position/pos_5_.png" alt="" onClick={() => uppos(pos5, setpos5, 10)} className={pos5 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                    </div>
                    <div style={{ gap: '10px' }}>
                        <div><button type="submit" className={styles.more} onClick={() => Update(el.user?.id)} style={{ width: '100px' }}><p>Сохранить</p></button></div>
                        {user?.id != el.user?.id &&  <div><button type="submit" className={styles.more} onClick={() => Delete(el.user?.id)} style={{ width: '100px' }}><p>Исключить</p></button></div>}
                        {user?.id != el.user?.id && <div><button type="submit" className={styles.more} onClick={() => Director(idteam, el.user?.id)} style={{ width: '100px' }}><p>Передать шапку</p></button></div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlayerEdit_;