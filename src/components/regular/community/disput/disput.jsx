import { useContext, useEffect, useState } from 'react';
import styles from './disputes.module.css'
import { useParams, useNavigate } from 'react-router-dom';
import context from '../../../../connections/context';

const Content = () => {
    let host = 'https://mdf28server.site'
    const navigate = useNavigate()
    let { id } = useParams()
    const [disput, setdisputs] = useState({})
    const [message, setmessage] = useState([])
    let { user } = useContext(context)
    let SearchDisput = async () => {
        let response = await fetch(`${host}/api/disputes/search/disput/?search=${id}`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        console.log(data.results[0])
        setdisputs(data.results[0])
    }
    let SearchMessange = async () => {
        let response = await fetch(`${host}/api/disputes/search/message/?disput=${disput.id}&limit=90&offset=0`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
            }
        })
        let data = await response.json()
        setmessage(data.results)
    }
    useEffect(() => {
        SearchDisput()
        SearhUser()
    }, [])
    useEffect(() => {
        if (disput.id) {
            SearchMessange()
        }
    }, [disput])
    const [ava, setAva] = useState('')
    let SearhUser = async () => {
        let response = await fetch(`${host}/api/users/search/user/?id=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setAva(data.results[0])
    }
    const [valuemessage, setvaluemessage] = useState('')
    const message_go = async (e, valuemessage, ava, disput) => {
        e.preventDefault()
        if (valuemessage.length > 0) {
            let org = ava?.is_org
            let response = await fetch(`${host}/api/disputes/reg/message/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
                },
                body: JSON.stringify({ 'author': ava?.id, 'content': valuemessage, 'disput': disput.id, 'is_message_org': org })
            })
            let data = await response.json()
            setmessage([...[{ 'author': ava, 'content': valuemessage, 'is_message_org': org }], ...message])
        }
        setvaluemessage('')
    }
    return (
        <>
            <div className={styles.content}>
                <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate('/disputes')} />
                <div className={styles.header}>
                    <p>{disput.title}</p>
                </div>
                <div className={styles.body}>
                    {message && message.map((el) =>
                        <div className={user?.user_id != el.author?.id ? styles.message : styles.message_l}>
                            <div>
                                <div className={styles.author} onClick={() => navigate(`/profile/${el.author?.id}`)} style={user?.user_id != el.author?.id ? { backgroundImage: `url(${el.author?.ava})` } : { backgroundImage: `url(${el.author?.ava})`,transform: 'scale(-1, 1)'}}></div>
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
                    <form action="" onSubmit={(e) => message_go(e, valuemessage, ava, disput)}>
                        <input type="text" value={valuemessage} onChange={(e) => setvaluemessage(e.target.value)} name="" id="" placeholder='ваше сообщение' maxLength={255} />
                        <button type="submit" style={{ marginInline: '30px', transform: 'translateY(10px)' }}>
                            <img src="/svg/Enter.svg" style={{ height: '25px', transform: 'translateX(-5px)' }} />
                        </button>
                    </form>
                </div>}
                {user?.user_id == disput.author?.id && !disput.is_of && <div className={styles.enter}>
                    <img src="/svg/sckrepka.svg" style={{ height: '25px', cursor: 'pointer' }} />
                    <form action="" onSubmit={(e) => message_go(e, valuemessage, ava, disput)}>
                        <input type="text" value={valuemessage} onChange={(e) => setvaluemessage(e.target.value)} name="" id="" placeholder='ваше сообщение' maxLength={255} />
                        <button type="submit" style={{ marginInline: '30px', transform: 'translateY(10px)' }}>
                            <img src="/svg/Enter.svg" style={{ height: '25px', transform: 'translateX(-5px)', cursor: 'pointer' }} />
                        </button>
                    </form>
                </div>}
                {user?.user_id != disput.author?.id && !user?.is_org && <div style={{ height: "50px" }}></div>}
                <div style={{ height: '70px' }}></div>
            </div>
        </>
    );
}

export default Content;