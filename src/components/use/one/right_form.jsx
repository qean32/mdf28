import context from '../../../connections/context';
import { useContext, useEffect, useState } from 'react';

const Right_panel_cash = () => {
    let { user } = useContext(context)
    
    const [value, setvalue] = useState()
    const [content, setcontent] = useState()
    const [direction, setdirection] = useState()
    const [cash, setcash] = useState()
    let cashHandler = async () => {
        let response = await fetch(`http://qean32.beget.tech/api/cash/reg/cash/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ 'author': user.user_id, 'price': value, 'content': content, 'direction': direction })
        })
        let data = await response.json()
        let num = Number(value)
        let response1 = await fetch(`http://qean32.beget.tech/api/cash/update/list_cash/1/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`
            },
            body: JSON.stringify({ price: (cash + num) })
        })
        let data1 = await response1.json()
    }
    let Search = async () => {
        let response = await fetch(`http://qean32.beget.tech/api/cash/search/list_cash/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let data = await response.json()
        setcash(data.results[0]?.price)
    }
    useEffect(() => {
        Search()
    }, [])
    return (
        <>
            {user?.is_org && <div>
                <form onSubmit={() => cashHandler()} style={{ width: '100px', transform: 'translateX(70px) translateY(15px)' }}>
                    <input onChange={(e) => setcontent(e.target.value)} type="text" name="kyda" id="" style={{ width: '120px', background: 'whitesmoke' }} placeholder="куда" />
                    <input onChange={(e) => setvalue(e.target.value)} type="number" name="" id="" style={{ width: '120px', background: 'whitesmoke' }} placeholder="сколько" />
                    <input onChange={(e) => setdirection(e.target.value)} type="number" name="zxc" id="" style={{ width: '120px', background: 'whitesmoke' }} placeholder="ид направ" />
                    <input type="submit" value="отправить" style={{ width: '170px', background: 'whitesmoke' }} />
                </form>
            </div>}
        </>
    );
}

export default Right_panel_cash;