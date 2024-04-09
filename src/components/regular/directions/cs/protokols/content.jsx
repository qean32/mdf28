import styles from './content.module.css'

const Content = () => {
    return (
        <>
            <div className={styles.content}>
                <p className={styles.head}>ПРОТОКОЛЫ ПРОВЕДЕНИЯ ТУРНИРОВ ПО ДИСЦИПЛИНЕ CS2</p>
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
                    1.4 - Участники встреч 
                    <p>Во встречах учавствуют члена команд</p>
                    1.5 - Порядок вступления в команду новых членов во время проведения турнира
                    <p>Игроки, вступившие в команду ПОСЛЕ начала турнира не могут принять участие в нем</p>
                    1.6 - Порядок изменения времяни встречи
                    <p>Директор одной из команд сообщает о необходимости переноса времяни/даты встречи. Организатор согласует его с противоположной командой. Максимальное
                        количество таких переносов у команды - 1. Минимальное время от заявки до встречи 4ч
                    </p>
                    1.7 - Порядок выбора стороны
                    <p>Выбор стороны происходит по средству жребия. Капитаны используют _/roll. Победитель выбирает сторону. На следующий матч стороны команд меняются. </p>
                    1.8 - Порядок закрепления/изменения состава
                    <p>До начала встречи директорам следует закрепить состав, однако замены, изменения в расстановки никак не контролируются организатором</p>
                    1.9 - Не явка на матч
                    <p>Составу команды следует появляться на встречу вовремя и в полном составе</p>
                    2.0 - Задержка перед матчем
                    <p>Максимальное время которе команда может взять на отсрочку матчка - 15 мин</p>
                    2.1 - Минимальное время между матчами
                    <p>Минимальное время между матчами составляет 15 мин</p>
                    2.2 - Явное 322 <br /><br />
                    ПРОТОКОЛЫ ПРОВЕДЕНИЯ МАТЧЕЙ КВАЛИФИКАЦИЙ <br />
                    2.3 - Порядок  начисления баллов во время матча-квалификафии
                    <p style={{ fontWeight: 'bold' }}>
                        1 убийство: 1 балл <br />
                        победа: 10 баллов <br />
                        поражение: -10 балов<br />
                        признание поряжения: -5 баллов<br />
                        ейс: 10 баллов<br />
                        первая кровь (в каждом раунде): 1.5 баллов<br />

                    ПРОТОКОЛЫ ВСТРЕЧ В ДИСКОРДЕ <br />
                    2.4 - Порядок прибытия на турнир
                    <p>За 15 минут до начала встречи участникам следует находится в своей комнте ожидания. Вход в комнату осуществляет организатор</p>
                    2.5 - Порядок проведения встречи
                    <p>Во время встречи участники обязанны находться в отведенной для этого комнате. Вход в комнату осуществляет организатор</p>
                    2.6 - Тренара*
                    <p>Тренера не могут находится в комнате проведения встреч. Как и связываться с участниками вне дискорд-сервера</p>

                    ПРОТОКОЛЫ НЕСПОРТИВНОГО ПОВЕДЕНИЯ <br />
                    2.7 - Неспортивным поведение следует считать
                    <p>
                        Оскорбления <br />
                        Угрозы<br />
                        Физическое покушение<br />
                        Чрезмерное унижение соперника<br />
                        Не явка на встречу<br />
                    </p>

                    САНКЦИИ <br />
                    2.8 - Порядок начисления санкций
                    <p>Организатор в праве применить любые из ниже перечисленных санкций. Однако обязанн обьяснить причину сославшись на номер статьи</p>
                    Дисквалификация со встречи <br />
                    Дисквалификация с матча <br />
                    Блокировка в лиге (вренненная/бессрочная) <br />
                    Техническое поражение <br />
                    
                        БУДЕТ ДОПОЛНЯТБСЯ/ИЗМЕНЯТЬСЯ<br /></p>
                </p>
            </div>
        </>
    );
}

export default Content 