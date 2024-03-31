import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Content = () => {
    let { id } = useParams()
    const navigate = useNavigate();
    const [folows, setfolows] = useState([])
    const [folowsy, setfolowsy] = useState([])
    let Search = async () => {
        let response = await fetch(`http://qean32.beget.tech/api/users/search/follow/?for_r=${id}&limit=99`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setfolows(data.results)
    }
    let Searchy = async () => {
        let response = await fetch(`http://qean32.beget.tech/api/users/search/follow/?by=${id}&limit=99`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setfolowsy(data.results)
    }
    useEffect(() => {
        Search()
        Searchy()
    }, [])
    const [zxc, setzxc] = useState(false)
    useEffect(() => {
        console.log(folows.length)
        console.log(folowsy.length)
        if (folows.length == 0 && folowsy.length == 0) {
            setzxc(true)
            console.log('zxc')
        }
    }, [folows, folowsy])
    return (
        <>
            <div style={zxc ? {} : { display: 'flex' }}>
                {folows.length != 0 ? <div className={styles.content}>
                    <p>подписки</p>
                    <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate(`/profile/${id}`)} />
                    {folows && folows.map((el) => (<div className={styles.info_el} onClick={() => navigate(`/profile/${el.by.id}`)}><div style={{ backgroundImage: `url(${el.by.ava})` }} className={styles.ava}></div><p>{el.by.first_name} {el.by.last_name} {el.by.smail && <div style={{ backgroundImage: `url(${el.by.smail?.image})` }} className={styles.smail}></div>}
                        {el.by.team_sap && <div style={{ backgroundImage: `url(${el.by.team_sap?.image})` }} className={styles.smail}></div>}</p></div>))}
                </div> : <div><img className={styles.img} src="https://vplate.ru/images/article/orig/2019/04/interesnye-fakty-o-koshkah-i-kotah-40.jpg" alt="" /><p>у бро нет друзей</p></div>}

                {folowsy.length != 0 ? <div className={styles.content}>
                    <p>подписчики</p>
                    {folowsy && folowsy.map((el) => (<div className={styles.info_el} onClick={() => navigate(`/profile/${el.for_r.id}`)}><div style={{ backgroundImage: `url(${el.for_r.ava})` }} className={styles.ava}></div><p>{el.for_r.first_name} {el.for_r.last_name} {el.for_r.smail && <div style={{ backgroundImage: `url(${el.for_r.smail?.image})` }} className={styles.smail}></div>}
                        {el.for_r.team_sap && <div style={{ backgroundImage: `url(${el.for_r.team_sap?.image})` }} className={styles.smail}></div>}</p></div>))}
                </div> : <div><img className={styles.img} src="https://vplate.ru/images/article/orig/2019/04/interesnye-fakty-o-koshkah-i-kotah-40.jpg" alt="" /><p>у бро нет друзей</p></div>}
            </div>
        </>
    );
}

export default Content;