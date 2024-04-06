import styles from './content.module.css'

const Content = () => {
    return (
        <>
            <div className={styles.content}>
                <p className={styles.head}>ПРОТОКОЛЫ ПРОВЕДЕНИЯ ТУРНИРОВ ПО ДИСЦИПЛИНЕ DOTA2</p>
                <p className={styles.pcontent}>
                    1.1 - Порядок проведения встреч
                    <p>Встречи проводятся в рамках b03</p>
                    1.2 - Порядок вылета из турнира
                    <p>
                        Турниры проводится с использованием нижней сетки соотвественно: <br />
                        проигрыш в верхней сетке - подение в нижнюю <br />
                        проигрыш в нижней  сетке - поряжение в турнире
                    </p>
                    1.3 - Порядок распределения команд в первом раунде сетки
                    <p>
                        Места распределяются в соответствии с результатами квалификационных матчей от команды, набравшей наибольшее количество баллов к команде, набравшей наименьшее количество баллов
                    </p>
                    1.4 - Порядок вступления в команду новых членов во время проведения турнира
                    <p>Игроки, вступившие в команду ПОСЛЕ начала турнира не могут принять участие в нем</p>
                    1.5 - Порядок изменения времяни встречи
                    <p>Директор одной из команд сообщает о необходимости переноса времяни/даты встречи. Организатор согласует его с противоположной командой. Максимальное
                        количество таких переносов у команды - 1. Минимальное время от заявки до встречи 4ч
                    </p>
                    1.6 - Порядок выбора стороны
                    <p>Выбор стороны происходит по средству жребия. Капитаны используют _/roll. Победитель выбирает сторону. На следующий матч стороны команд меняются. </p>
                    1.7 - Порядок закрепления/изменения состава
                    <p>До начала встречи директорам следует закрепить состав, однако замены, изменения в расстановки никак не контролируются организатором</p>
                    1.8 - Не явка на матч
                    <p>Составу команды следует появляться на встречу вовремя и в полном составе</p>
                    1.9 - Задержка перед матчем
                    <p>Максимальное время которе команда может взять на отсрочку матчка - 15 мин</p>
                    2.0 - Минимальное время между матчами
                    <p>Минимальное время между матчами составляет 15 мин</p>
                    2.1 - Явное 322 <br /><br />
                    ПРОТОКОЛЫ ПРОВЕДЕНИЯ МАТЧЕЙ КВАЛИФИКАЦИЙ <br />
                    2.2 - Порядок  начисления баллов во время матча-квалификафии
                    <p style={{ fontWeight: 'bold' }}>
                        1 убийство: 1 балл <br />
                        победа: 10 баллов <br />
                        поражение: -10 балов<br />
                        признание поряжения: -5 баллов<br />
                        ейс: 10 баллов<br />
                        первая кровь: 3 баллов<br />
                    
                        БУДЕТ ДОПОЛНЯТБСЯ/ИЗМЕНЯТЬСЯ<br /></p>
                </p>
            </div>
        </>
    );
}

export default Content 