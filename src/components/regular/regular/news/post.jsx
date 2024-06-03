import styles from './news.module.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../../../../connections/context';

const Post = ({ el, host }) => {
    const navigate = useNavigate();
    const [isView, setView] = useState(false)
    const [coment, setcoment] = useState([])
    const [valuecoment, setvaluecoment] = useState('')
    const [user_, setuser_] = useState('')
    const [load1, setload1] = useState(false)
    let { user } = useContext(context)
    const vieww = () => {
        if (isView) {
            setView(false)
            setclasses({ overflow: 'hidden', transition: '1s', maxHeight: '0' })
            setclasses1({ overflow: 'hidden', transition: '.5s', maxHeight: `0px` })

        } else {
            setclasses({ overflow: 'hidden', transition: '1s', maxHeight: `${(coment.length * 60) + 1}px` })
            setclasses1({ overflow: 'hidden', transition: '.5s', maxHeight: `90px` })
            setView(true)
        }
    }
    let SearhUser = async () => {
        let response = await fetch(`${host}/api/users/search/user/?id=${user?.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setuser_(data.results[0])
    }
    useEffect(() => {
        if (user) {
            SearhUser()
        }
    }, [])
    let SearhComent = async () => {
        let response = await fetch(`${host}/api/news/search/coment/?post=${el.id}&limit=40&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        setcoment([...data.results])
        setcoments(data.results.length)
    }
    const [like, setlike] = useState(false)
    const [comentu, setcomentu] = useState(false)
    const [likes, setlikes] = useState(0)
    const [coments, setcoments] = useState(0)
    const [idlike, setidlike] = useState()
    let SearhyouLike = async () => {
        let response = await fetch(`${host}/api/news/search/like/?author=${user?.user_id}&post=${el.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        if (data?.results[0]?.id) {
            setidlike(data.results[0]?.id)
        }
        if (data.results?.length != 0) {
            setlike(true)
        }
    }
    let SearhyouComent = async () => {
        let response = await fetch(`${host}/api/news/search/coment/?author=${user?.user_id}&post=${el.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        if (data.results?.length > 0) {
            setcomentu(true)
        }
    }
    let SearhLike = async () => {
        let response = await fetch(`${host}/api/news/search/like/?post=${el.id}&limit=299&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        setlikes(data.results?.length)
    }
    let RegistrationLike = async () => {
        let response = await fetch(`${host}/api/news/reg/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ 'author': user?.user_id, 'post': el.id })
        })
        let data = await response.json()
        SearhyouLike()
    }
    let DeleteLike = async () => {
        let response = await fetch(`${host}/api/news/update/like/${idlike}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
        })
        let data = await response.json()
    }
    const LikeHandler = () => {
        if (like) {
            DeleteLike(idlike)
            setlike(false)
            setlikes(likes - 1)
        } else {
            RegistrationLike()
            setlike(true)
            setlikes(likes + 1)
        }
    }
    useEffect(() => {
        if (el.content) {
            SearhComent()
            SearhLike()
            if (user) {
                SearhyouLike()
                SearhyouComent()
            }
        }
    }, [el.content])
    const RegistrationComent = async (e) => {
        setload1(true)
        setTimeout(() => {
            setload1(false)
        }, 400);
        if (valuecoment.length > 0) {
            let response = await fetch(`${host}/api/news/reg/coment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
                },
                body: JSON.stringify({ 'author': user_.id, 'content': valuecoment, 'post': el.id })
            })
            let data = await response.json()
            let newComent = data
            newComent.author = { ava: user_.ava, first_name: user_.first_name }
            setcoment(prew => [...prew, newComent])
            setvaluecoment('')
            location.reload()
        }
    }
    const [classes, setclasses] = useState({ overflow: 'hidden', maxHeight: '0', transition: '1s' })
    const [classes1, setclasses1] = useState({ overflow: 'hidden', maxHeight: '0', transition: '.5s' })
    return (
        <div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div>
                        <div className={styles.ava} onClick={() => navigate(`/profile/${el.author?.id}`)} style={{ backgroundImage: `url(${el.author?.ava})` }}></div>
                    </div>
                    <div className={styles.text}>
                        <p className={styles.author} onClick={() => navigate(`/profile/${el.author?.id}`)}>{el.author?.first_name} {el.author?.last_name}</p>
                        {el.image && <img src={el.image} />}
                        <div><p dangerouslySetInnerHTML={{ __html: el.content }}></p></div>
                    </div>
                    <div className={styles.date}>
                        <div><p>{el.created_at}</p></div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.value}>
                        <div onClick={() => LikeHandler()} className={like ? styles.placeon : styles.place}><p className={like ? styles.color : ''}>{likes}</p>{like == false && <img src="/svg/like.svg" />}{like && <img src="/svg/like_e7.svg" />}</div>
                        <div onClick={vieww} className={comentu ? styles.placeon : styles.place}><p className={comentu ? styles.color : ''}>{coments}</p>{comentu && <img src="/svg/coment_e7.svg" />}{comentu == false && <img src="/svg/coment.svg" />}</div>
                    </div>
                </div>
                <div style={classes}>
                    {load1 ?
                        <div style={{ height: '120px', position: 'relative' }}> <span className="loader" id="id_00" style={{ transform: 'translateX(2px) translateY(-10px)' }}>загрузка..</span> </div> : <>{coment.length > 0 && coment.map((el) =>
                            <div key={el.id} className={styles.coment}>
                                <div className={styles.sodCom}>
                                    <p className={styles.nameAut} onClick={() => navigate(`/profile/${el.author?.id}`)}>{el.author?.first_name} {el.author?.last_name} <span>{el.created_at}</span></p>
                                    <div className={styles.ava_com} style={{ backgroundImage: `url(${el.author?.ava})` }} onClick={() => navigate(`/profile/${el.author?.id}`)}></div>
                                    <p className={styles.comContent}>{el.content}</p>
                                </div>
                            </div>)}</>}
                </div>
                <div style={classes1}>
                    <div className={styles.comInput}>
                        <form action="" style={{ display: 'flex' }} onSubmit={(e) => RegistrationComent(e)}>
                            <input type='text' className={styles.Input} placeholder='ваш коментарий' maxLength={255} style={{ transform: 'translateY(-25px) translateX(20px)' }} onChange={(e) => setvaluecoment(e.target.value)} value={valuecoment} />
                            <button type='submit'>
                                <img src="/svg/Enter.svg" id={styles.id_1} />
                            </button>
                        </form></div>
                </div>
            </div>
        </div>
    );
}

export default Post;