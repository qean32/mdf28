import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const context = createContext("пользователь");

export default context

export const Context_A = ({ children }) => {
    const navigate = useNavigate();
    let [user, setUser] = useState(() => localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null)
    let [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            if (token) {
                updateUser()
            }
        }, 290000)
        return () => clearInterval(interval)
    }, [loading, token])

    let loginUser = async (e) => {
        e.preventDefault();
        let response = await fetch('http://qean32.beget.tech/api/users/token/access', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email_open.value, 'password': e.target.pass_open.value })
        })
        let data = await response.json()
        console.log(response)
        console.log(data)
        if (response.status == 200) {
            setToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('token', JSON.stringify(data))
            navigate('/');
        } else {
            alert('что то пошло не так')
        }
    }

    const updateUser = async (e) => {
        let response = await fetch('http://qean32.beget.tech/api/users/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': token.refresh })
        })
        let data = await response.json()
        console.log(response)
        console.log(data)
        if (response.status == 200) {
            setToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('token', JSON.stringify(data))
        } else {
            alert('что то пошло не так( возможно, это произошло потому что ,вы открыли вторую вкладку.')
        }
    }

    let ContextData = {
        user: user,
        loginUser: loginUser,
        setToken: setToken,
        setUser: setUser,
        token: token,
    }

    return (<context.Provider value={ContextData}>{children}</context.Provider>)
};

