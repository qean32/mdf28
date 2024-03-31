import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../../../connections/context';

const Content_modal_pts_dota = ({of_modal}) => {
    const navigate = useNavigate()
    let {user} = useContext(context)
    const [view, setview] = useState(false)
    const [ava,setAva] = useState('')
    const [pts,setpts] = useState()
    const [rank,setrank] = useState('/rank/no.png')
    const [isValid,setisValid] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 300)
    }, [])
    let SearhUser = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/users/search_short/?id=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setAva(data.results[0])
    }
    let reg = async () => {
        let response = await fetch(`https://mdf28server.site/api/dota/reg/player/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({user: ava.id, name: ava.full_name, pts: pts, rank: ranki})
        })
        let data = await response.json()
        navigate(`/profile/${ava.id}`)
    }
    useEffect(() => {
        SearhUser()
    }, [])
    const proverka = (e) => {
        if (pts > 10000) {
            setisValid(false)
        } else 
        setisValid(true)
        setpts(e.target.value)
    }
    const [ranki,setranki] = useState(1)
    useEffect(() => {
        if (pts < 160 && pts != 0 && pts > 0) {
            setrank('/rank/r_1.png')
            setranki(2)
            setop(false)
        } else if (pts > 160 && pts < 310) {
            setrank('/rank/r_2.png')
            setop(false)
            setranki(3)
        } else if (pts > 310 && pts < 470) {
            setrank('/rank/r_3.png')
            setop(false)
            setranki(4)
        } else if (pts > 470 && pts < 620) {
            setrank('/rank/r_4.png')
            setop(false)
            setranki(5)
        } else if (pts > 620 && pts < 770) {
            setrank('/rank/r_5.png')
            setop(false)
            setranki(6)
        } else if (pts > 770 && pts < 930) {
            setrank('/rank/g_1.png')
            setop(false)
            setranki(6)
        } else if (pts > 930 && pts < 1100) {
            setrank('/rank/g_2.png')
            setop(false)
            setranki(7)
        } else if (pts > 1100 && pts < 1240) {
            setrank('/rank/g_3.png')
            setop(false)
            setranki(8)
        } else if (pts > 1240 && pts < 1390) {
            setrank('/rank/g_4.png')
            setop(false)
            setranki(9)
        } else if (pts > 1390 && pts < 1540) {
            setrank('/rank/g_5.png')
            setop(false)
            setranki(10)
        } else if (pts > 1540 && pts < 1700) {
            setrank('/rank/h_1.png')
            setop(false)
            setranki(11)
        } else if (pts > 1700 && pts < 1850) {
            setrank('/rank/h_2.png')
            setop(false)
            setranki(12)
        } else if (pts > 1850 && pts < 2000) {
            setrank('/rank/h_3.png')
            setop(false)
            setranki(13)
        } else if (pts > 2000 && pts < 2160) {
            setrank('/rank/h_4.png')
            setop(false)
            setranki(14)
        } else if (pts > 2160 && pts < 2310) {
            setrank('/rank/h_5.png')
            setop(false)
            setranki(15)
        } else if (pts > 2310 && pts < 2470) {
            setrank('/rank/a_1.png')
            setop(false)
            setranki(16)
        } else if (pts > 2470 && pts < 2620) {
            setrank('/rank/a_2.png')
            setop(false)
            setranki(17)
        } else if (pts > 2620 && pts < 2780) {
            setrank('/rank/a_3.png')
            setop(false)
            setranki(18)
        } else if (pts > 2780 && pts < 2930) {
            setrank('/rank/a_4.png')
            setop(false)
            setranki(19)
        } else if (pts > 2930 && pts < 3080) {
            setrank('/rank/a_5.png')
            setop(false)
            setranki(20)
        } else if (pts > 3080 && pts < 3240) {
            setrank('/rank/ar_1.png')
            setop(false)
            setranki(21)
        } else if (pts > 3240 && pts < 3390) {
            setrank('/rank/ar_2.png')
            setop(false)
            setranki(22)
        } else if (pts > 3390) {
            console.log(pts)
            setranki(1)
            setrank('/rank/no.png')
            setop(true)
        }
    }, [pts])
    const [op,setop] = useState(false)
    return (
        <>
        {view ? <div className='full' style={{justifyContent: 'start',alignItems: 'start', flexDirection:'column' ,background:''}}>
                <img src="/svg/krestik.svg" onClick={of_modal} className='krestik' />
                <img src='/svg/dota_logo.svg' style={{position:'absolute', right:'46px',top:'30px', height:'85px'}}/>
                <div className='mmr'>
                <input type="number" placeholder='mmr' className='numb' max={8000} value={pts} onChange={proverka}/>
                <p style={isValid ? {color: 'red', fontSize:'16px',marginTop:'25px',opacity:'0'} : {color: 'red', fontSize:'16px',marginTop:'25px', opacity:'1'}}>не корректный mmr</p>
                <p style={op ? {opacity:'1',position:"absolute",top:'0',color:'red',pointerEvents:'none'} : { opacity:'0',position:"absolute",top:'0',color:'red',pointerEvents:'none'}}>обратитесь к администрации для получания ранга выше Легенды-2</p>
                <div className='rank' style={{backgroundImage: `url(${rank})`}}></div>
                <div className='agetDD' onClick={() => reg()}><p>стать игроком</p></div>
                </div>
            </div> : <span className='loader'>загрузка..</span>}
        </>
        )
}

export default Content_modal_pts_dota;