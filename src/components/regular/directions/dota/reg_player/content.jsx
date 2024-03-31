import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../../../connections/context';

const Content = () => {
    const navigate = useNavigate()
    let { user } = useContext(context)
    const [view, setview] = useState(false)
    const [ava, setAva] = useState('')
    const [pts, setpts] = useState(0)
    const [rank, setrank] = useState('/rank/no.png')
    const [isValid, setisValid] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 300)
    }, [])
    let SearhUser = async () => {
        let response = await fetch(`http://qean32.beget.tech/api/users/search_short/user/?id=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setAva(data.results[0])
    }
    let regHandler = async () => {
        let response = await fetch(`http://qean32.beget.tech/api/dota/reg/player/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ user: ava.id, name: ava.first_name + ' ' + ava.last_name, pts: pts, rank: ranki })
        })
        let data = await response.json()
        navigate(`/profile/${ava.id}`)
    }
    useEffect(() => {
        SearhUser()
    }, [])
    const proverka = (e) => {
        if (e.target.value > 3390) {
            setisValid(false)
            setpts(1)
        } else {
            setisValid(true)
            setpts(e.target.value)
        }
    }
    const [ranki, setranki] = useState(1)
    useEffect(() => {
        if (pts < 160 && pts != 0 && pts > 0) {
            setrank('/rank/r_1.png')
            setranki(2)
        } else if (pts > 160 && pts < 310) {
            setrank('/rank/r_2.png')
            setranki(3)
        } else if (pts > 310 && pts < 470) {
            setrank('/rank/r_3.png')
            setranki(4)
        } else if (pts > 470 && pts < 620) {
            setrank('/rank/r_4.png')
            setranki(5)
        } else if (pts > 620 && pts < 770) {
            setrank('/rank/r_5.png')
            setranki(6)
        } else if (pts > 770 && pts < 930) {
            setrank('/rank/g_1.png')
            setranki(7)
        } else if (pts > 930 && pts < 1100) {
            setrank('/rank/g_2.png')
            setranki(8)
        } else if (pts > 1100 && pts < 1240) {
            setrank('/rank/g_3.png')
            setranki(9)
        } else if (pts > 1240 && pts < 1390) {
            setrank('/rank/g_4.png')
            setranki(10)
        } else if (pts > 1390 && pts < 1540) {
            setrank('/rank/g_5.png')
            setranki(11)
        } else if (pts > 1540 && pts < 1700) {
            setrank('/rank/h_1.png')
            setranki(12)
        } else if (pts > 1700 && pts < 1850) {
            setrank('/rank/h_2.png')
            setranki(13)
        } else if (pts > 1850 && pts < 2000) {
            setrank('/rank/h_3.png')
            setranki(14)
        } else if (pts > 2000 && pts < 2160) {
            setrank('/rank/h_4.png')
            setranki(15)
        } else if (pts > 2160 && pts < 2310) {
            setrank('/rank/h_5.png')
            setranki(16)
        } else if (pts > 2310 && pts < 2470) {
            setrank('/rank/a_1.png')
            setranki(17)
        } else if (pts > 2470 && pts < 2620) {
            setrank('/rank/a_2.png')
            setranki(18)
        } else if (pts > 2620 && pts < 2780) {
            setrank('/rank/a_3.png')
            setranki(19)
        } else if (pts > 2780 && pts < 2930) {
            setrank('/rank/a_4.png')
            setranki(20)
        } else if (pts > 2930 && pts < 3080) {
            setrank('/rank/a_5.png')
            setranki(21)
        } else if (pts > 3080 && pts < 3240) {
            setrank('/rank/ar_1.png')
            setranki(22)
        } else if (pts > 3240 && pts < 3390) {
            setrank('/rank/ar_2.png')
            setranki(23)
        } else if (pts > 3390) {
            setranki(1)
            setrank('/rank/no.png')
        }
    }, [pts])
    return (
        <>
            {view ? <div className={styles.content}>
                <div className={styles.header}><img src="/svg/venok.svg" /></div>
                <div className={styles.mmr}>
                    <div>
                        <p style={{marginLeft:'20px',marginTop:'20px',marginBottom:'20px'}}>{pts}</p>
                        <input style={{marginLeft:'20px'}} list="tickmarks" type="range" name="range" min="0" max="8000" onChange={proverka} step={20} />
                        <datalist id="tickmarks">
                            <option value="1000"></option>
                            <option value="2000"></option>
                            <option value="3000"></option>
                            <option value="4000"></option>
                            <option value="5000"></option>
                            <option value="6000"></option>
                            <option value="7000"></option>
                            <option value="8000"></option>
                        </datalist>
                        <div className='more' onClick={() => regHandler()}><p>стать игроком</p></div>
                    </div>
                    <p style={!isValid ? { transform: 'translateX(20px)', opacity: '1', position: "absolute", top: '80px', color: 'red', pointerEvents: 'none' } : { transform: 'translateX(20px)', opacity: '0', position: "absolute", top: '60px', color: 'red', pointerEvents: 'none' }}>обратитесь к администрации для получания ранга выше Легенды 2</p>
                    <div className={styles.rank} style={{ backgroundImage: `url(${rank})` }}></div>
                </div>
            </div> : <span className='loader'>загрузка..</span>}
        </>
    );
}

export default Content;