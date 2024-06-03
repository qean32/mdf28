import styles from './login.module.css'
import Perehod from './perehod';
import { useEffect, useState, useContext } from 'react';
import Slide from './slide';
import Input_pass from '../../../use/meny/input_pass';
import Input_text from '../../../use/meny/input_text';
import context from '../../../../connections/context';


const Login = ({ reg_sub, pass_reg, setpass_reg, email_reg, first_name_reg, last_name_reg, setemail_reg, setfirst_name_reg, setlast_name_reg, host }) => {

    const [email_open, setemail_open] = useState('')
    const [pass_open, setpass_open] = useState('')

    const { loginUser } = useContext(context)

    const [RunContent, setRunContent] = useState(false)
    const [scroll_length, setscroll_length] = useState(1)
    const [scroll_lengthpx, setscroll_lengthpx] = useState({
        transform: 'translateY(-0px)',
        transition: '2s'
    })
    const [goornogoone, setgoornogoone] = useState({})
    const [goornogotwo, setgoornogotwo] = useState({
        height: '400px',
        position: 'absolute',
        borderRadius: '30px',
        top: '0',
        transition: '0.6s',
        background: '#EAEAEA',
        width: '100%',
    })
    const [opacity1, setopacity1] = useState({ opacity: '1' })
    const [opacity2, setopacity2] = useState({ opacity: '0' })
    const [opacity3, setopacity3] = useState({ opacity: '0' })
    const [opacity4, setopacity4] = useState({ opacity: '0' })
    const [opacity5, setopacity5] = useState({ opacity: '0' })
    const [napon, setnapon] = useState({ transform: 'translateX(-78px)' })
    const RunFunction = () => {
        setRunContent(true)
    }
    const no_RunFunction = () => {
        setRunContent(false)
    }
    useEffect(() => {
        if (RunContent) {
            setTimeout(() => {
                setgoornogoone({
                    transform: 'translateX(-298px)'
                })
            }, 700);
            setgoornogotwo({
                height: '400px',
                position: 'absolute',
                borderRadius: '25px',
                top: '0',
                transition: '0.6s',
                background: '#EAEAEA',
                width: '100%',
                transform: 'translateY(55px)',
            })
            setnapon({ transform: 'translateX(-78px) translateY(55px)' })
        } else {
            setTimeout(() => {
                setgoornogotwo({
                    height: '400px',
                    position: 'absolute',
                    borderRadius: '40px',
                    top: '0',
                    transition: '0.6s',
                    background: '#EAEAEA',
                    width: '100%',
                })
                setnapon({ transform: 'translateX(-78px)' })
            }, 700);
            setgoornogoone({})
        }
    }, [RunContent])
    const scroll_length_up = () => {

        if (scroll_length == 5) {
            setscroll_length(1)
        } else {
            setscroll_length((prew) => prew + 1)
        }
    }

    useEffect(() => {
        switch (scroll_length) {
            case 1:
                setscroll_lengthpx({ transform: 'translateY(-0px)', transition: '2s' })
                break;
            case 2:
                setscroll_lengthpx({ transform: 'translateY(-350px)', transition: '2s' })
                break;
            case 3:
                setscroll_lengthpx({ transform: 'translateY(-700px)', transition: '2s' })
                break;
            case 4:
                setscroll_lengthpx({ transform: 'translateY(-1050px)', transition: '2s' })
                break;
            case 5:
                setscroll_lengthpx({ transform: 'translateY(-1400px)', transition: '2s' })
                break;
        }
    }, [scroll_length,])

    const PunOpacity = (number, opacity_) => {
        setscroll_length(number)
        setopacity1({ opacity: '0' })
        setopacity2({ opacity: '0' })
        setopacity3({ opacity: '0' })
        setopacity4({ opacity: '0' })
        setopacity5({ opacity: '0' })
        opacity_({ opacity: '1' })
    }

    useEffect(
        () => {
            let slider = setInterval(() => { setscroll_length((prew) => prew + 1) }, 5000)
            if (scroll_length == 6) {
                setscroll_length(1)
            }
            switch (scroll_length) {
                case 1:
                    PunOpacity(1, setopacity1)
                    break;
                case 2:
                    PunOpacity(2, setopacity2)
                    break;
                case 3:
                    PunOpacity(3, setopacity3)
                    break;
                case 4:
                    PunOpacity(4, setopacity4)
                    break;
                case 5:
                    PunOpacity(5, setopacity5)
                    break;
            }
            return () => {
                clearInterval(slider)
            }
        }
        , [scroll_length])
    const [idSlide, setidSlide] = useState(1)

    useEffect(
        () => {
            let slider1 = setInterval(() => { setidSlide((prew) => prew + 1) }, 4000)
            return () => {
                clearInterval(slider1)
            }
        }
        , [idSlide])
    const [p, setp] = useState({})

    useEffect(() => {
        switch (idSlide) {
            case 0:
                setidSlide(4)
                break;
            case 1:
                setp({
                    marginLeft: '0'
                })
                break;
            case 2:
                setp({
                    marginLeft: '-725px'
                })
                break;
            case 3:
                setp({
                    marginLeft: '-1450px'
                })
                break;
            case 4:
                setp({
                    marginLeft: '-2175px'
                })
                break;
            case 5:
                setidSlide(1)
                break;
        }
    }, [idSlide])
    return (
        <>
            <div className={styles.content}>
                <div className={styles.fakecontent} style={goornogotwo}></div>
                <div className={styles.left}>
                    <div className={styles.obla_1}></div>
                    <div className={styles.obla_2}></div>
                    <div className={styles.main_place_indicator}>
                        <div><div style={opacity1} onClick={() => PunOpacity(1, setopacity1)}></div></div>
                        <div><div style={opacity2} onClick={() => PunOpacity(2, setopacity2)}></div></div>
                        <div><div style={opacity3} onClick={() => PunOpacity(3, setopacity3)}></div></div>
                        <div><div style={opacity4} onClick={() => PunOpacity(4, setopacity4)}></div></div>
                        <div><div style={opacity5} onClick={() => PunOpacity(5, setopacity5)}></div></div>
                    </div>
                    <div className={styles.left_view}>
                        <div style={scroll_lengthpx} onClick={scroll_length_up}>
                            <Slide image={"/svg/cs_logo.svg"} text={"играй в CS2 вместе с нами!"} id={"img_id_6"} id_text={"text_id_5"} />
                            <Slide image={"/svg/bascketball_logo.svg"} text={"корт зовет нас.."} id={"img_id_10"} id_text={"text_id_4"} />
                            <Slide image={"/svg/dota_logo.svg"} text={"ГОТОВ?? ГОТОВ?? ГОТОВ??"} id={"img_id_8"} id_text={"text_id_2"} />
                            <Slide image={"/svg/venok.svg"} text={"мы только начали!"} id={"img_id_7"} id_text={"text_id_1"} />
                            <Slide image={"/svg/poker_logo.svg"} text={"впереди сотни вечеров"} id={"img_id_9"} id_text={"text_id_3"} />
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <Perehod RunFunction={RunFunction} no_RunFunction={no_RunFunction} />
                    <div className={styles.view}>
                        <div className={styles.form} style={goornogoone}>
                            <div className={styles.form_open}>
                                <form onSubmit={loginUser}>
                                    <Input_text id={'id_1'} setvalue_={setemail_open} value_={email_open} label={'почта'} name_={'email_open'} isEmail={true} />
                                    <Input_pass value_={pass_open} setvalue_={setpass_open} label={'пароль'} id={'id_2'} name_={'pass_open'} />
                                    <button type="submit" className={styles.open}><p>войти</p></button>
                                </form>
                                <div className={styles.agetation}>
                                    <p className='agetatin_text'>забыли пароль? - <span> востановить </span></p>
                                    <p className='agetatin_text'>нет аккаунта? - <span onClick={RunFunction}> зарегистрироваться </span></p>
                                </div>
                            </div>
                            <div className={styles.form_reg}>
                                <form onSubmit={reg_sub}>
                                    <Input_text id={'id_3'} setvalue_={setemail_reg} value_={email_reg} label={'почта'} isEmail={true} />
                                    <Input_pass value_={pass_reg} setvalue_={setpass_reg} label={'пароль'} id={'id_50'} />
                                    <Input_text id={'id_4'} setvalue_={setfirst_name_reg} value_={first_name_reg} label={'имя'} isEmail={false} />
                                    <Input_text id={'id_6'} setvalue_={setlast_name_reg} value_={last_name_reg} label={'фамилия'} isEmail={false} />
                                    <button type="submit" className={styles.reg}><p>регистрация</p></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.napom} style={napon}>
                <img src="/svg/arrow.svg" alt="" className={styles.arrow} onClick={() => setidSlide(idSlide - 1)} />
                <img src="/svg/arrow.svg" alt="" className={styles.arrow} style={{ transform: 'rotate(270deg)', left: '687px' }} onClick={() => setidSlide(idSlide + 1)} />
                <div className={styles.tuman}></div>
                <div className={styles.tuman} style={{ left: '690px' }}></div>
                <div className={styles.pslide} style={p}>
                    <p>пароль должен сожержать буквы и числа, минимальная длинна - 8</p>
                    <p>вводите корректную почту</p>
                    <p>имя и фамилия должны быть записанны на кириллице и не содержать чисел</p>
                    <p>удачной игры!</p>
                </div>
            </div>
        </>
    );
}

export default Login;