import { useContext } from 'react'
import styles from '../../regular/regular/login/login.module.css'
import context from '../../../connections/context'
import { useState, useEffect } from 'react'

const Input_text = ({ name_, style, value_, setvalue_,isEmail,id, label }) => {
    const [line, setline] = useState(false)
    const [isValid, setisValid] = useState(true)
    const [isValidclass, setisValidclass] = useState({ opacity: '0' })
    const [lineclass, setlineclass] = useState('lineColor')
    const [defPclass, setdefPclass] = useState('defP')
    const [validtext, setvalidtext] = useState({ color: '#E74343' })
    const [validline, setvalidline] = useState({})

    let { ValidateEmail, ValidateWord, ValidatePass } = useContext(context)

    let Validate_

    if (isEmail) {
        Validate_ = ValidateEmail
    } else {
        Validate_ = ValidateWord
    }

    const proverka = (e) => {
        setvalue_(e.target.value);
        if (value_.length != 0) {
            setline(true)
        } else {
            setline(false)
        }
        if (Validate_(value_)) {
            setisValid(true)
        } else {
            setisValid(false)
        }
    }

    useEffect(() => {
        if (line) {
            setlineclass('lineColor lineColor_go')
            setdefPclass('defP defP_go')
        } else {
            setlineclass('lineColor')
            setdefPclass('defP')
        }
    }, [line])

    useEffect(() => {
        if (isValid) {
            setisValidclass({ opacity: '0' }),
                setvalidtext({ color: '#4F8C00' }),
                setvalidline({ background: '#4F8C00' })
        } else {
            setisValidclass({ opacity: '' }),
                setvalidtext({ color: '#E74343' }),
                setvalidline({ background: '#E74343' })
        }
    }, [isValid])

    return (
        <div className={styles.conteiner} style={style}>
            <img src='/svg/krestick.svg' style={isValidclass} className='info_krest' />
            <input onChange={(e) => proverka(e)} onFocus={() => setline(true)} onBlur={(e) => proverka(e)} type="text" name={name_} id={id} value={value_} style={validtext} />
            <label htmlFor={id}>
                <p className={defPclass}>{label}</p>
            </label>
            <div className={styles.line}></div>
            <div className={lineclass} style={validline}></div>
        </div>
    );
}

export default Input_text;