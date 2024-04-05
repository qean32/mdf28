import { useEffect, useState } from 'react'
import styles from './cash.module.css'

const Content = () => {
    const [data1, setdata1] = useState([])
    const [cash, setcash] = useState([])
    const [link, setlink] = useState('https://mdf28server.site/api/cash/search/cash/?limit=16&offset=0')
    const [fetchind, setfetchind] = useState(true)
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
            setfetchind(false)
        }
    }
    let Searh1 = async () => {
        let response = await fetch('https://mdf28server.site/api/cash/search/list_cash/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setcash(data.results[0])
    }
    const scrollHendler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setfetchind(true)
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollHendler)
        return function () {
            document.removeEventListener('scroll', scrollHendler)
        }
    }, [])
    useEffect(() => {
        if (fetchind) {
            Searh()
        }
        Searh1()
    }, [fetchind])
    return (
        <>
            <div className={styles.content}>
                <div className={styles.header}>
                    <div>
                        <p style={{ width: "90px", paddingLeft: '5px' }}>{cash?.price}$</p>
                        <p style={{ width: "415px" }}>история расхода</p>
                        <p style={{ width: '107px' }}>дата <img src="/svg/calendar.svg" style={{ height: '14px', transform: 'translateY(2px)' }} /></p>
                        <p>направление</p>
                    </div>
                </div>
                <div className={styles.all}>
                    <div className={styles.line} style={{ left: '90px', top: '10px' }}></div>
                    <div className={styles.line} style={{ right: '115px', top: '10px' }}></div>
                    <div className={styles.line} style={{ right: '230px', top: '10px' }}></div>
                    {data1.map((el) => <div className={styles.cash}><p style={{ width: "90px" }}>{el.price}$</p><p style={{ width: "415px" }}>{el.content}</p><p style={{ width: '110px', fontSize: '16px' }}>{el.created_at}</p><p style={{ width: '60px' }}>{el.direction?.direction_name}</p></div>)}
                </div>
            </div>
        </>
    );
}

export default Content;
