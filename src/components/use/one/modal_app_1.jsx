import { useContext, useEffect, useState } from 'react';
import context from '../../../connections/context';

const Content_modal_app_1 = ({ of }) => {

    let { user } = useContext(context)
    const [view, setview] = useState(false)
    const [ava, setAva] = useState('')
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 300)
    }, [])
    const [bck, setbck] = useState()
    let SearhUser = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/users/search_short/user/?id=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setAva(data.results[0])
        setbck(data.results[0].smail?.image)
    }
    useEffect(() => {
        SearhUser()
    }, [])
    const [ids, setids] = useState()
    let no = async (id, ids) => {
        let response = await fetch(`https://mdf28server.site/api/users/update/user/${id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ 'smail': ids })
        })
        let data = await response.json()
        setsave(true)
    }
    useEffect(() => {
        switch (ids) {
            case 1:
                setbck('/png/HEROES-OF-MIGHT-AND-MAGIC-III-3-HD-PL-KLUCZ-STEAM-Rodzaj-wydania-Podstawa.jpg')
                break;
            case 3:
                setbck('/png/image.png)')
                break;
            case 4:
                setbck('/png/111.png')
                break;
            case 5:
                setbck('/png/AEahGvADEs8.jpg')
                break;
            case 2:
                setbck('/png/7ee0ab7ecc3e45d_68L6xn0.png')
                break;
            case 6:
                setbck('/png/channels4_profile.jpg')
                break;
            case 7:
                setbck('/png/Jade_Reckoning_Rolling_Boulder_icon.jpg')
                break;
            case 8:
                setbck('/png/ball.png')
                break;
            case 9:
                setbck('/png/Z7CRRY7WyOk.jpg')
                break;
            case 10:
                setbck('/png/f112a5f1501b41e5d224a9a1969ba946.jpeg')
                break;
        }
    }, [ids])
    const [save, setsave] = useState(false)
    return (
        <>
            {view ? <div className='full' style={{ justifyContent: 'start', alignItems: 'start', flexDirection: 'column' }}>
                <img src="/svg/krestik.svg" onClick={of} className='krestik' />
                <img src="/svg/sckull.svg" id="id_102" />
                <div className='app_'>
                    <div className='app__'>
                        <p>{ava && <p>{ava.first_name} {ava.last_name}</p>}</p><div style={{ backgroundImage: `url(${bck})` }} className='smail'></div>{ava.team_sap && <div style={{ backgroundImage: `url(${ava.team_sap?.image})` }} className='smail'></div>}
                    </div>
                    <p style={{ fontSize: "18px", marginTop: '100px' }}>изменения отобразятся в вашем профиле</p>
                    <div className='more' onClick={() => no(ava.id, ids)}> <p> сохранить </p></div>
                    {save && <p style={{ position: 'absolute', right: '140px' }}>сохраненно</p>}
                </div>
                <div className='app_'>
                    <div style={{ display: 'flex' }}>
                        <div className='smaill_' onClick={() => setids(1)} style={{ backgroundImage: `url(/png/HEROES-OF-MIGHT-AND-MAGIC-III-3-HD-PL-KLUCZ-STEAM-Rodzaj-wydania-Podstawa.jpg)` }}></div>
                        <div className='smaill_' onClick={() => setids(2)} style={{ backgroundImage: `url(/png/7ee0ab7ecc3e45d_68L6xn0.png)` }}></div>
                        <div className='smaill_' onClick={() => setids(3)} style={{ backgroundImage: `url(/png/image.png)` }}></div>
                        <div className='smaill_' onClick={() => setids(4)} style={{ backgroundImage: `url(/png/111.png)` }}></div>
                        <div className='smaill_' onClick={() => setids(5)} style={{ backgroundImage: `url(/png/AEahGvADEs8.jpg)` }}></div>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className='smaill_' onClick={() => setids(6)} style={{ backgroundImage: `url(/png/channels4_profile.jpg)` }}></div>
                        <div className='smaill_' onClick={() => setids(7)} style={{ backgroundImage: `url(/png/Jade_Reckoning_Rolling_Boulder_icon.jpg)` }}></div>
                        <div className='smaill_' onClick={() => setids(8)} style={{ backgroundImage: `url(/png/ball.png)` }}></div>
                        <div className='smaill_' onClick={() => setids(9)} style={{ backgroundImage: `url(/png/Z7CRRY7WyOk.jpg)` }}></div>
                        <div className='smaill_' onClick={() => setids(10)} style={{ backgroundImage: `url(/png/f112a5f1501b41e5d224a9a1969ba946.jpeg)` }}></div>
                    </div>
                </div>
            </div> : <span className='loader'>загрузка..</span>}
        </>
    )
}

export default Content_modal_app_1;