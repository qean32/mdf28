import styles from './content.module.css'
import Perehod from './perehod';
import { useEffect, useState, useContext } from 'react';
import Slide from './slide';
import Input_pass from '../../../use/meny/input_pass';
import Input_text from '../../../use/meny/input_text';
import context from '../../../../connections/context';


const Content = ({ reg_sub, pass_reg, setpass_reg, email_reg, name_reg, last_name_reg, setemail_reg, setname_reg, setlast_name_reg }) => {

    const { loginUser } = useContext(context)
    const [viewPass2class, setviewPass2class] = useState('viewPass viewPass_go')
    const [viewPass2class_open, setviewPass2class_open] = useState('viewPass')
    const [viewPass2, setviewPass2] = useState(false)
    const [line2, setline2] = useState(false)
    const [line2class, setline2class] = useState('lineColor')
    const [pass_open, setpass_open] = useState('')
    const [defP2class, setdefP2class] = useState('defP')
    const [validtext2, setvalidtext2] = useState({ color: '#4F8C00' })
    const [validline2, setvalidline2] = useState({})
    const [isValid2, setisValid2] = useState(true)
    const [isValid2class, setisValid2class] = useState({ opacity: '0' })
    useEffect(() => {
        if (viewPass2) {
            setviewPass2class('viewPass'),
                setviewPass2class_open('viewPass viewPass_go')
        } else {
            setviewPass2class('viewPass viewPass_go'),
                setviewPass2class_open('viewPass')
        }
    }, [viewPass2])
    const goPass2 = () => {
        if (viewPass2) {
            setviewPass2(false)
        } else {
            setviewPass2(true)
        }
    }
    const proverka2 = (e) => {
        setpass_open(e.target.value);
        if (pass_open.length != 0) {
            setline2(true)
        } else {
            setline2(false)
        }
        if (validatePass(pass_open)) {
            setisValid2(true)
        } else {
            setisValid2(false)
        }
    }
    useEffect(() => {
        if (isValid2) {
            setisValid2class({ opacity: '0' }),
                setvalidtext2({ color: '#4F8C00' }),
                setvalidline2({ background: '#4F8C00' })
        } else {
            setisValid2class({ opacity: '1' }),
                setvalidtext2({ color: '#7D7D7D' }),
                setvalidline2({ background: '#7D7D7D' })
        }
    }, [isValid2])
    useEffect(() => {
        if (line2) {
            setline2class('lineColor lineColor_go')
            setdefP2class('defP defP_go')
        } else {
            setline2class('lineColor')
            setdefP2class('defP')
        }
    }, [line2])
    const [viewPass5class, setviewPass5class] = useState('viewPass viewPass_go')
    const [viewPass5class_open, setviewPass5class_open] = useState('viewPass')
    const [viewPass5, setviewPass5] = useState(false)
    const [line5, setline5] = useState(false)
    const [line5class, setline5class] = useState('lineColor')
    const [defP5class, setdefP5class] = useState('defP')
    const [validtext5, setvalidtext5] = useState({ color: '#4F8C00' })
    const [validline5, setvalidline5] = useState({})
    const [isValid5, setisValid5] = useState(true)
    const [isValid5class, setisValid5class] = useState({ opacity: '0' })
    useEffect(() => {
        if (viewPass5) {
            setviewPass5class('viewPass'),
                setviewPass5class_open('viewPass viewPass_go')
        } else {
            setviewPass5class('viewPass viewPass_go'),
                setviewPass5class_open('viewPass')
        }
    }, [viewPass5])
    const goPass5 = () => {
        if (viewPass5) {
            setviewPass5(false)
        } else {
            setviewPass5(true)
        }
    }
    const proverka5 = (e) => {
        setpass_reg(e.target.value);
        if (pass_reg.length != 0) {
            setline5(true)
        } else {
            setline5(false)
        }
        if (validatePass(pass_reg)) {
            setisValid5(true)
        } else {
            setisValid5(false)
        }
    }
    useEffect(() => {
        if (isValid5) {
            setisValid5class({ opacity: '0' }),
                setvalidtext5({ color: '#4F8C00' }),
                setvalidline5({ background: '#4F8C00' })
        } else {
            setisValid5class({ opacity: '1' }),
                setvalidtext5({ color: '#7D7D7D' }),
                setvalidline5({ background: '#7D7D7D' })
        }
    }, [isValid5])
    useEffect(() => {
        if (line5) {
            setline5class('lineColor lineColor_go')
            setdefP5class('defP defP_go')
        } else {
            setline5class('lineColor')
            setdefP5class('defP')
        }
    }, [line5])
    const [line1, setline1] = useState(false)
    const [isValid1, setisValid1] = useState(true)
    const [isValid1class, setisValid1class] = useState({ opacity: '0' })
    const [line1class, setline1class] = useState('lineColor')
    const [email_open, setemail_open] = useState('')
    const [defP1class, setdefP1class] = useState('defP')
    const [validtext1, setvalidtext1] = useState({ color: '#7D7D7D' })
    const [validline1, setvalidline1] = useState({})
    const proverka1 = (e) => {
        setemail_open(e.target.value);
        if (email_open.length != 0) {
            setline1(true)
        } else {
            setline1(false)
        }
        if (validateEmail(email_open)) {
            setisValid1(true)
        } else {
            setisValid1(false)
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
        if (word.trim().length < 1 || word.match(/[a-z]/i) || word.match(/[0-9]/)) {
            return false
        } else {
            return true
        }
    }
    useEffect(() => {
        if (line1) {
            setline1class('lineColor lineColor_go')
            setdefP1class('defP defP_go')
        } else {
            setline1class('lineColor')
            setdefP1class('defP')
        }
    }, [line1])
    useEffect(() => {
        if (isValid1) {
            setisValid1class({ opacity: '0' }),
                setvalidtext1({ color: '#4F8C00' }),
                setvalidline1({ background: '#4F8C00' })
        } else {
            setisValid1class({ opacity: '1' }),
                setvalidtext1({ color: '#7D7D7D' }),
                setvalidline1({ background: '#7D7D7D' })
        }
    }, [isValid1])
    const [line3, setline3] = useState(false)
    const [line3class, setline3class] = useState('lineColor')
    const [defP3class, setdefP3class] = useState('defP')
    const [validtext3, setvalidtext3] = useState({ color: '#4F8C00' })
    const [validline3, setvalidline3] = useState({})
    const [isValid3, setisValid3] = useState(true)
    const [isValid3class, setisValid3class] = useState({ opacity: '0' })
    const proverka3 = (e) => {
        setemail_reg(e.target.value);
        if (email_reg.length != 0) {
            setline3(true)
        } else {
            setline3(false)
        }
        if (validateEmail(email_reg)) {
            setisValid3(true)
        } else {
            setisValid3(false)
        }
    }
    useEffect(() => {
        if (line3) {
            setline3class('lineColor lineColor_go')
            setdefP3class('defP defP_go')
        } else {
            setline3class('lineColor')
            setdefP3class('defP')
        }
    }, [line3])
    useEffect(() => {
        if (isValid3) {
            setisValid3class({ opacity: '0' }),
                setvalidtext3({ color: '#4F8C00' }),
                setvalidline3({ background: '#4F8C00' })
        } else {
            setisValid3class({ opacity: '1' }),
                setvalidtext3({ color: '#7D7D7D' }),
                setvalidline3({ background: '#7D7D7D' })
        }
    }, [isValid3])
    const [line4, setline4] = useState(false)
    const [line4class, setline4class] = useState('lineColor')
    const [defP4class, setdefP4class] = useState('defP')
    const [validtext4, setvalidtext4] = useState({ color: '#4F8C00' })
    const [validline4, setvalidline4] = useState({})
    const [isValid4, setisValid4] = useState(true)
    const [isValid4class, setisValid4class] = useState({ opacity: '0' })
    const proverka4 = (e) => {
        setname_reg(e.target.value);
        if (name_reg.length != 0) {
            setline4(true)
        } else {
            setline4(false)
        }
        if (validateWord(name_reg)) {
            setisValid4(true)
        } else {
            setisValid4(false)
        }
    }
    useEffect(() => {
        if (isValid4) {
            setisValid4class({ opacity: '0' }),
                setvalidtext4({ color: '#4F8C00' }),
                setvalidline4({ background: '#4F8C00' })
        } else {
            setisValid4class({ opacity: '1' }),
                setvalidtext4({ color: '#7D7D7D' }),
                setvalidline4({ background: '#7D7D7D' })
        }
    }, [isValid4])
    useEffect(() => {
        if (line4) {
            setline4class('lineColor lineColor_go')
            setdefP4class('defP defP_go')
        } else {
            setline4class('lineColor')
            setdefP4class('defP')
        }
    }, [line4])
    const [line6, setline6] = useState(false)
    const [line6class, setline6class] = useState('lineColor')
    const [defP6class, setdefP6class] = useState('defP')
    const [validtext6, setvalidtext6] = useState({ color: '#4F8C00' })
    const [validline6, setvalidline6] = useState({})
    const [isValid6, setisValid6] = useState(true)
    const [isValid6class, setisValid6class] = useState({ opacity: '0' })
    const proverka6 = (e) => {
        setlast_name_reg(e.target.value);
        if (last_name_reg.length != 0) {
            setline6(true)
        } else {
            setline6(false)
        }
        if (validateWord(last_name_reg)) {
            setisValid6(true)
        } else {
            setisValid6(false)
        }
    }
    useEffect(() => {
        if (isValid6) {
            setisValid6class({ opacity: '0' }),
                setvalidtext6({ color: '#4F8C00' }),
                setvalidline6({ background: '#4F8C00' })
        } else {
            setisValid6class({ opacity: '1' }),
                setvalidtext6({ color: '#7D7D7D' }),
                setvalidline6({ background: '#7D7D7D' })
        }
    }, [isValid6])
    useEffect(() => {
        if (line6) {
            setline6class('lineColor lineColor_go')
            setdefP6class('defP defP_go')
        } else {
            setline6class('lineColor')
            setdefP6class('defP')
        }
    }, [line6])
    const [go_content, setgo_content] = useState(false)
    const [scroll_length, setscroll_length] = useState(1)
    const [scroll_lengthpx, setscroll_lengthpx] = useState({
        transform: 'translateY(-0px)',
        transition: '2s'
    })
    const [goornogoone, setgoornogoone] = useState({})
    const [goornogotwo, setgoornogotwo] = useState({
        height: '400px',
        position: 'absolute',
        borderRadius: '40px',
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
    const [naponn, setnapon] = useState({ transform: 'translateX(-78px)' })
    const go = () => {
        setgo_content(true)
    }
    const nogo = () => {
        setgo_content(false)
    }
    useEffect(() => {
        if (go_content) {
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
    }, [go_content])
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

    const opac_go = (number, opas) => {
        setscroll_length(number)
        setopacity1({ opacity: '0' })
        setopacity2({ opacity: '0' })
        setopacity3({ opacity: '0' })
        setopacity4({ opacity: '0' })
        setopacity5({ opacity: '0' })
        opas({ opacity: '1' })
    }

    useEffect(
        () => {
            let slider = setInterval(() => { setscroll_length((prew) => prew + 1) }, 5000)
            if (scroll_length == 6) {
                setscroll_length(1)
            }
            switch (scroll_length) {
                case 1:
                    opac_go(1, setopacity1)
                    break;
                case 2:
                    opac_go(2, setopacity2)
                    break;
                case 3:
                    opac_go(3, setopacity3)
                    break;
                case 4:
                    opac_go(4, setopacity4)
                    break;
                case 5:
                    opac_go(5, setopacity5)
                    break;
            }
            return () => {
                clearInterval(slider)
            }
        }
        , [scroll_length])
    const [idsl, setidsl] = useState(1)
    useEffect(
        () => {
            let slider1 = setInterval(() => { setidsl((prew) => prew + 1) }, 4000)
            return () => {
                clearInterval(slider1)
            }
        }
        , [idsl])
    const [p, setp] = useState({})

    useEffect(() => {
        switch (idsl) {
            case 0:
                setidsl(4)
                console.log(idsl)
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
                setidsl(1)
                break;
        }
    }, [idsl])
    return (
        <>
            <div className={styles.content}>
                <div className={styles.fakecontent} style={goornogotwo}></div>
                <div className={styles.left}>
                    <div className={styles.obla_1}></div>
                    <div className={styles.obla_2}></div>
                    <div className={styles.main_place_indicator}>
                        <div><div style={opacity1} onClick={() => opac_go(1, setopacity1)}></div></div>
                        <div><div style={opacity2} onClick={() => opac_go(2, setopacity2)}></div></div>
                        <div><div style={opacity3} onClick={() => opac_go(3, setopacity3)}></div></div>
                        <div><div style={opacity4} onClick={() => opac_go(4, setopacity4)}></div></div>
                        <div><div style={opacity5} onClick={() => opac_go(5, setopacity5)}></div></div>
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
                    <Perehod go={go} nogo={nogo} />
                    <div className={styles.view}>
                        <div className={styles.form} style={goornogoone}>
                            <div className={styles.form_open}>
                                <form onSubmit={loginUser}>
                                    <Input_text isValidclass={isValid1class} proverka={proverka1} setline={setline1} id={'id_1'} value={email_open} validtext={validtext1} label={'почта'} defPclass={defP1class} lineclass={line1class} validline={validline1} namee={'email_open'} />
                                    <Input_pass isValidclass={isValid2class} goPass={goPass2} viewPassclass_open={viewPass2class_open} viewPassclass={viewPass2class} proverka={proverka2} setline={setline2} viewPass={viewPass2} value={pass_open} validtext={validtext2} defPclass={defP2class} lineclass={line2class} validline={validline2} label={'пароль'} id={'id_2'} namee={'pass_open'} />
                                    <button type="submit" className={styles.open}><p>войти</p></button>
                                </form>
                                <div className={styles.agetation}>
                                    <p className='agetatin_text'>забыли пароль? - <span> востановить </span></p>
                                    <p className='agetatin_text'>нет аккаунта? - <span onClick={go}> зарегистрироваться </span></p>
                                </div>
                            </div>
                            <div className={styles.form_reg}>
                                <form onSubmit={reg_sub}>
                                    <Input_text isValidclass={isValid3class} proverka={proverka3} setline={setline3} id={'id_3'} value={email_reg} validtext={validtext3} label={'почта'} defPclass={defP3class} lineclass={line3class} validline={validline3} />
                                    <Input_pass isValidclass={isValid5class} goPass={goPass5} viewPassclass_open={viewPass5class_open} viewPassclass={viewPass5class} proverka={proverka5} setline={setline5} viewPass={viewPass5} value={pass_reg} validtext={validtext5} defPclass={defP5class} lineclass={line5class} validline={validline5} label={'пароль'} id={'id_50'} />
                                    <Input_text isValidclass={isValid4class} proverka={proverka4} setline={setline4} id={'id_4'} value={name_reg} validtext={validtext4} label={'имя'} defPclass={defP4class} lineclass={line4class} validline={validline4} />
                                    <Input_text isValidclass={isValid6class} proverka={proverka6} setline={setline6} id={'id_6'} value={last_name_reg} validtext={validtext6} label={'фамилия'} defPclass={defP6class} lineclass={line6class} validline={validline6} />
                                    <button type="submit" className={styles.reg}><p>регистрация</p></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.napom} style={naponn}>
                <img src="/svg/arrow.svg" alt="" className={styles.arrow} onClick={() => setidsl(idsl - 1)} />
                <img src="/svg/arrow.svg" alt="" className={styles.arrow} style={{ transform: 'rotate(270deg)', left: '687px' }} onClick={() => setidsl(idsl + 1)} />
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

export default Content;