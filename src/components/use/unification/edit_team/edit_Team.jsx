import styles from './edit_team.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../../connections/context';

const Edit_Team = ({host, direction, str_direction}) => {
    let { id } = useParams()
    let { user } = useContext(context)
    const [info, setinfo] = useState({})
    let Searh = async (id) => {
        let response = await fetch(`${host}/api/${direction}/search/team/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setinfo(data.results[0])
        setname(data.results[0]?.team_name)
        setstatus(data.results[0]?.status)
        setdetail(data.results[0]?.detail)
        setcolor(data.results[0]?.color)
    }
    useEffect(() => {
        Searh(id)
    }, [])
    useEffect(() => {
        if (info.director?.id) {
            if (user.user_id != info.director?.id) {
                alert('как ты сюда попал?')
                navigate('/')
            }
        }
    }, [info])
    const navigate = useNavigate()
    const [name, setname] = useState('')
    const [status, setstatus] = useState('')
    const [detail, setdetail] = useState('')
    const [logo, setlogo] = useState()
    const [bck, setbck] = useState()
    const [color, setcolor] = useState()
    let colors = ['#252850', '#17806D', '#483C32', '#7BA05B', '#25221B', '#3B83BD', '#497E76', '#474B4E']

    let Update1 = async (e, id) => {
        e.preventDefault()
        if (!color) {
            setcolor(Math.floor(Math.random() *colors.length))
        }
        let response = await fetch(`${host}/api/unification/update/team/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ 'team_name': name, 'detail': detail, 'color': color, 'status': status, 'director': user.user_id })
        })
        let data = await response.json()
        Update(data.id)
    }

    let Update = async (id) => {
        const formData = new FormData()
        if (bck) {
            formData.append('background', bck)
        }
        if (logo) {
            formData.append('logo', logo)
        }
        let response = await fetch(`${host}/api/unification/update/team/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: formData
        })
        let data = await response.json()
        navigate(`/team/${id}`)
    }

    let ChangeFile = (e,set) => {
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
                <form className={styles.form} onSubmit={(e) => Update1(e, info.id)}>
                    <div className={styles.fullname}><input maxLength={15} style={{ width: '260px', transform: 'translateX(30px) translateY(5px)' }} onChange={(e) => setname(e.target.value)} type="text" name="" id="" placeholder='название команды' value={name} /> <input style={{ opacity: '0', pointerEvents: 'none' }} type="text" name="" id="" placeholder='фамилия' /></div>
                    <div style={{ justifyContent: 'start', paddingLeft: '105px', paddingBlock: '10px' }}><p>цвет</p><input onChange={(e) => setcolor(e.target.value)} type="color" src="" alt="" style={{ background: "none", width: '200px' }} /></div>
                    <div>
                        <div><p>фон</p><input type="file" accept='.png,.jpg,.jpeg.,gif' onChange={(e) => ChangeFile(e,setbck)} src="" alt="" style={{ background: "none", width: '200px' }} /></div>
                        <div><p>логотип</p><input type="file" accept='.png,.jpg,.jpeg.,gif' alt="" onChange={(e) => ChangeFile(e,setlogo)} style={{ background: "none", width: '200px' }} /></div>
                    </div>
                    <div><input type="text" name="" id="" value={status} maxLength={255} onChange={(e) => setstatus(e.target.value)} placeholder='статус' /></div>
                    <div style={{ height: '100px', marginBlock: '20px' }}><textarea maxLength={255} name="" id="" placeholder='подробно' value={detail} onChange={(e) => setdetail(e.target.value)} cols="30" rows="10"></textarea></div>
                    <div><button type="submit" className='more' style={{ width: '400px' }}><p>Сохранить</p></button></div>
                </form>
            </div>
        </>
    );
}

export default Edit_Team;