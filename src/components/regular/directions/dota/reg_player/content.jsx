import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../../../connections/context';

const Content = () => {
    let host = 'https://mdf28server.site'
    let direction = 'dota'
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
    let regHandler = async () => {
        let response = await fetch(`${host}/api/${direction}/reg/player/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ user: user.user_id, name: ava.first_name + ' ' + ava.last_name, pts: pts, rank: rankid })
        })
        let data = await response.json()
        console.log(data)
        if (user?.user_id) {
             navigate(`/profile/${user.user_id}`)
            }
            
    }
    let SearchPlayer = async () => {
        let response = await fetch(`https://api.opendota.com/api/players/${steam}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        setid_(true)
        console.log(data.rank_tier)
        let zxc = String(data.rank_tier)
        if (zxc[0] == "1") {
            console.log('r')
            if (zxc[1] == '1') {
                setrankid(2)
                setrank('/rank/r_1.png')
                setpts(50)
            } else if (zxc[1] == '2') {
                setrankid(3)
                setrank('/rank/r_2.png')
                setpts(150)
            } else if (zxc[1] == '3') {
                setrankid(4)
                setrank('/rank/r_3.png')
                setpts(350)
            } else if (zxc[1] == '4') {
                setrankid(5)
                setpts(500)
                setrank('/rank/r_4.png')
            } else if (zxc[1] == '5') {
                setrankid(6)
                setpts(650)
                setrank('/rank/r_5.png')
            }
        } else if (zxc[0] == '2') {
            console.log('g')
            if (zxc[1] == '1') {
                setrankid(7)
                setpts(800)
                setrank('/rank/g_1.png')
            } else if (zxc[1] == '2') {
                setpts(1000)
                setrankid(8)
                setrank('/rank/g_2.png')
            } else if (zxc[1] == '3') {
                setpts(1100)
                setrankid(9)
                setrank('/rank/g_3.png')
            } else if (zxc[1] == '4') {
                setpts(1300)
                setrankid(10)
                setrank('/rank/g_4.png')
            } else if (zxc[1] == '5') {
                setrankid(11)
                setpts(1400)
                setrank('/rank/g_5.png')
            }
        } else if (zxc[0] == '3') {
            console.log('h')
            if (zxc[1] == '1') {
                setpts(1600)
                setrankid(12)
                setrank('/rank/h_1.png')
            } else if (zxc[1] == '2') {
                setrankid(13)
                setpts(1750)
                setrank('/rank/h_2.png')
            } else if (zxc[1] == '3') {
                setpts(1900)
                setrankid(14)
                setrank('/rank/h_3.png')
            } else if (zxc[1] == '4') {
                setpts(2050)
                setrankid(15)
                setrank('/rank/h_4.png')
            } else if (zxc[1] == '5') {
                setrankid(16)
                setpts(2200)
                setrank('/rank/h_5.png')
            }
        } else if (zxc[0] == '4') {
            console.log('a')
            if (zxc[1] == '1') {
                setrankid(17)
                setpts(2400)
                setrank('/rank/a_1.png')
            } else if (zxc[1] == '2') {
                setrankid(18)
                setpts(2500)
                setrank('/rank/a_2.png')
            } else if (zxc[1] == '3') {
                setpts(2700)
                setrankid(19)
                setrank('/rank/a_3.png')
            } else if (zxc[1] == '4') {
                setrankid(20)
                setpts(2800)
                setrank('/rank/a_4.png')
            } else if (zxc[1] == '5') {
                setrankid(21)
                setpts(3000)
                setrank('/rank/a_5.png')
            }
        } else if (zxc[0] == '5') {
            console.log('l')
            if (zxc[1] == '1') {
                setpts(3100)
                setrankid(22)
                setrank('/rank/ar_1.png')
            } else if (zxc[1] == '2') {
                setrankid(23)
                setpts(3200)
                setrank('/rank/ar_2.png')
            } else if (zxc[1] == '3') {
                setpts(3400)
                setrankid(24)
                setrank('/rank/ar_3.png')
            } else if (zxc[1] == '4') {
                setrankid(25)
                setpts(3600)
                setrank('/rank/ar_4.png')
            } else if (zxc[1] == '5') {
                setrankid(26)
                setpts(3700)
                setrank('/rank/ar_5.png')
            }
        } else if (zxc[0] == '6') {
            console.log('v')
            if (zxc[1] == '1') {
                setrankid(27)
                setpts(3900)
                setrank('/rank/v_1.png')
            } else if (zxc[1] == '2') {
                setrankid(28)
                setpts(4100)
                setrank('/rank/v_2.png')
            } else if (zxc[1] == '3') {
                setrankid(29)
                setpts(4200)
                setrank('/rank/v_3.png')
            } else if (zxc[1] == '4') {
                setpts(4300)
                setrankid(30)
                setrank('/rank/v_4.png')
            } else if (zxc[1] == '5') {
                setpts(4360)
                setrankid(31)
                setrank('/rank/v_5.png')
            }
        } else if (zxc[0] == '7') {
            console.log('d')
            if (zxc[1] == '1') {
                setrankid(32)
                setpts(4660)
                setrank('/rank/d_1.png')
            } else if (zxc[1] == '2') {
                setrankid(33)
                setpts(4900)
                setrank('/rank/d_2.png')
            } else if (zxc[1] == '3') {
                setrankid(34)
                setpts(5050)
                setrank('/rank/d_3.png')
            } else if (zxc[1] == '4') {
                setrankid(35)
                setpts(5300)
                setrank('/rank/d_4.png')
            } else if (zxc[1] == '5') {
                setrankid(36)
                setpts(5500)
                setrank('/rank/d_5.png')
            }
        } else if (Number(zxc) > 75) {
            setrankid(37)
            setrank('/rank/titan.png')
            setpts(6000)
        } else {
            setpts(10)
            setrankid(1)
            setrank('/rank/no.png')
        }
    }

    const [rankid, setrankid] = useState(1)
    const [steam, setsteam] = useState()
    const [id_, setid_] = useState(false)
    const proverka = (e) => {
        if (e.target.value > 3390) {
            setisValid(false)
            setpts(1)
        } else {
            setisValid(true)
            setpts(e.target.value)
        }
    }
    useEffect(() => {
        if (pts < 160 && pts != 0 && pts > 0) {
            setrank('/rank/r_1.png')
            setrankid(2)
        } else if (pts > 160 && pts < 310) {
            setrank('/rank/r_2.png')
            setrankid(3)
        } else if (pts > 310 && pts < 470) {
            setrank('/rank/r_3.png')
            setrankid(4)
        } else if (pts > 470 && pts < 620) {
            setrank('/rank/r_4.png')
            setrankid(5)
        } else if (pts > 620 && pts < 770) {
            setrank('/rank/r_5.png')
            setrankid(6)
        } else if (pts > 770 && pts < 930) {
            setrank('/rank/g_1.png')
            setrankid(7)
        } else if (pts > 930 && pts < 1100) {
            setrank('/rank/g_2.png')
            setrankid(8)
        } else if (pts > 1100 && pts < 1240) {
            setrank('/rank/g_3.png')
            setrankid(9)
        } else if (pts > 1240 && pts < 1390) {
            setrank('/rank/g_4.png')
            setrankid(10)
        } else if (pts > 1390 && pts < 1540) {
            setrank('/rank/g_5.png')
            setrankid(11)
        } else if (pts > 1540 && pts < 1700) {
            setrank('/rank/h_1.png')
            setrankid(12)
        } else if (pts > 1700 && pts < 1850) {
            setrank('/rank/h_2.png')
            setrankid(13)
        } else if (pts > 1850 && pts < 2000) {
            setrank('/rank/h_3.png')
            setrankid(14)
        } else if (pts > 2000 && pts < 2160) {
            setrank('/rank/h_4.png')
            setrankid(15)
        } else if (pts > 2160 && pts < 2310) {
            setrank('/rank/h_5.png')
            setrankid(16)
        } else if (pts > 2310 && pts < 2470) {
            setrank('/rank/a_1.png')
            setrankid(17)
        } else if (pts > 2470 && pts < 2620) {
            setrank('/rank/a_2.png')
            setrankid(18)
        } else if (pts > 2620 && pts < 2780) {
            setrank('/rank/a_3.png')
            setrankid(19)
        } else if (pts > 2780 && pts < 2930) {
            setrank('/rank/a_4.png')
            setrankid(20)
        } else if (pts > 2930 && pts < 3080) {
            setrank('/rank/a_5.png')
            setrankid(21)
        } else if (pts > 3080 && pts < 3240) {
            setrank('/rank/ar_1.png')
            setrankid(22)
        } else if (pts > 3240 && pts < 3390) {
            setrank('/rank/ar_2.png')
            setrankid(23)
        } else if (pts > 3390) {
            setrankid(1)
            setrank('/rank/no.png')
        }
    }, [pts])
    const [no_r, setno_r] = useState(false)
    return (
        <>
            {view ? <> <div className={styles.content}>
                <div className={styles.header}></div>
                <div className={styles.mmr}>
                    <div>
                        <input className={styles.input} type="number" placeholder='steam id' value={steam} onChange={(e) => setsteam(e.target.value)} />
                        <div className='more' onClick={() => SearchPlayer()}><p>готово</p></div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {id_ && <div className='more' style={{ marginTop: '30px' }} onClick={() => regHandler()}><p>стать игроком</p></div>}
                            {id_ && <div className='more' style={{ marginTop: '30px', width: '370px' }} onClick={() => setno_r(true)}><p>мне не выдали ранг/выдали не верный</p></div>}
                        </div>
                    </div>
                    <div className={styles.rank} style={{ backgroundImage: `url(${rank})` }}></div>
                </div>
            </div>
                {no_r && <div className={styles.content}>
                    <div className={styles.header}></div>
                    <div className={styles.mmr}>
                        <div>
                            <p style={{ marginLeft: '20px', marginTop: '20px', marginBottom: '20px' }}>{pts}</p>
                            <input style={{ marginLeft: '20px' }} list="tickmarks" type="range" name="range" min="0" max="8000" onChange={proverka} step={20} />
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
                            {/* <div className='more' onClick={() => regHandler()}><p>стать игроком</p></div> */}
                        </div>
                        <p style={!isValid ? { transform: 'translateX(20px)', opacity: '1', position: "absolute", top: '80px', color: 'red', pointerEvents: 'none' } : { transform: 'translateX(20px)', opacity: '0', position: "absolute", top: '60px', color: 'red', pointerEvents: 'none' }}>обратитесь к администрации для получания ранга выше Легенды 2</p>
                        {/* <div className={styles.rank} style={{ backgroundImage: `url(${rank})` }}></div> */}
                    </div>
                </div>}
                <div className={styles.content} style={{ width: '750px' }}>
                    <img src="/png/steam_id.png" style={{ height: '500px', borderRadius: '15px' }} alt="" />
                </div>
            </>
                : <span className='loader'>загрузка..</span>}
        </>
    );
}

export default Content;