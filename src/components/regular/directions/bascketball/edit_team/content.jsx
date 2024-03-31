import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Playereditdota from './player';
import context from '../../../../../connections/context';

const Content = () => {
    let { id } = useParams()
    let { user } = useContext(context)
    const [info, setinfo] = useState({})
    const [players, setplayers] = useState([])
    let Searh = async (id) => {
        let response = await fetch(`http://qean32.beget.tech/api/bascketball/search/team/?id=${id}`, {
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
        let response = await fetch(`http://qean32.beget.tech/api/bascketball/search/player/?team=${id}&offset=0&limit=16`, {
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
    const [color, setcolor] = useState('')
    let up1 = async (e, id) => {
        e.preventDefault()
        let response = await fetch(`http://qean32.beget.tech/api/bascketball/update/team/${id}/`, {
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
        let response = await fetch(`http://qean32.beget.tech/api/bascketball/update/team/${id}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: formData
        })
        let data = await response.json()
        navigate(`/bascketball/team/${id}`)
    }
    return (
        <>
            <div className={styles.content}>
            <p style={{transform: 'translateY(10px) translateX(30px)', color: '#E74343'}}>файлы не должны содержать кириллицу</p>
                <div className={styles.header}><img src="/svg/venok.svg" /></div>
                <form className={styles.form} onSubmit={(e) => up1(e, info.id)}>
                    <div className={styles.fullname}><input maxLength={15} style={{ width: '260px', transform: 'translateX(30px) translateY(5px)' }} onChange={(e) => setname(e.target.value)} type="text" name="" id="" placeholder='название команды' value={name} /> <input style={{ opacity: '0', pointerEvents: 'none' }} type="text" name="" id="" placeholder='фамилия' /></div>
                    <div style={{ justifyContent: 'start', paddingLeft: '105px', paddingBlock: '10px' }}><p>цвет</p><input onChange={(e) => setcolor(e.target.value)} type="color" src="" alt="" style={{ background: "none", width: '200px' }} /></div>
                    <div>
                        <div><p>фон</p><input type="file" accept='.png,.jpg,.jpeg.,gif' onChange={(e) => setbck(e.target.files[0])} src="" alt="" style={{ background: "none", width: '200px' }} /></div>
                        <div><p>логотип</p><input type="file" accept='.png,.jpg,.jpeg.,gif' alt="" onChange={(e) => setlogo(e.target.files[0])} style={{ background: "none", width: '200px' }} /></div>
                    </div>
                    <div><input type="text" name="" id="" value={status} maxLength={255} onChange={(e) => setstatus(e.target.value)} placeholder='статус' /></div>
                    <div style={{ height: '100px', marginBlock: '20px' }}><textarea maxLength={255} name="" id="" placeholder='подробно' value={detail} onChange={(e) => setdetail(e.target.value)} cols="30" rows="10"></textarea></div>
                    <div><button type="submit" className='more' style={{ width: '400px' }}><p>Сохранить</p></button></div>
                </form>
            </div>
            <div className={styles.content} style={{ marginTop: '40px', paddingTop: '20px' }}>
                {players.map((el) => <Playereditdota idteam={info.id} el={el} />)}
                <form className={styles.form}>
                </form>
            </div>
            <div style={{ height: '40px' }}></div>
        </>
    );
}

export default Content;