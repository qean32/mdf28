import styles from './content.module.css'
import { useEffect, useState, useContext } from 'react';
import Input_pass from '../../../use/meny/input_pass';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import context from '../../../../connections/context';


const Content_modal_login = ({ of_modal, pass_reg, email_reg, name_reg, last_name_reg, }) => {
    const { setToken, setUser } = useContext(context)
    const navigate = useNavigate();

    let loginUser = async () => {
        console.log("ОТРАБОТАЛ ЛОГИН В ЛОГИН")
        let response = await fetch('https://mdf28server.site/api/users/token/access/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'email': email_reg, 'password': pass_reg_2 })
        })
        let data = await response.json()
        if (response.status) {
            setToken(data)
            setUser(jwtDecode(data.access))
            localStorage.setItem('token', JSON.stringify(data))
        } else {
            alert('что то пошло не так')
        }
    }
    const Create_user = async () => {
        if (validatePass(pass_reg) == false) {
            alert('используйте числа и цифры в пароле - минимальная длинна - 8')
        } else if (validateEmail(email_reg) == false) {
            alert('не корректная почта')
        } else if (validateWord(last_name_reg) == false || validateWord(name_reg) == false) {
            alert('не корректно введены имя или фамилия')
        } else if (pass_reg != pass_reg_2) {
            alert('пароли не совпадают')
        } else if (checkk == false) {
            alert('вы не согласились с пользовательским соглашением')
        } else {
            let response = await fetch('https://mdf28server.site/api/users/reg/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'first_name': name_reg, 'last_name': last_name_reg, 'password': pass_reg_2, 'email': email_reg })
            })
            if (response.status == 200 || response.status == 201) {
                loginUser()
                navigate('/');

            } else {
                alert(
                    'что то пошло не так, возможно, пользователь с такой почтой уже существует'
                    )
                }
                let data = await response.json()
                console.log(data)
                console.log(response)
        }
    }
    const [viewPass7class, setviewPass7class] = useState('viewPass viewPass_go')
    const [viewPass7class_open, setviewPass7class_open] = useState('viewPass')
    const [viewPass7, setviewPass7] = useState(false)
    const [line7, setline7] = useState(false)
    const [line7class, setline7class] = useState('lineColor')
    const [pass_reg_2, setpass_reg_2] = useState('')
    const [defP7class, setdefP7class] = useState('defP')
    const [validtext7, setvalidtext7] = useState({ color: '#4F8C00' })
    const [validline7, setvalidline7] = useState({})
    const [isValid7, setisValid7] = useState(true)
    const [isValid7class, setisValid7class] = useState({ opacity: '0' })
    const [aget, setaget] = useState({
        transform: 'translateY(70px) translateX(12px)'
    })
    const [check, setcheck] = useState({
        opacity: '0',
        zIndex: '1'
    })
    const [checkno, setcheckno] = useState({
        opacity: '1',
        zIndex: '2'
    })
    const [checkk, setcheckk] = useState(false)
    useEffect(() => {
        if (viewPass7) {
            setviewPass7class('viewPass'),
                setviewPass7class_open('viewPass viewPass_go')
        } else {
            setviewPass7class('viewPass viewPass_go'),
                setviewPass7class_open('viewPass')
        }
    }, [viewPass7])
    const goPass7 = () => {
        if (viewPass7) {
            setviewPass7(false)
        } else {
            setviewPass7(true)
        }
    }
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }
    const validatePass = (pass) => {
        if (pass.trim().length > 6) {
            if (pass.match(/[0-9]/))
                return true
        } else {
            return false
        }
    }
    const validateWord = (word) => {
        if (word.trim().length <= 1 || word.match(/[a-z]/i) || word.match(/[0-9]/)) {
            return false
        } else {
            return true
        }
    }
    const proverka7 = (e) => {
        setpass_reg_2(e.target.value);
        if (pass_reg_2.length != 0) {
            setline7(true)
        } else {
            setline7(false)
        }
        if (validatePass(pass_reg_2)) {
            setisValid7(true)
        } else {
            setisValid7(false)
        }
    }
    useEffect(() => {
        if (isValid7) {
            setisValid7class({ opacity: '0' }),
                setvalidtext7({ color: '#4F8C00' }),
                setvalidline7({ background: '#4F8C00' })
        } else {
            setisValid7class({ opacity: '1' }),
                setvalidtext7({ color: '#7D7D7D' }),
                setvalidline7({ background: '#7D7D7D' })
        }
    }, [isValid7])
    useEffect(() => {
        if (line7) {
            setline7class('lineColor lineColor_go')
            setdefP7class('defP defP_go')
        } else {
            setline7class('lineColor')
            setdefP7class('defP')
        }
    }, [line7])
    const go_check = () => {
        setcheck({
            opacity: '1'
        })
        setcheckno({
            opacity: '0'
        })
        setcheckk(true)
    }
    const nogo_check = () => {
        setcheckno({
            opacity: '1'
        })
        setcheck({
            opacity: '0'
        })
        setcheckk(false)
    }
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 300)
    }, [])
    return (
        <>
            {view ? <div className={styles.content_modal}>
                <img src="/svg/krestik.svg" className={styles.krestik} onClick={of_modal} />
                <img src="/svg/scull.svg" style={{height: '120px'}}/>
                <Input_pass isValidclass={isValid7class} goPass={goPass7} viewPassclass_open={viewPass7class_open} viewPassclass={viewPass7class} proverka={proverka7} setline={setline7} viewPass={viewPass7} value={pass_reg_2} validtext={validtext7} defPclass={defP7class} lineclass={line7class} validline={validline7} label={'повторите пароль'} id={'id_7'} />
                <div style={aget} className={styles.aget}><p>я согласен с <span>пользовательским соглашением</span><span className={styles.nocheck} onClick={go_check} style={checkno}></span><img src="/svg/check.svg" style={check} onClick={nogo_check} /></p></div>
                <button type="" onClick={Create_user} className={styles.reg1}><p>подтвердить</p></button>
            </div> : <span className='loader'>загрузка..</span>}
        </>
    );
}

export default Content_modal_login;