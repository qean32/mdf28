import styles from './protokols.module.css'

const Protokols = ({ content }) => {
    return (
        <>
            <div className={styles.content}>
                <p className={styles.head}>ПРОТОКОЛЫ ПРОВЕДЕНИЯ ТУРНИРОВ ПО ДИСЦИПЛИНЕ DOTA2</p>
                <p className={styles.pcontent} dangerouslySetInnerHTML={{ __html: content }}>
                </p>
            </div>
            <div style={{height: '40px'}}></div>
        </>
    );
}

export default Protokols 