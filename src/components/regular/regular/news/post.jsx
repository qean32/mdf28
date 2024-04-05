import styles from './content.module.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../../../../connections/context';

const Post = ({ id, author, image, content, created_at, isV }) => {
    const navigate = useNavigate();
    const [isView, setView] = useState(false)
    const [coment, setcoment] = useState([])
    const [valuecoment, setvaluecoment] = useState('')
    const [ava, setAva] = useState('')
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
    let SearhUser = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/users/search/user/?id=${user?.user_id}`, {
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
    let SearhNews = async () => {
        let response = await fetch(`https://mdf28server.site/api/news/search/coment/?post=${id}&limit=40&offset=0`, {
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
    let Searhulike = async (id) => {
        if (id) {
            let response = await fetch(`https://mdf28server.site/api/news/search/like/?author=${user?.user_id}&postt=${id}`, {
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
    }
    let Searhucom = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/news/search/coment/?author=${user?.user_id}&post=${id}`, {
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
    let Searhlike = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/news/search/like/?postt=${id}&limit=299&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        setlikes(data.results?.length)
        Searhulike()
    }
    let like_reg = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/news/reg/like/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ 'author': user?.user_id, 'postt': id })
        })
        let data = await response.json()
        Searhulike(id)
    }
    let like_delete = async (idlike) => {
        console.log(idlike)
        let response = await fetch(`https://mdf28server.site/api/news/update/like/${idlike}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
        })
        let data = await response.json()
    }
    const likeHandler = (id, idlike) => {
        if (like) {
            like_delete(idlike)
            setlike(false)
            setlikes(likes - 1)
        } else {
            like_reg(id)
            setlike(true)
            setlikes(likes + 1)
        }
    }
    useEffect(() => {
        if (content) {
            SearhNews()
            Searhulike(id)
            Searhlike(id)
            Searhucom(id)
        }
        }, [content])
    const coment_reg = async (e) => {
        e.preventDefault()
        setload1(true)
        setTimeout(() => {
            setload1(false)
        }, 400);
        if (valuecoment.length > 0) {
            let response = await fetch('https://mdf28server.site/api/news/reg/coment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
                },
                body: JSON.stringify({ 'author': ava.id, 'content': valuecoment, 'post': id })
            })
            let data = await response.json()
            setcoment([data,...coment])
            setvaluecoment('')
            location.reload()
        }
    }
    const [classes, setclasses] = useState({ overflow: 'hidden', maxHeight: '0', transition: '1s' })
    const [classes1, setclasses1] = useState({ overflow: 'hidden', maxHeight: '0', transition: '.5s' })

    return (
        <div key={id}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div>
                        <div className={styles.ava} onClick={() => navigate(`/profile/${author?.id}`)} style={{ backgroundImage: `url(${author?.ava})` }}></div>
                    </div>
                    <div className={styles.text}>
                        <p className={styles.author} onClick={() => navigate(`/profile/${author?.id}`)}>{author?.first_name} {author?.last_name}</p>
                        {image && <img src={image} />}
                        <div><p>{content}</p></div>
                    </div>
                    <div className={styles.date}>
                        <div><p>{created_at}</p></div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.value}>
                        {isV === false && <div onClick={() => likeHandler(id, idlike)} className={like ? styles.placeon : styles.place}><p className={like && styles.color}>{likes}</p>{like == false && <img src="/svg/like.svg" />}{like && <img src="/svg/like_e7.svg" />}</div>}
                        {isV === false && <div onClick={vieww} className={comentu ? styles.placeon : styles.place}><p className={comentu && styles.color}>{coments}</p>{comentu && <img src="/svg/coment_e7.svg" />}{comentu == false && <img src="/svg/coment.svg" />}</div>}
                    </div>
                </div>
                <div style={classes}>
                    {load1 ?
                        <div style={{ height: '120px', position: 'relative' }}> <span className="loader" id="id_00" style={{ transform: 'translateX(2px) translateY(-10px)' }}>загрузка..</span> </div> : <>{coment.length > 0 && coment.map((com) =>
                        (<div className={styles.coment}>
                            <div className={styles.sodCom}>
                                <p className={styles.nameAut} onClick={() => navigate(`/profile/${com.author?.id}`)}>{com.author?.first_name} {com.author?.last_name} <span>{com.created_at}</span></p>
                                <div className={styles.ava_com} style={{ backgroundImage: `url(${com.author?.ava})` }} onClick={() => navigate(`/profile/${com.author?.id}`)}></div>
                                <p className={styles.comContent}>{com.content}</p>
                            </div>
                        </div>))}</>}
                </div>
                <div style={classes1}>
                    <div className={styles.comInput}>
                        <form action="" style={{ display: 'flex' }} onSubmit={(e) => coment_reg(e)}>
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