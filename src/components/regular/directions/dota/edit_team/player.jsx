import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const PlayerEdit = ({ el, idteam }) => {
    let host = 'https://mdf28server.site'
    let direction = 'dota'
    let { id } = useParams()
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
                if (zxc == 1) {
                    setpos1(true)
                }
                if (zxc == 2) {
                    setpos2(true)
                }
                if (zxc == 3) {
                    setpos3(true)
                }
                if (zxc == 4) {
                    setpos4(true)
                }
                if (zxc == 5) {
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
    let up = async (idj) => {
        let response = await fetch(`${host}/api/${direction}/update/player_director/${idj}/`, {
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
    let del = async (idj) => {
        let response = await fetch(`${host}/api/${direction}/update/player_director/${idj}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team: null, user: idj, generation: null, position: null })
        })
        let data = await response.json()
        trans(idj)
    }
    let trans = async (idj) => {
        let response = await fetch(`${host}/api/tranfers/reg/DOTA/`, {
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
    const navigate = useNavigate()
    let director = async (idj, idu) => {
        let response = await fetch(`${host}/api/${direction}/update/team/${idj}/`, {
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
                        <label htmlFor="id_1"><img src="/position/pos_1.png" alt="" onClick={() => uppos(pos1, setpos1, 1)} className={pos1 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                        <label htmlFor="id_1"><img src="/position/pos_2.png" alt="" onClick={() => uppos(pos2, setpos2, 2)} className={pos2 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                        <label htmlFor="id_1"><img src="/position/pos_4.png" alt="" onClick={() => uppos(pos3, setpos3, 3)} className={pos3 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                        <label htmlFor="id_1"><img src="/position/pos_5.png" alt="" onClick={() => uppos(pos4, setpos4, 4)} className={pos4 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                        <label htmlFor="id_1"><img src="/position/pos_3.png" alt="" onClick={() => uppos(pos5, setpos5, 5)} className={pos5 ? styles.bck : {}} style={{ height: '18px', padding: '5px', borderRadius: '7px' }} /></label>
                    </div>
                    <div style={{ gap: '10px' }}>
                        <div><button type="submit" className={styles.more} onClick={() => up(el.user?.id)} style={{ width: '100px' }}><p>Сохранить</p></button></div>
                        <div><button type="submit" className={styles.more} onClick={() => del(el.user?.id)} style={{ width: '100px' }}><p>Исключить</p></button></div>
                        <div><button type="submit" className={styles.more} onClick={() => director(idteam, el.user?.id)} style={{ width: '100px' }}><p>Передать шапку</p></button></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlayerEdit;