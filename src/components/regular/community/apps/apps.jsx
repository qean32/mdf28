import styles from './apps.module.css'
import App from './app';

const Apps_ = ({ modal_go_one, model_go_two, host }) => {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.headerr}>
                    <p>приложения от MD.f</p>
                </div>
                <div className={styles.app_conteiner}>
                    <App host={host} go={model_go_two} img={'svg/og.png'} text={'поддержи свою команду'} style={{ top: '-2%', left: '3%' }} />
                    <App host={host} go={modal_go_one} img={'svg/demon.png'} text={'улыбка в твоем профиле'} style={{ top: '15%', left: '20%' }} />
                    <App text={'шахматы*'} />
                </div>
            </div>
        </>
    );
}

export default Apps_;