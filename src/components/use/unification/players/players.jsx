import { useEffect, useState } from 'react'
import styles from './players.module.css'
import { useNavigate } from 'react-router-dom';
import Player from './player';

const Players = ({host, direction, str_direction, style_}) => {
    const [info, setInfo] = useState([])
    const [search_value, setsearch_value] = useState('')
    const [load, setload] = useState(true)
    const [load1, setload1] = useState(false)
    const [link, setlink] = useState(`${host}/api/unification/search/player/${str_direction}/?limit=16&offset=0`)
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
            setInfo([...info, ...data.results])
            setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        if (fetchind) {
            Searh()
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
    let SearhPlayer = async () => {
        let response = await fetch(`${host}/api/unification/search/player/${str_direction}/?search=${search_value}&limit=14&offset=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setInfo([...data.results])
        console.log(data)
    }
    useEffect(() => {
        if (search_value.length <= 0) {
            let SearhPlayer_ = async () => {
                let response = await fetch(`${host}/api/unification/search/player/${str_direction}/?limit=16&offset=0`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                let data = await response.json()
                setInfo([...data.results])
            }
            SearhPlayer_()
        } else if (search_value.length >= 2) {
            SearhPlayer(search_value)
        }
    }, [search_value])
    const ChangeHandler = (e) => {
        setsearch_value(e.target.value)
        setload1(true)
        setTimeout(() => {
            setload1(false)
        }, 300);
    }
    return (
        <>
            <div className={styles.content}>
                <div className={styles.headerr}>
                    <div>
                        <input type='text' onChange={ChangeHandler} value={search_value} className={styles.Input} placeholder='найти игрока' maxLength={255} /><img id={styles.id_1} src='/svg/lupa.svg' />
                    </div>
                </div>
                <div>
                    <div className={styles.panel}>
                    </div>
                    <div>
                        {load1 ? <span className="loader" id="id_00" style={{ transform: 'translateX(22px)' }}>загрузка..</span> : <>{info && info.map((el) => <Player style_={style_} key={el.id} el={el} />)}</>}
                    </div>
                    {load == false && <p style={{ position: 'static', margin: '20px', marginLeft: '220px', marginBottom: '20px' }}>записи закончились...</p>}
                </div>
            </div>
        </>
    );
}

export default Players;