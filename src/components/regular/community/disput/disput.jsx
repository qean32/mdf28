import { useContext, useEffect, useState } from 'react';
import styles from './disputes.module.css'
import { useParams, useNavigate } from 'react-router-dom';
import context from '../../../../connections/context';

const Content = () => {
    const navigate = useNavigate()
    let { id } = useParams()
    const [info, setInfo] = useState({})
    const [message, setmessage] = useState([])
    let { user } = useContext(context)
    let Search = async () => {
        let response = await fetch(`https://mdf28server.site/api/disputes/search/disput/?search=${id}`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        console.log(data.results[0])
        setInfo(data.results[0])
    }
    let SearchMessange = async () => {
        let response = await fetch(`https://mdf28server.site/api/disputes/search/message/?disput=${info.id}&limit=90&offset=0`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        console.log(data.results)
        setmessage(data.results)
    }
    useEffect(() => {
        Search()
    }, [])
    useEffect(() => {
        SearchMessange()
    }, [info])
    const [ava, setAva] = useState('')
    let SearhUser = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/users/search/user/?id=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setAva(data.results[0])
    }
    useEffect(() => {
        SearhUser()
    }, [])
    const [valuemessage, setvaluemessage] = useState('')
    const message_go = async (e, valuemessage, ava, info) => {
        e.preventDefault()
        if (valuemessage.length > 0) {
            console.log(ava)
            let org = ava.is_org
            let response = await fetch('https://mdf28server.site/api/disputes/reg/message/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
                },
                body: JSON.stringify({ 'author': ava?.id, 'content': valuemessage, 'disput': info.id, 'is_message_org': org })
            })
            let data = await response.json()
            console.log(data)
            setmessage([...[{ 'author': ava, 'content': valuemessage, 'is_message_org': org }], ...message])
            setvaluemessage('')
        }
    }
    return (
        <>
            <div className={styles.content}>
                <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate('/disputes')} />
                <div className={styles.header}>
                    <p>{info.title}</p>
                </div>
                <div className={styles.body}>
                    {message && message.map((el) =>
                        <div className={user?.user_id != el.author?.id ? styles.message : styles.message_l}>
                            <div>
                                <div className={styles.author} onClick={() => navigate(`/profile/${el.author?.id}`)} style={{ backgroundImage: `url(${el.author?.ava})` }}></div>
                                <div className={styles.fakeauthor}></div>
                            </div>
                            <div className={user?.user_id != el.author?.id ? styles.content_m : styles.content_m_l} style={el.is_message_org ? {} : {}}>
                                {el.image && <div className={styles.image} style={{ backgroundImage: `url(${el.image})` }}></div>}
                                <p className={styles.nameAuthor} onClick={() => navigate(`/profile/${el.author?.id}`)}>{el.author?.first_name} {el.author?.last_name}</p>
                                <p style={{ marginTop: '5px' }}>{el.content}</p>
                            </div>
                        </div>
                    )}
                </div>
                {user?.is_org && <div className={styles.enter}>
                    <img src="/svg/sckrepka.svg" style={{ height: '25px' }} />
                    <form action="" onSubmit={(e) => message_go(e, valuemessage, ava, info)}>
                        <input type="text" onChange={(e) => setvaluemessage(e.target.value)} name="" id="" placeholder='ваше сообщение' maxLength={255} />
                        <button type="submit" style={{ marginInline: '30px', transform: 'translateY(10px)' }}>
                            <img src="/svg/Enter.svg" style={{ height: '25px', transform: 'translateX(-5px)' }} />
                        </button>
                    </form>
                </div>}
                {user?.user_id == info.author?.id && !info.is_of && <div className={styles.enter}>
                    <img src="/svg/sckrepka.svg" style={{ height: '25px', cursor: 'pointer' }} />
                    <form action="" onSubmit={(e) => message_go(e, valuemessage, ava, info)}>
                        <input type="text" onChange={(e) => setvaluemessage(e.target.value)} name="" id="" placeholder='ваше сообщение' maxLength={255} />
                        <button type="submit" style={{ marginInline: '30px', transform: 'translateY(10px)' }}>
                            <img src="/svg/Enter.svg" style={{ height: '25px', transform: 'translateX(-5px)', cursor: 'pointer' }} />
                        </button>
                    </form>
                </div>}
                {user?.user_id != info.author?.id && !user?.is_org && <div style={{ height: "50px" }}></div>}
                <div style={{ height: '70px' }}></div>
            </div>
        </>
    );
}

export default Content;