import { useContext } from 'react'
import styles from '../../regular/regular/login/login.module.css'
import context from '../../../connections/context'
import { useState, useEffect } from 'react'

const Input_pass = ({ value_, setvalue_, label, id, name_ }) => {
    const [viewPassclass, setviewPassclass] = useState('viewPass viewPass_go')
    const [viewPassclass_open, setviewPassclass_open] = useState('viewPass')
    const [viewPass, setviewPass] = useState(false)
    const [line, setline] = useState(false)
    const [lineclass, setlineclass] = useState('lineColor')
    const [defPclass, setdefPclass] = useState('defP')
    const [validtext, setvalidtext] = useState({ color: '#4F8C00' })
    const [validline, setvalidline] = useState({})
    const [isValid, setisValid] = useState(true)
    const [isValidclass, setisValidclass] = useState({ opacity: '0' })

    let { ValidatePass } = useContext(context)

    useEffect(() => {
        if (viewPass) {
            setviewPassclass('viewPass'),
                setviewPassclass_open('viewPass viewPass_go')
        } else {
            setviewPassclass('viewPass viewPass_go'),
                setviewPassclass_open('viewPass')
        }
    }, [viewPass])

    const goPass = () => {
        console.log('zxc')
        if (viewPass) {
            setviewPass(false)
        } else {
            setviewPass(true)
        }
    }

    const proverka = (e) => {
        setvalue_(e.target.value);
        if (value_.length != 0) {
            setline(true)
        } else {
            setline(false)
        }
        if (ValidatePass(value_)) {
            setisValid(true)
        } else {
            setisValid(false)
        }
    }

    useEffect(() => {
        if (isValid) {
            setisValidclass({ opacity: '0' }),
                setvalidtext({ color: '#4F8C00' }),
                setvalidline({ background: '#4F8C00' })
        } else {
            setisValidclass({ opacity: '1' }),
                setvalidtext({ color: '#E74343' }),
                setvalidline({ background: '#E74343' })
        }
    }, [isValid])

    useEffect(() => {
        if (line) {
            setlineclass('lineColor lineColor_go')
            setdefPclass('defP defP_go')
        } else {
            setlineclass('lineColor')
            setdefPclass('defP')
        }
    }, [line])

    return (
        <div className={styles.conteiner}>
            <img src='/svg/krestick.svg' style={isValidclass} className='info_krest' />
            <img src='/svg/lock-open-solid.svg' onClick={() => goPass()} className={viewPassclass_open} />
            <img src='/svg/look_1.svg' onClick={() => goPass()} className={viewPassclass} />
            <input maxLength={255} onChange={(e) => proverka(e)} onFocus={() => setline(true)} onBlur={(e) => proverka(e)} type={viewPass ? "text" : "password"} name={name_} id={id} value={value_} style={validtext} />
            <label htmlFor={id}>
                <p className={defPclass}>{label}</p>
            </label>
            <div className={styles.line}></div>
            <div className={lineclass} style={validline}></div>
        </div>
    );
}

export default Input_pass;