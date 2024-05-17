import styles from '../../regular/regular/login/content.module.css'

const Input_pass = ({isValidclass,goPass,viewPassclass_open,viewPassclass,proverka,setline,viewPass,value,validtext,defPclass,lineclass,validline,label,id,namee }) => {
    return ( 
        <div className={styles.conteiner}>
        <img src='/svg/krestick.svg' style={isValidclass} className='info_krest' />
        <img src='/svg/lock-open-solid.svg' onClick={goPass} className={viewPassclass_open} />
        <img src='/svg/look_1.svg' onClick={goPass} className={viewPassclass} />
        <input maxLength={55} onChange={proverka} onFocus={() => setline(true)} onBlur={proverka} type={viewPass ? "text" : "password"} name={namee} id={id} value={value} style={validtext} />
        <label htmlFor={id}>
            <p className={defPclass}>{label}</p>
        </label>
        <div className={styles.line}></div>
        <div className={lineclass} style={validline}></div>
    </div>
     );
}
 
export default Input_pass;