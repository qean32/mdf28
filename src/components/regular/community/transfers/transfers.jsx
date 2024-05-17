import { useEffect, useState } from 'react'
import styles from './transfers.module.css'
import { useNavigate } from 'react-router-dom'

const Transfers_ = ({host}) => {
    const navigate = useNavigate();
    const [transfers, settransfers] = useState([])
    const [load, setload] = useState(true)
    const [link, setlink] = useState(`${host}/api/transfers/search/?limit=16&offset=0`)
    let SearhTransfers = async () => {
        if (link) {
            let response = await fetch(link, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            let data = await response.json()
            settransfers([...transfers, ...data.results])
            setlink(data.next)
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        SearhTransfers()
    }, [])
    const [fetchind, setfetchind] = useState(false)
    useEffect(() => {
        if (fetchind) {
            SearhTransfers()
            setfetchind(false)
        }
    }, [fetchind])
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
    return (
        <>
            <div className={styles.content}>
                <img src='/svg/venok.svg' id={styles.id_1} />
                <div>
                    {transfers && transfers.map((el) => (<div key={el.id} className={styles.transfers_el}><p onClick={() => navigate(`/profile/${el.user?.id}`)}>{el.user?.first_name} {el.user?.last_name} <span>{el.script?.content}</span> {el.team?.name ? el.team?.name : 'команда удалена*'}</p><div className={styles.date}><p>{el.date_crate}</p></div></div>))}
                    {!load && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Transfers_;