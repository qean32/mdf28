import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import PlayerEdit from './player';
import context from '../../../../../connections/context';

const Content = () => {
    let host = 'https://mdf28server.site'
    let direction = 'bascketball'
    let { id } = useParams()
    let { user } = useContext(context)
    const [info, setinfo] = useState({})
    const [players, setplayers] = useState([])
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
        Searchplayer(id)
    }, [])
    useEffect(() => {
        if (info.director?.id) {
            if (user.user_id != info.director?.id) {
                alert('как ты сюда попал?')
                navigate('/')
            }
        }
    }, [info])
    let Searchplayer = async (id) => {
        let response = await fetch(`${host}/api/${direction}/search/player/?team=${id}&offset=0&limit=16`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setplayers(data.results)
    }
    const navigate = useNavigate()
    const [name, setname] = useState('')
    const [status, setstatus] = useState('')
    const [detail, setdetail] = useState('')
    const [logo, setlogo] = useState()
    const [bck, setbck] = useState()
    const [color, setcolor] = useState()
    let up1 = async (e, id) => {
        e.preventDefault()
        let response = await fetch(`${host}/api/${direction}/update/team/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ 'team_name': name, 'detail': detail, 'color': color, 'status': status, 'director': user.user_id })
        })
        let data = await response.json()
        up(data.id)
    }
    let up = async (id) => {
        const formData = new FormData()
        if (bck) {
            formData.append('background', bck)
        }
        if (logo) {
            formData.append('logo', logo)
        }
        let response = await fetch(`${host}/api/${direction}/update/team/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: formData
        })
        let data = await response.json()
        navigate(`/${direction}/team/${id}`)
    }

    let change_file = (e,set) => {
        const newName = Math.floor(Math.random() * 1000000);
        const input = e.currentTarget;
        const previousFile = input.files[0];
        const newFile = new File([previousFile], `${newName}.png`);
        
        // hack to update the selected file
        const dT = new DataTransfer();
        dT.items.add(newFile);
        input.files = dT.files;
        // console.log('Selected file: ' + input.files.item(0).name);
        // console.log(input.files.item(0))

        set(input.files.item(0))
    }
    return (
        <>
            <div className={styles.content}>
                <div className={styles.header}></div>
                <form className={styles.form} onSubmit={(e) => up1(e, info.id)}>
                    <div className={styles.fullname}><input maxLength={15} style={{ width: '260px', transform: 'translateX(30px) translateY(5px)' }} onChange={(e) => setname(e.target.value)} type="text" name="" id="" placeholder='название команды' value={name} /> <input style={{ opacity: '0', pointerEvents: 'none' }} type="text" name="" id="" placeholder='фамилия' /></div>
                    <div style={{ justifyContent: 'start', paddingLeft: '105px', paddingBlock: '10px' }}><p>цвет</p><input onChange={(e) => setcolor(e.target.value)} type="color" src="" alt="" style={{ background: "none", width: '200px' }} /></div>
                    <div>
                        <div><p>фон</p><input type="file" accept='.png,.jpg,.jpeg.,gif' onChange={(e) => change_file(e,setbck)} src="" alt="" style={{ background: "none", width: '200px' }} /></div>
                        <div><p>логотип</p><input type="file" accept='.png,.jpg,.jpeg.,gif' alt="" onChange={(e) => change_file(e,setlogo)} style={{ background: "none", width: '200px' }} /></div>
                    </div>
                    <div><input type="text" name="" id="" value={status} maxLength={255} onChange={(e) => setstatus(e.target.value)} placeholder='статус' /></div>
                    <div style={{ height: '100px', marginBlock: '20px' }}><textarea maxLength={255} name="" id="" placeholder='подробно' value={detail} onChange={(e) => setdetail(e.target.value)} cols="30" rows="10"></textarea></div>
                    <div><button type="submit" className='more' style={{ width: '400px' }}><p>Сохранить</p></button></div>
                </form>
            </div>
            <div className={styles.content} style={{ marginTop: '40px', paddingTop: '20px' }}>
                {players.map((el) => <PlayerEdit idteam={info.id} el={el} />)}
                <form className={styles.form}>
                </form>
            </div>
            <div style={{ height: '40px' }}></div>
        </>
    );
}

export default Content;