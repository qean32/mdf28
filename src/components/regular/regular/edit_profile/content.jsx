import styles from './content.module.css'
import { useContext, useEffect, useState } from 'react';
import context from '../../../../connections/context';

const Content = () => {
    let { user } = useContext(context)
    const [first_name, setfirst_name] = useState('')
    const [last_name, setlast_name] = useState('')
    const [status, setstatus] = useState('')
    const [steam, setsteam] = useState('')
    const [ava, setava] = useState()
    let Searh = async () => {
        let response = await fetch(`https://mdf28server.site/api/users/search/user/?id=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setfirst_name(data.results[0]?.first_name)
        setlast_name(data.results[0]?.last_name)
        setstatus(data.results[0]?.status)
        setsteam(data.results[0]?.steam)
        setemail(data.results[0]?.email)
    }
    useEffect(() => {
        Searh()
        SearhPlayer('dota',setdota)
        SearhPlayer('cs', setcs)
        SearhPlayer('bascketball', setbascketball)
    }, [])
    const [dota,setdota] = useState(false)
    const [cs,setcs] = useState(false)
    const [bascketball,setbascketball] = useState(false)
    let SearhPlayer = async (direction,set) => {
        let response = await fetch(`https://mdf28server.site/api/${direction}/search/player/?user=${user?.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        set(data.results[0])
    }
    let up1 = async (e) => {
        e.preventDefault()
        if (ValidWord) {
        } else {
            let response = await fetch(`https://mdf28server.site/api/users/update/user/${user.user_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
                },
                body: JSON.stringify({ 'steam': steam, 'status': status, 'first_name': first_name, 'last_name': last_name })
            })
            let data = await response.json()
            up()
        }
    }
    let uppass = async (e) => {
        e.preventDefault()
        let response = await fetch(`https://mdf28server.site/api/users/change_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ old_password: oldpass, new_password: newpass })
        })
        let data = await response.json()
        if (data.detail == 'Проверьте правильность текущего пароля.') {
            setop(true)
        } else {
            setop3(true)
        }
    }
    let upemail = async (e) => {
        e.preventDefault()
        let response = await fetch(`https://mdf28server.site/api/users/change_email/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ email: email, password: pass })
        })
        let data = await response.json()
        setop4(true)
        if (data.email == 'Введите правильный адрес электронной почты.') {
            setop1(true)
        } else if (data.detail == 'Проверьте правильность текущего пароля.') {
            setop2(true)
        }
    }
    let up = async () => {
        const formData = new FormData()
        if (bck) {
            formData.append('background', bck)
        }
        if (ava) {
            formData.append('ava', ava)
        }
        let response = await fetch(`https://mdf28server.site/api/users/update/user/${user.user_id}/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: formData
        })
        let data = await response.json()
        console.log(data)
        uppleer('dota')
        uppleer('cs')
        uppleer('bascketball')
        location.reload()
    }
    const [email, setemail] = useState()
    const [bck, setbck] = useState()
    const [pass, setpass] = useState()
    const [newpass, setnewpass] = useState()
    const [oldpass, setoldpass] = useState()
    const [op, setop] = useState(false)
    const [op1, setop1] = useState(false)
    const [op3, setop3] = useState(false)
    const [op4, setop4] = useState(false)
    const [op2, setop2] = useState(false)
    let uppleer = async (direction) => {
        let response = await fetch(`https://mdf28server.site/api/${direction}/update/player_user/${user.user_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ name: first_name + " " + last_name })
        })
        let data = await response.json()
    }
    let upPleerDOTA = async (direction) => {
        let response = await fetch(`https://mdf28server.site/api/${direction}/update/player_user/${user.user_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ pts: pts, rank: rankdota })
        })
        let data = await response.json()
        location.reload()
    }
    let upPleerCS = async (direction) => {
        let response = await fetch(`https://mdf28server.site/api/${direction}/update/player_user/${user.user_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ elo: elo, rank: rankcs })
        })
        let data = await response.json()
        location.reload()
    }
    let upPleerBASKETBALL = async (direction) => {
        let response = await fetch(`https://mdf28server.site/api/${direction}/update/player_user/${user.user_id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ number: number})
        })
        let data = await response.json()
        location.reload()
    }
    const [pts, setpts] = useState(0)
    const [elo, setelo] = useState(0)
    const [number, setnumber] = useState(0)
    const [isValiddota, setisValiddota] = useState(false)
    const proverkapts = (e) => {
        if (e.target.value > 3390) {
            setisValiddota(true)
            setpts(1)
        } else {
            setisValiddota(false)
            setpts(e.target.value)
        }
    }
    const [rankdota, setrankdota] = useState(1)
    const [rankdotaim, setrankdotaim] = useState('/rank/no.png')
    const [rankcs, setrankcs] = useState(1)
    const [rankcsim, setrankcsim] = useState('/rank/1.png')
    const [isValidcs, setisValidcs] = useState(false)
    useEffect(() => {
        if (pts < 160 && pts != 0 && pts > 0) {
            setrankdotaim('/rank/r_1.png')
            setrankdota(2)
        } else if (pts > 160 && pts < 310) {
            setrankdotaim('/rank/r_2.png')
            setrankdota(3)
        } else if (pts > 310 && pts < 470) {
            setrankdotaim('/rank/r_3.png')
            setrankdota(4)
        } else if (pts > 470 && pts < 620) {
            setrankdotaim('/rank/r_4.png')
            setrankdota(5)
        } else if (pts > 620 && pts < 770) {
            setrankdotaim('/rank/r_5.png')
            setrankdota(6)
        } else if (pts > 770 && pts < 930) {
            setrankdotaim('/rank/g_1.png')
            setrankdota(7)
        } else if (pts > 930 && pts < 1100) {
            setrankdotaim('/rank/g_2.png')
            setrankdota(8)
        } else if (pts > 1100 && pts < 1240) {
            setrankdotaim('/rank/g_3.png')
            setrankdota(9)
        } else if (pts > 1240 && pts < 1390) {
            setrankdotaim('/rank/g_4.png')
            setrankdota(10)
        } else if (pts > 1390 && pts < 1540) {
            setrankdotaim('/rank/g_5.png')
            setrankdota(11)
        } else if (pts > 1540 && pts < 1700) {
            setrankdotaim('/rank/h_1.png')
            setrankdota(12)
        } else if (pts > 1700 && pts < 1850) {
            setrankdotaim('/rank/h_2.png')
            setrankdota(13)
        } else if (pts > 1850 && pts < 2000) {
            setrankdotaim('/rank/h_3.png')
            setrankdota(14)
        } else if (pts > 2000 && pts < 2160) {
            setrankdotaim('/rank/h_4.png')
            setrankdota(15)
        } else if (pts > 2160 && pts < 2310) {
            setrankdotaim('/rank/h_5.png')
            setrankdota(16)
        } else if (pts > 2310 && pts < 2470) {
            setrankdotaim('/rank/a_1.png')
            setrankdota(17)
        } else if (pts > 2470 && pts < 2620) {
            setrankdotaim('/rank/a_2.png')
            setrankdota(18)
        } else if (pts > 2620 && pts < 2780) {
            setrankdotaim('/rank/a_3.png')
            setrankdota(19)
        } else if (pts > 2780 && pts < 2930) {
            setrankdotaim('/rank/a_4.png')
            setrankdota(20)
        } else if (pts > 2930 && pts < 3080) {
            setrankdotaim('/rank/a_5.png')
            setrankdota(21)
        } else if (pts > 3080 && pts < 3240) {
            setrankdotaim('/rank/ar_1.png')
            setrankdota(22)
        } else if (pts > 3240 && pts < 3390) {
            setrankdotaim('/rank/ar_2.png')
            setrankdota(23)
        } else if (pts == 1) {
            setrankdota(1)
            setrankdotaim('/rank/no.png')
        }
    }, [pts])
    const proverkaelo = (e) => {
        if (e.target.value > 1350) {
            setelo(1)
            setisValidcs(true)
        } else {
            setisValidcs(false)
            setelo(e.target.value)
        }
    }
    useEffect(() => {
        if (elo < 0 && elo != 0 && elo > 500) {
            setrankcsim('/rank/1.png')
            setrankcs(1)
        } else if (elo > 500 && elo < 750) {
            setrankcsim('/rank/2.png')
            setrankcs(2)
        } else if (elo > 750 && elo < 900) {
            setrankcsim('/rank/3.png')
            setrankcs(3)
        } else if (elo > 900 && elo < 1050) {
            setrankcsim('/rank/4.png')
            setrankcs(4)
        } else if (elo > 1050 && elo < 1200) {
            setrankcsim('/rank/5.png')
            setrankcs(5)
        } else if (elo > 1200 && elo < 1350) {
            setrankcsim('/rank/6.png')
            setrankcs(6)
        } else if (elo == 1) {
            setrankcsim('/rank/1.png')
            setrankcs(1)
            console.log('zxc')
        }
    }, [elo])
    const validateWord = (word) => {
        if (word.trim().length <= 1 || word.match(/[a-z]/i) || word.match(/[0-9]/)) {
            return false
        } else {
            return true
        }
    }
    const [ValidWord,setValidWord] = useState(false)
    useEffect(() => {
        if (validateWord(first_name)) {
            setValidWord(false)
        } else {
            setValidWord(true)
        }
    }, [first_name])
    useEffect(() => {
        if (validateWord(last_name)) {
            setValidWord(false)
        } else {
            setValidWord(true)
        }
    }, [last_name])
    return (
        <>
            <div className={styles.content}>
                <p style={{transform: 'translateY(10px) translateX(30px)', color: '#E74343'}}>файлы не должны содержать кириллицу</p>
                {ValidWord && <p style={{transform: 'translateY(20px) translateX(30px)', color: '#E74343'}}>не используйте латиницу а имени</p>}
                <div className={styles.header}><img src="/svg/venok.svg" /></div>
                <form className={styles.form} onSubmit={(e) => up1(e)}>
                    <div className={styles.fullname}><input type="text" name="" id="" placeholder='имя' maxLength={15} onChange={(e) => setfirst_name(e.target.value)} value={first_name} /> <input onChange={(e) => setlast_name(e.target.value)}  type="text" name="" id="" placeholder='фамилия' value={last_name} /></div>
                    <div><input type="text" name="" id="" value={status} placeholder='статус' maxLength={255} onChange={(e) => setstatus(e.target.value)} /></div>
                    <div style={{ marginTop: '30px' }} >
                        <div><p style={{ transform: 'translateY(10px)' }}>аватарка</p><input type="file" accept='.png,.jpg,.jpeg.,gif' onChange={(e) => setava(e.target.files[0])} alt="" style={{ background: "none", width: '200px' }} /></div>
                        <div><p style={{ transform: 'translateY(10px)' }}>фон профиля</p><input type="file" src="" accept='.png,.jpg,.jpeg.,gif' onChange={(e) => setbck(e.target.files[0])} alt="" style={{ background: "none", width: '200px' }} /></div>
                    </div>
                    <div style={{ marginTop: '20px' }} className={styles.fullname}><input type="text" onChange={(e) => setsteam(e.target.value)} name="" maxLength={10} id="" placeholder='цифры steam' value={steam} /> <input style={{ opacity: '0', pointerEvents: 'none' }} type="text" name="" id="" placeholder='фамилия' value={last_name} /></div>
                    <div><button type="submit" className='more' style={{ width: '400px', marginTop: '20px' }}><p>Сохранить</p></button></div>
                </form>
            </div>
            {dota && <div className={styles.content} style={{ height: '220px' }}>
                <div className={styles.header}><img src="/svg/venok.svg" /></div>
                <div className={styles.mmr}>
                    <div>
                        <p style={{ marginLeft: '20px'}}>{pts}</p>
                        <input onChange={(e) => proverkapts(e)} style={{ marginLeft: '20px' }} list="tickmarks1" type="range" name="range" min="0" max="8000" step={20} />
                        <datalist id="tickmarks1">
                            <option value="1000"></option>
                            <option value="2000"></option>
                            <option value="3000"></option>
                            <option value="4000"></option>
                            <option value="5000"></option>
                            <option value="6000"></option>
                            <option value="7000"></option>
                            <option value="8000"></option>
                        </datalist>
                        <div className='more' onClick={() => upPleerDOTA('dota')}><p>изменить ранг</p></div>
                    </div>
                    <p style={isValiddota ? { transform: 'translateX(20px)', opacity: '1', position: "absolute", top: '80px', color: 'red', pointerEvents: 'none' } : { transform: 'translateX(20px)', opacity: '0', position: "absolute", top: '60px', color: 'red', pointerEvents: 'none' }}>обратитесь к администрации для получания ранга выше 6</p>
                    <div  className={styles.rank} style={{ backgroundImage: `url(${rankdotaim})` ,position: 'absolute', right: '40px',top:'100px'}}></div>
                </div>
            </div>}
            {cs && <div className={styles.content} style={{ height: '220px' }}>
                <div className={styles.header}><img src="/svg/venok.svg" /></div>
                <div className={styles.mmr}>
                    <div>
                        <p style={{ marginLeft: '20px'}}>{elo}</p>
                        <input onChange={(e) => proverkaelo(e)} style={{ marginLeft: '20px' }} list="tickmarks2" type="range" name="range" min="0" max="2000" step={20} />
                        <datalist id="tickmarks2">
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
                        <div className='more' onClick={() => upPleerCS('cs')}><p>изменить ранг</p></div>
                    </div>
                    <p style={isValidcs ? { transform: 'translateX(20px)', opacity: '1', position: "absolute", top: '80px', color: 'red', pointerEvents: 'none' } : { transform: 'translateX(20px)', opacity: '0', position: "absolute", top: '60px', color: 'red', pointerEvents: 'none' }}>обратитесь к администрации для получания ранга выше 6</p>
                    <div  className={styles.rank} style={{ backgroundImage: `url(${rankcsim})` ,position: 'absolute', right: '40px',top:'100px' ,height: '60px',width: '60px'}}></div>
                </div>
            </div>}
            {bascketball && <div className={styles.content} style={{ height: '220px' }}>
                <div className={styles.header}><img src="/svg/venok.svg" /></div>
                <div>
                    <input style={{ marginLeft: '20px' }} list="tickmarks3" onChange={(e) => setnumber(e.target.value)} type="range" name="range" min="0" max="99" step={1} />
                    <datalist id="tickmarks3">
                        <option value="0"></option>
                        <option value="51"></option>
                        <option value="99"></option>
                    </datalist>
                    <div className='more' onClick={() => upPleerBASKETBALL('bascketball')}><p>изменить номер</p></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', right: '42px',top:'100px' }}>
                    <img src="/svg/form_bascketball.svg" alt="" style={{ height: '80px' }} />
                    <p style={{ color: 'whitesmoke', fontSize: '25px', position: 'absolute', marginTop: '20px' }}>{number}</p>
                </div>
            </div>}
            <div className={styles.content} style={{ height: '345px' }}>
                <div className={styles.header}><img src="/svg/venok.svg" /></div>
                <form className={styles.form} onSubmit={(e) => upemail(e)}>
                    <p style={{ marginLeft: '105px' }}>изменить почту</p>
                    <div className={styles.fullname}><input type="text" name="" id="" placeholder='почта' onChange={(e) => setemail(e.target.value)} maxLength={25} value={email} /> <input maxLength={15} onChange={(e) => setpass(e.target.value)} type="password" name="" id="" placeholder='пароль' value={pass} /></div>
                    <p style={op2 ? { marginLeft: '105px', opacity: '1' } : { marginLeft: '105px', opacity: '0' }}>неверный пароль</p>
                    <p style={op4 ? { marginLeft: '105px', opacity: '1' } : { marginLeft: '105px', opacity: '0' }}>отправленно</p>
                    <p style={op1 ? { marginLeft: '105px', opacity: '1' } : { marginLeft: '105px', opacity: '0' }}>некоректная почта</p>
                    <div><button type="submit" className='more' style={{ width: '400px', marginTop: '20px' }}><p>Сохранить</p></button></div>
                </form>
            </div>
            <div className={styles.content} style={{ height: '315px' }}>
                <div className={styles.header}><img src="/svg/venok.svg" /></div>
                <form className={styles.form} onSubmit={(e) => uppass(e)}>
                    <p style={{ marginLeft: '105px' }}>изменить пароль</p>
                    <div className={styles.fullname}><input type="password" name="" id="" placeholder='старый пароль' maxLength={15} onChange={(e) => setoldpass(e.target.value)} value={oldpass} /> <input maxLength={15} onChange={(e) => setnewpass(e.target.value)} type="password" name="" id="" placeholder='новый пароль' value={newpass} /></div>
                    <p style={op ? { marginLeft: '105px', opacity: '1' } : { marginLeft: '105px', opacity: '0' }}>неверный пароль</p>
                    <p style={op3 ? { marginLeft: '105px', opacity: '1' } : { marginLeft: '105px', opacity: '0' }}>отправленно</p>
                    <div><button type="submit" className='more' style={{ width: '400px', marginTop: '20px' }}><p>Сохранить</p></button></div>
                </form>
            </div>
            <div style={{ height: '80px' }}></div>
        </>
    );
}

export default Content;