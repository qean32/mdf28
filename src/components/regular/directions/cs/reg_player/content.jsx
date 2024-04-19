import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../../../connections/context';

const Content = () => {
    const navigate = useNavigate()
    let { user } = useContext(context)
    const [view, setview] = useState(false)
    const [ava, setAva] = useState('')
    const [pts, setpts] = useState(20)
    const [rank, setrank] = useState('/rank/1.png')
    const [ranki, setranki] = useState(1)
    const [isValid, setisValid] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 300)
    }, [])
    let SearhUser = async () => {
        let response = await fetch(`https://mdf28server.site/api/users/search_short/user/?id=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setAva(data.results[0])
    }
    let regHandler = async () => {
        let response = await fetch(`https://mdf28server.site/api/cs/reg/player/`, {
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
        if (e.target.value > 1350) {
            setisValid(true)
            setpts(1)
        } else {
            setisValid(false)
            setpts(e.target.value)
        }
    }
    useEffect(() => {
        if (pts < 0 && pts != 0 && pts > 500) {
            setrank('/rank/1.png')
            setranki(1)
        } else if (pts > 500 && pts < 750) {
            setrank('/rank/2.png')
            setranki(2)
        } else if (pts > 750 && pts < 900) {
            setrank('/rank/3.png')
            setranki(3)
        } else if (pts > 900 && pts < 1050) {
            setrank('/rank/4.png')
            setranki(4)
        } else if (pts > 1050 && pts < 1200) {
            setrank('/rank/5.png')
            setranki(5)
        } else if (pts > 1200 && pts < 1350) {
            setrank('/rank/6.png')
            setranki(6)
        } else if (pts == 1) {
            setrank('/rank/1.png')
            setranki(1)
        }
    }, [pts])
    return (
        <>
            {view ? <div className={styles.content}>
                <div className={styles.header}></div>
                <div className={styles.mmr}>
                    <div>
                        <p style={{marginLeft:'20px',marginTop:'20px',marginBottom:'20px'}}>{pts}</p>
                        <input style={{marginLeft:'20px'}} list="tickmarks" type="range" name="range" min="20" max="2010" onChange={proverka} step={20} />
                        <datalist id="tickmarks">
                            <option value="20"></option>
                            <option value="200"></option>
                            <option value="400"></option>
                            <option value="600"></option>
                            <option value="800"></option>
                            <option value="1000"></option>
                            <option value="1200"></option>
                            <option value="1400"></option>
                            <option value="1600"></option>
                            <option value="1800"></option>
                            <option value="2000"></option>
                        </datalist>
                        <div className='more' onClick={() => regHandler()}><p>стать игроком</p></div>
                    </div>
                    <p style={isValid ? { transform: 'translateX(20px)', opacity: '1', position: "absolute", top: '80px', color: 'red', pointerEvents: 'none' } : { transform: 'translateX(20px)', opacity: '0', position: "absolute", top: '60px', color: 'red', pointerEvents: 'none' }}>обратитесь к администрации для получания ранга выше 6</p>
                    <div className={styles.rank} style={{ backgroundImage: `url(${rank})`,height: '45px', width: '45px' }}></div>
                </div>
            </div> : <span className='loader'>загрузка..</span>}
        </>
    );
}

export default Content;