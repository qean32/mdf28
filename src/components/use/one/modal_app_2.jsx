import { useContext, useEffect, useState } from 'react';
import context from '../../../connections/context';

const Content_modal_app_2 = ({ of }) => {

    let { user } = useContext(context)
    const [view, setview] = useState(false)
    const [isDOTA, setisDOTA] = useState(false)
    const [isCS, setisCS] = useState(true)
    const [isBASCKETBALL, setisBASCKETBALL] = useState(true)
    const [search, setsearch] = useState('dota')
    const [ava, setAva] = useState('')
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
    useEffect(() => {
        SearhUser()
    }, [])
    const DOTA = () => {
        setisBASCKETBALL(true)
        setisCS(true)
        setisDOTA(false)
        setsearch('dota')
    }
    const BASCKETBALL = () => {
        setisBASCKETBALL(false)
        setisCS(true)
        setisDOTA(true)
        setsearch('bascketball')
    }
    const CS = () => {
        setisBASCKETBALL(true)
        setisCS(false)
        setisDOTA(true)
        setsearch('cs2')
    }
    return (
        <>
            {view ? <div className='full' style={{ justifyContent: 'start', alignItems: 'start', flexDirection: 'column' }}>
                <img src="/svg/krestik.svg" onClick={of} className='krestik' />
                <img src="/svg/sckull.svg" id="id_102" />
                <img src="/svg/dota_logo.svg" id="id_104" onClick={DOTA} className={isDOTA && 'opacity05'} style={{ top: '43%', right: '25%', height: '50px', cursor: 'pointer', transition: '.5s' }} />
                <img src="/svg/cs.png" id="id_104" onClick={CS} className={isCS && 'opacity05'} style={{ top: '45%', right: '10%', height: '46px', cursor: 'pointer', transition: '.5s' }} />
                <img src="/svg/bascketball_logo.svg" onClick={BASCKETBALL} className={isBASCKETBALL && 'opacity05'} id="id_104" style={{ top: '55%', right: '20%', height: '50px', cursor: 'pointer', transition: '.5s' }} />
                <div className='app_'>
                    <div className='app__'>
                        <p>{ava && <p>{ava.first_name} {ava.last_name}</p>}</p>{ava.smail && <div style={{ backgroundImage: `url(${ava.smail?.image})` }} className='smail'></div>}{ava.team_sap && <div style={{ backgroundImage: `url(${ava.team_sap?.image})` }} className='smail'></div>}
                    </div>
                    <p style={{ fontSize: "18px", marginTop: '100px' }}>изменения отобразятся в вашем профиле</p>
                    <div className='more'> <p> сохранить </p></div>
                </div>
                <div className='app_'>
                    <input type='text' className='Input' placeholder='найти команду' maxLength={255} /><img src="/svg/Enter.svg" style={{ height: '20px', position: 'absolute', right: '41.5%', marginTop: '17px', cursor: 'pointer' }} />
                </div>
            </div> : <span className='loader'>загрузка..</span>}
        </>
    )
}

export default Content_modal_app_2;