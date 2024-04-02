import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../connections/context';

const Header = () => {
    
    let {user} = useContext(context)
    const navigate = useNavigate ();
    const [ava,setAva] = useState('')
    let SearhUser = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/users/search/user/?id=${user.user_id}`, {
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
    return ( 
        <header className="header">
            <div className="header_content_place">
                <div className="header_content_place_left">
                    <img src="/mdf28/svg/menu.svg" onClick={() => navigate(`/LEHAAAAAAAAAAA`)}/>
                    <img src="/mdf28/svg/venok.svg" onClick={() => navigate('/')} id="img_id_1"/>
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