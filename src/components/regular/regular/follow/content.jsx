import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Content = () => {
    let host = 'https://mdf28server.site'
    let { id } = useParams()
    const navigate = useNavigate();
    const [follows, setfollows] = useState([])
    const [followsUser, setfollowsUser] = useState([])
    let Search = async () => {
        let response = await fetch(`${host}/api/users/search/follow/?for_r=${id}&limit=99`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setfollows(data.results)
    }
    let SearchUser = async () => {
        let response = await fetch(`${host}/api/users/search/follow/?by=${id}&limit=99`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setfollowsUser(data.results)
    }
    useEffect(() => {
        Search()
        SearchUser()
    }, [])
    const [zxc, setzxc] = useState(false)
    useEffect(() => {
        if (follows.length == 0 && followsUser.length == 0) {
            setzxc(true)
        }
    }, [follows, followsUser])
    return (
        <>
            <div style={zxc ? {} : { display: 'flex' }}>
                {follows.length != 0 ? <div className={styles.content}>
                    <p>подписки</p>
                    <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate(`/profile/${id}`)} />
                    {follows && follows.map((el) => (<div className={styles.info_el} onClick={() => navigate(`/profile/${el.by.id}`)}><div style={{ backgroundImage: `url(${el.by.ava})` }} className={styles.ava}></div><p>{el.by.first_name} {el.by.last_name} {el.by.smail && <div style={{ backgroundImage: `url(${el.by.smail?.image})` }} className={styles.smail}></div>}
                        {el.by.team_sap && <div style={{ backgroundImage: `url(${el.by.team_sap?.image})` }} className={styles.smail}></div>}</p></div>))}
                </div> : <div><img className={styles.img} src="https://vplate.ru/images/article/orig/2019/04/interesnye-fakty-o-koshkah-i-kotah-40.jpg" alt="" /><p>у бро нет друзей</p></div>}

                {followsUser.length != 0 ? <div className={styles.content}>
                    <p>подписчики</p>
                    {followsUser && followsUser.map((el) => (<div className={styles.info_el} onClick={() => navigate(`/profile/${el.for_r.id}`)}><div style={{ backgroundImage: `url(${el.for_r.ava})` }} className={styles.ava}></div><p>{el.for_r.first_name} {el.for_r.last_name} {el.for_r.smail && <div style={{ backgroundImage: `url(${el.for_r.smail?.image})` }} className={styles.smail}></div>}
                        {el.for_r.team_sap && <div style={{ backgroundImage: `url(${el.for_r.team_sap?.image})` }} className={styles.smail}></div>}</p></div>))}
                </div> : <div><img className={styles.img} src="https://vplate.ru/images/article/orig/2019/04/interesnye-fakty-o-koshkah-i-kotah-40.jpg" alt="" /><p>у бро нет друзей</p></div>}
            </div>
        </>
    );
}

export default Content;