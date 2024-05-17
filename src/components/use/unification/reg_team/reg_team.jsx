import styles from './reg_team.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../../connections/context';

const Reg_Team = ({ host, direction, str_direction }) => {
    const navigate = useNavigate()
    const [name, setname] = useState('')
    const [status, setstatus] = useState('')
    const [detail, setdetail] = useState('')
    const [logo, setlogo] = useState('')
    const [bck, setbck] = useState('')
    const [color, setcolor] = useState('#535353')
    let { user } = useContext(context)
    const [director, setdirector] = useState(false)
    let SearhDirector = async () => {
        let response = await fetch(`${host}/api/unification/search/team/?director=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0].id) {
            setdirector(data.results[0].id)
        }
    }
    const [Player, setPlayer] = useState(false)
    let SearhPlayer = async () => {
        let response = await fetch(`${host}/api/unification/search/player/${str_direction}/?user=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        console.log(data)
        setPlayer(data.results[0])
    }
    useEffect(() => {
        SearhDirector()
        SearhPlayer()
    }, [])
    let Registratoin = async (e) => {
        e.preventDefault()
        if (director) {
        } else {
            let response = await fetch(`${host}/api/unification/reg/team/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                },
                body: JSON.stringify({ 'team_name': name, 'detail': detail, 'color': color, 'status': status, 'director': user.user_id, direction: direction })
            })
            let data = await response.json()
            if (data?.members == `Недопустимый первичный ключ "${user.user_id}" - объект не существует.`) {
            }
            Update(data.id)
        }
    }
    let Update = async (id) => {
        const formData = new FormData()
        formData.append('background', bck)
        formData.append('logo', logo)
        let response = await fetch(`${host}/api/unification/update/team/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: formData
        })
        let data = await response.json()
        Director_(data.id)
    }
    useEffect(() => {
    }, [])
    let Director_ = async (id) => {
        let response = await fetch(`${host}/api/unification/update/player_user/${user.user_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ team: id, generation: 1 })
        })
        let data = await response.json()
        navigate(`/${direction}/team/${id}`)
    }

    let ChangeFile = (e, set) => {
        const newName = Math.floor(Math.random() * 1000000);
        const input = e.currentTarget;
        const previousFile = input.files[0];
        const newFile = new File([previousFile], `${newName}.png`);
        const dT = new DataTransfer();
        dT.items.add(newFile);
        input.files = dT.files;

        set(input.files.item(0))
    }
    return (
        <>
            <div className={styles.content}>
                <div className={styles.header}></div>
                <form className={styles.form} onSubmit={(e) => Registratoin(e)}>
                    <div className={styles.fullname}><input maxLength={15} onChange={(e) => setname(e.target.value)} style={{ width: '260px', transform: 'translateX(30px) translateY(5px)' }} type="text" name="" id="" placeholder='название команды' /> <input style={{ opacity: '0', pointerEvents: 'none' }} type="text" name="" id="" placeholder='фамилия' /></div>
                    <div style={{ justifyContent: 'start', paddingLeft: '105px', paddingBlock: '10px' }}><p>цвет</p><input maxLength={15} onChange={(e) => setcolor(e.target.value)} type="color" src="" alt="" style={{ background: "none", width: '200px' }} /></div>
                    <div>
                        <div><label htmlFor="id_f1" className={styles.file}><p>фон</p></label>
                            <input accept='.png,.jpg,.jpeg.,gif' id='id_f1' onChange={(e) => ChangeFile(e, setbck)} type="file" src="" alt="" style={{ background: "none", width: '200px', display: 'none' }} /></div>
                        <div><label htmlFor="id_f2" className={styles.file}><p>логотип</p></label>
                            <input accept='.png,.jpg,.jpeg.,gif' id='id_f2' onChange={(e) => ChangeFile(e, setlogo)} type="file" alt="" style={{ background: "none", width: '200px', display: 'none' }} /></div>
                    </div>
                    <div><input type="text" name="" id="" onChange={(e) => setstatus(e.target.value)} maxLength={255} placeholder='статус' /></div>
                    <div style={{ height: '100px', marginBlock: '20px' }}><textarea onChange={(e) => setdetail(e.target.value)} maxLength={255} name="" id="" placeholder='подробно' cols="30" rows="10"></textarea></div>
                    {!Player && <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', marginTop: '80px' }}>перед регистристрацией команды вы должны <span style={{ marginLeft: '10px' }} onClick={() => navigate(`/${str_direction}/regplayer`)} className={styles.span}>стать игроком лиги</span></p>}
                    {director && <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', marginTop: '40px' }}>вы не должны являться директором команды</p>}
                    {Player?.team && <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', marginTop: '40px' }}>вы не должны являться членом команды</p>}
                    {Player && !director && !director?.team && <div><button type="submit" className='more' style={{ width: '400px' }}><p>Сохранить</p></button></div>}
                </form>
            </div>
        </>
    );
}

export default Reg_Team;