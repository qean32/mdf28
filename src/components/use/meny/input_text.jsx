import styles from '../../regular/regular/login/content.module.css'

const Input_text = ({isValidclass, proverka, setline,id, value, validtext , label,defPclass,lineclass,validline,namee,style}) => {
    return ( 
        <div className={styles.conteiner} style={style}>
        <img src='/svg/krestik.svg' style={isValidclass} className='info_krest' />
        <input maxLength={15} onChange={proverka} onFocus={() => setline(true)} onBlur={proverka} type="text" name={namee} id={id} value={value} style={validtext} />
        <label htmlFor={id}>
            <p className={defPclass}>{label}</p>
        </label>
        <div className={styles.line}></div>
        <div className={lineclass} style={validline}></div>
    </div>
     );
}
 
export default Input_text;