import styles from './content.module.css'

const Content = () => {
    return (
        <>
            <div className={styles.content}>
                <img src="/svg/long_arrow.svg" id={styles.id_04} onClick={() => navigate('/login')} />
            </div>
        </>
    );
}

export default Content 