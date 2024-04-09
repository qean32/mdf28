import styles from './apps.module.css'
import App from './app';

const Content = ({ modal_go_one, model_go_two }) => {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.headerr}>
                    <p>приложения от MD.f</p>
                </div>
                <div className={styles.app_conteiner}>
                    <App go={model_go_two} img={'svg/og.png'} text={'поддержи свою команду'} style={{ top: '-2%', left: '3%' }} />
                    <App go={modal_go_one} img={'svg/demon.png'} text={'улыбка в твоем профиле'} style={{ top: '15%', left: '20%' }} />
                    <App text={'шахматы*'} />
                </div>
            </div>
        </>
    );
}

export default Content;