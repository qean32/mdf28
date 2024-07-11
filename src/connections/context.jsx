import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from 'react-router-dom';

const context = createContext("пользователь");

export default context

export const Context_A = ({ children }) => {
    let host = 'http://127.0.0.1:8000'
    // http://127.0.0.1:8000 
    // https://mdf28server.site

    const navigate = useNavigate();
    const [loading, setloading] = useState(true)
    let [user, setUser] = useState(() => localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null)
    let [token, setToken] = useState(() => localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null)
    let location_ = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            if (token) {
                updateUser()
            }
        }, 210000)
        return () => clearInterval(interval)
    }, [loading, token])

    let style_ = {
        height: '45px',
        width: '45px',
        margin: '5px',
        marginTop: '8px'
    }

    let loginUser = async (e) => {
        e.preventDefault();
        let response = await fetch(`${host}/api/users/token/access`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': e.target.email_open.value, 'password': e.target.pass_open.value })
        })
        let data = await response.json()
        if (response.status == 200 || response.status == 201) {
            setToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('token', JSON.stringify(data))
            navigate('/');
        } else {
            alert('что то пошло не так')
        }
    }

    const updateUser = async () => {
        if (user) {
            let response = await fetch(`${host}/api/users/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'refresh': token.refresh })
            })
            let data = await response.json()
            if (response.status == 200 || response.status == 201) {
                setToken(data)
                setUser(jwtDecode(data.access))
                localStorage.setItem('token', JSON.stringify(data))
            } else {
                // alert('ОШИБКА ТОКЕНА ПЕРЕЗАЙДИТЕ В ПРОФИЛЬ')
                location.reload()
            }
        }
    }

    const [viewShadow, setviewShadow] = useState(false)
    const [viewModal, setviewModal] = useState(false)

    let propsStyle = {
        width: '680px',
        height: '255px',
    }
    let propsStyle_ = {
        display: 'flex',
        width: '97%',
        height: '92%',
        flexDiraction: 'row',
    }

    const OfModal = () => {
        setviewModal(false)
        setviewShadow(false)
    }

    const RunModal = () => {
        setviewModal(true)
        setviewShadow(true)
    }
    let techwork = true
    
    if (techwork) {
        navigate('techwork')
    }

    let [view, setview] = useState(false)

    useEffect(() => {
        setview(false)
        OfModal()
        updateUser()
        if (techwork) {
            navigate('techwork')
        }
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [location_])
    updateUser()

    let TitleFUnction = (title_) => {
        useEffect(() => {
            document.title = title_;
        }, [])
    }

    const ValidateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{,3}\.[0-9]{,3}\.[0-9]{,3}\.[0-9]{,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    const ValidatePass = (pass) => {
        if (pass.trim().length > 6) {
            if (pass.match(/[0-9]/))
                return true
        } else {
            return false
        }
    }
    const ValidateWord = (word) => {
        if (word.trim().length < 1 || word.match(/[a-z]/i) || word.match(/[0-9]/)) {
            return false
        } else {
            return true
        }
    }

    let ContextData = {
        ValidateEmail: ValidateEmail,
        ValidatePass: ValidatePass,
        ValidateWord: ValidateWord,

        viewShadow: viewShadow,
        viewModal: viewModal,
        view: view,
        propsStyle: propsStyle,
        propsStyle_: propsStyle_,
        RunModal: RunModal,
        OfModal: OfModal,
        host: host,
        setviewShadow: setviewShadow,
        setviewModal: setviewModal,
        style_: style_,
        techwork: techwork,
        TitleFUnction: TitleFUnction,

        user: user,
        token: token,
        setToken: setToken,
        setUser: setUser,
        loginUser: loginUser,
    }

    return (<context.Provider value={ContextData}>{children}</context.Provider>)
};

