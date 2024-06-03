import styles from './login.module.css'
import { useEffect, useState, useContext } from 'react';
import Input_pass from '../../../use/meny/input_pass';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import context from '../../../../connections/context';


const Login_modal = ({ of_modal, pass_reg, email_reg, first_name_reg, last_name_reg,host }) => {
    const { setToken, setUser, ValidatePass,ValidateWord,ValidateEmail } = useContext(context)
    const navigate = useNavigate();
    const [pass_reg_2, setpass_reg_2] = useState('')

    let loginUser = async () => {
        let response = await fetch(`${host}/api/users/token/access`, {
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
    const CreateUser = async () => {
        if (ValidatePass(pass_reg) == false) {
            alert('используйте буквы и цифры в пароле - минимальная длинна - 8')
        } else if (ValidateEmail(email_reg) == false) {
            alert('не корректная почта')
        } else if (ValidateWord(last_name_reg) == false || ValidateWord(first_name_reg) == false) {
            alert('не корректно введены имя или фамилия')
        } else if (pass_reg != pass_reg_2) {
            alert('пароли не совпадают')
        } else if (checkk == false) {
            alert('вы не согласились с пользовательским соглашением')
        } else {
            let response = await fetch(`${host}/api/users/reg/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ first_name: first_name_reg, last_name: last_name_reg, password: pass_reg_2, email: email_reg })
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
        }
    }
    const [Check, setCheck] = useState({
        opacity: '0',
        zIndex: '1'
    })
    const [Check_no, setCheck_no] = useState({
        opacity: '1',
        zIndex: '2'
    })
    const [checkk, setcheckk] = useState(false)

    const RunCheck = () => {
        setCheck({
            opacity: '1'
        })
        setCheck_no({
            opacity: '0'
        })
        setcheckk(true)
    }
    const no_RunCheck = () => {
        setCheck_no({
            opacity: '1'
        })
        setCheck({
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
                <img src="/svg/scull.svg" style={{ height: '120px' }} />
                <Input_pass value_={pass_reg_2} setvalue_={setpass_reg_2} label={'повторите пароль'} id={'id_7'}/>
                <div style={{transform: 'translateY(70px) translateX(12px)'}} className={styles.aget}><p>я согласен с <span>пользовательским соглашением</span><span className={styles.nocheck} onClick={RunCheck} style={Check_no}></span><img src="/svg/check.svg" style={Check} onClick={no_RunCheck} /></p></div>
                <button type="" onClick={CreateUser} className={styles.reg1}><p>подтвердить</p></button>
            </div> : <span className='loader'>загрузка..</span>}
        </>
    );
}

export default Login_modal;