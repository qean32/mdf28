import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../connections/context';

const Header = () => {
    let {user, host} = useContext(context)
    const navigate = useNavigate ();
    const [ava,setAva] = useState('')
    let SearhUser = async () => {
        let response = await fetch(`${host}/api/users/search/user/?id=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setAva(data.results[0])
    }
    useEffect(() => {
        if (user) {
            SearhUser()
        }
    }, [])
    const [notifications, setnotifications] = useState([])
    let SearchOffers = async () => {
        let response = await fetch(`${host}/api/unification/search/offers_short/?user=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
        })
        let data = await response.json()
        if (data.results.length > 0) {
            setnotifications([...data.results, ...notifications])
        }
    }
    const [notifications_, setnotifications_] = useState([])
    useEffect(() => {
        if (notifications) {
            setnotifications_(notifications.filter((el) => el.is_view == false))
        }
    }, [notifications])

    useEffect(() => {
        SearchOffers()
        const interval = setInterval(() => {
            if (user) {
                SearchOffers()
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [])


    return ( 
        <header className="header">
            <div className="header_content_place">
                <div className="header_content_place_left">
                    <img src="/svg/venok.svg" onClick={() => navigate('/')} id="img_id_1"/>
                    {/* <img src="/svg/menu.svg" onClick={() => navigate(`/LEHAAAA`)}/> */}
                    {notifications_.length > 0 ? <img src="/svg/notifications.svg" alt="" style={{height: '21px', marginTop: '1px'}} onClick={() => navigate(`/offers`)}/> : <img src="/svg/un_notifications.svg" alt="" style={{height: '21px', marginTop: '1px'}} onClick={() => navigate(`/offers`)}/>}
                </div>
                <div className="header_content_place_right">
                {user ? <p onClick={() => navigate(`/profile/${user.user_id}`)}>{ava?.first_name} {ava?.last_name}</p> : <p onClick={() => navigate('/login')}>войти</p>}
                <div className="ava" style={{backgroundImage: `url(${ava?.ava})`}} onClick={() => navigate(`/profile/${user.user_id}`)}></div>
                </div>
            </div>
        </header>
     );
}
 
export default Header;