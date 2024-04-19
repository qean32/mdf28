import { useContext, useEffect, useState } from 'react';
import styles from './chat.module.css'
import { useNavigate } from 'react-router-dom';
import context from '../../../../connections/context';

const Content = () => {
    let host = 'https://mdf28server.site'
    const navigate = useNavigate();
    let { user } = useContext(context)
    const [direction, setdirection] = useState(1)
    const [data1, setdata1] = useState([])
    const [ava, setAva] = useState('')
    const [link, setlink] = useState(`${host}/api/chat/search/message/?direction=${direction}&limit=25&offset=0`)
    const [linkd, setlinkd] = useState(`${host}/api/chat/search/message/?direction=${direction}&limit=25&offset=0`)
    const [load, setload] = useState(false)
    let Searh = async () => {
        if (link) {

            let response = await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            setlink(data.next)
            setdata1([...data1, ...data.results])
        }
    }
    let SearhN = async () => {
        let response = await fetch(linkd, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setlink(data.next)
        setdata1(data.results)
    }
    useEffect(() => {
        if (linkd) {
            SearhN()
        }
    }, [linkd])
    useEffect(() => {
        setlinkd(`${host}/api/chat/search/message/?direction=${direction}&limit=25&offset=0`)
        setload(true)
        setTimeout(() => {
            setload(false)
        }, 400);
    }, [direction])
    useEffect(() => {
        Searh()
        SearhUser()
    }, [])
    const [dota, setdota] = useState(true)
    const [bascketball, setbascketball] = useState(false)
    const [cs, setcs] = useState(false)
    const [mdf, setmdf] = useState(false)
    const setmdf1 = () => {
        setdirection('')
        setbascketball(false)
        setcs(false)
        setdota(false)
        setmdf(true)
    }
    const setbascketball1 = () => {
        setdirection(4)
        setbascketball(true)
        setcs(false)
        setdota(false)
        setmdf(false)
    }
    const setcs1 = () => {
        setdirection(3)
        setbascketball(false)
        setcs(true)
        setdota(false)
        setmdf(false)
    }
    const setdota1 = () => {
        setdirection(1)
        setbascketball(false)
        setcs(false)
        setdota(true)
        setmdf(false)
    }
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
    const message_go = async (e, valuemessage, ava, direction) => {
        e.preventDefault()
        console.log(valuemessage)
        if (valuemessage.length > 0) {
            console.log(ava)
            let org = ava.is_org
            let response = await fetch(`${host}/api/chat/reg/message/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
                },
                body: JSON.stringify({ 'author': ava?.id, 'content': valuemessage, 'direction': direction, 'is_message_org': org })
            })
            let data = await response.json()
            console.log(data)
            setdata1([...[{ 'author': ava, 'content': valuemessage, 'is_message_org': org }], ...data1])
        }
        setvaluemessage('')
    }
    return (
        <>
            <div className={styles.content_right_}>
                <div onClick={setdota1}><p>дота</p></div>
                <div onClick={setmdf1}><p>общий</p></div>
                <div onClick={setcs1}><p>кс</p></div>
                <div onClick={setbascketball1}><p>баскетболл</p></div>
            </div>
            <div className={styles.content}>
                {bascketball && <img src="/svg/bascketball_logo.svg" alt="" style={{ height: '170px'}} />}
                {cs && <img src="/svg/cs_logo.svg" alt="" style={{ height: '240px', transform: 'translateX(-55%) translateY(-95%)' }} />}
                {dota && <img src="/svg/dota_logo.svg" alt="" style={{ height: '160px', transform: 'translateX(-50%) translateY(-85%)'  }} />}
                {mdf && <img src="/svg/venok.svg" alt="" style={{ height: '40px', transform: 'translateX(-50%) translateY(-620%)'}} />}
                {!load ? <>
                    <div className={styles.header}>
                        <div></div>
                    </div>
                    <div className={styles.messages}>
                        <div className={styles.enter}>
                            <img src="/svg/sckrepka.svg" style={{ height: '25px', marginTop: '7px' }} />
                            <form action="" onSubmit={(e) => message_go(e, valuemessage, ava, direction)}>
                                <input type="text" maxLength={255} name="" value={valuemessage} onChange={(e) => setvaluemessage(e.target.value)} id="" placeholder='ваше сообщение' />
                                <button type="submit" style={{ background: 'none', marginInline: '20px', transform: 'translateY(15px)', cursor: 'pointer' }}>
                                    <img src="/svg/Enter.svg" style={{ height: '25px', }} />
                                </button>
                            </form>
                        </div>
                        {data1.map((el) =>
                            <div className={user?.user_id != el.author?.id ? styles.message : styles.message_l}>
                                <div className={styles.author} onClick={() => navigate(`/profile/${el.author?.id}`)} style={user?.user_id != el.author?.id ? { backgroundImage: `url(${el.author?.ava})` } : { backgroundImage: `url(${el.author?.ava})`,transform: 'scale(-1, 1)'}}></div>
                                <div className={styles.authorfake}></div>
                                <div className={user?.user_id != el.author?.id ? styles.content_m : styles.content_m_l} style={el.is_message_org ? { background: '#ffa500' } : {}}>
                                    <p className={styles.nameauthor} onClick={() => navigate(`/profile/${el.author?.id}`)} style={el.is_message_org ? { color: '#fff' } : {}}>{el.author?.first_name} {el.author?.last_name}</p>
                                    {el.image && <div className={styles.image} style={{ backgroundImage: `url(${el.image})` }}></div>}
                                    <p style={el.is_message_org ? { color: 'whitesmoke', maxWidth: '400px', textWrap: 'wrap' } : { maxWidth: '400px', textWrap: 'wrap' }}>{el.content}</p>
                                </div>
                            </div>
                        )}
                        <div className={styles.tyman}>ааа туиан туман аааа</div>
                        {data1.length > 24 && <div className={styles.next} onClick={Searh}><img src="/svg/arrow.svg" /></div>}
                    </div>
                </> : <><div style={{ height: '800px', position: 'relative' }}> <span className="loader" id="id_00" style={{ transform: 'translateX(35px) translateY(10px)' }}>загрузка..</span> </div></>}
            </div>
        </>
    );
}

export default Content;
