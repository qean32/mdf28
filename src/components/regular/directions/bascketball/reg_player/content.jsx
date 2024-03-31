import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../../../connections/context';

const Content = () => {
    const navigate = useNavigate()
    let { user } = useContext(context)
    const [view, setview] = useState(false)
    const [ava, setAva] = useState('')
    const [pts, setpts] = useState(1)
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
        let response = await fetch(`http://qean32.beget.tech/api/bascketball/reg/player/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ user: ava.id, name: ava.first_name + ' ' + ava.last_name, pts: pts, number: pts })
        })
        let data = await response.json()
        navigate(`/profile/${ava.id}`)
    }
    useEffect(() => {
        SearhUser()
    }, [])
    return (
        <>
            {view ? <div className={styles.content}>
                <div className={styles.header}><img src="/svg/venok.svg" /></div>
                <div className={styles.mmr}>
                    <div>
                        <input style={{marginLeft:'20px'}} list="tickmarks" onChange={(e) => setpts(e.target.value)} type="range" name="range" min="0" max="99" step={1} />
                        <datalist id="tickmarks">
                            <option value="0"></option>
                            <option value="51"></option>
                            <option value="99"></option>
                        </datalist>
                        <div className='more' onClick={() => regHandler()}><p>стать игроком</p></div>
                    </div>
                    <p style={!isValid ? { transform: 'translateX(20px)', opacity: '1', position: "absolute", top: '80px', color: 'red', pointerEvents: 'none' } : { transform: 'translateX(20px)', opacity: '0', position: "absolute", top: '60px', color: 'red', pointerEvents: 'none' }}>обратитесь к администрации для получания ранга выше 6</p>
                    <div style={{display:'flex', justifyContent: 'center', alignItems: 'center',position: 'absolute', right: '40px'}}>
                    <img src="/svg/form_bascketball.svg" alt="" style={{height: '90px'}}/>
                    <p style={{color: 'whitesmoke', fontSize: '25px', position:'absolute', marginTop: '20px'}}>{pts}</p>
                    </div>
                </div>
            </div> : <span className='loader'>загрузка..</span>}
        </>
    );
}

export default Content;