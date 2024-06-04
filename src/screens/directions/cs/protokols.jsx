import Shadow from '../../../components/use/meny/shadow';
import Modal from '../../../components/use/meny/modal';
import Content_modal from '../../../components/regular/regular/news/content_modal';
import Panel from '../../../components/use/meny/panel';
import Right_panel from '../../../components/use/unification/players/right_panel';
import Header from '../../../components/use/meny/header';
import Protokols from '../../../components/use/unification/protokols/protokols';
import Background from '../../../components/use/background/cs_background';
import { useContext, useEffect, useState } from "react";
import Loader from '../../../components/use/meny/loader';
import context from '../../../connections/context';

const Protokols_PAGE = () => {

    TitleFUnction('протоколы')

    let direction = 3
    let str_direction = 'cs'
    let content = "1.1 - Порядок проведения встреч \
    <p>Встречи проводятся в рамках b03</p> \
    1.2 - Порядок вылета из турнира \
    <p> \
        Турниры проводится с использованием нижней сетки соотвественно: <br /> \
        проигрыш в верхней сетке - падение в нижнюю <br /> \
        проигрыш в нижней  сетке - поряжение в турнире \
    </p> \
    1.3 - Порядок распределения команд в первом раунде сетки \
    <p> \
        Места распределяются в соответствии с результатами квалификационных матчей от команды, набравшей наибольшее количество баллов к команде, набравшей наименьшее количество баллов \
    </p> \
    1.4 - Участники встреч  \
    <p>Во встречах учавствуют ТОЛЬКО члены команд</p> \
    1.5 - Порядок вступления в команду новых членов во время проведения турнира \
    <p>Игроки, вступившие в команду ПОСЛЕ начала турнира не могут принять участие в нем</p> \
    1.6 - Порядок изменения времяни встречи \
    <p>Капитан должен сообщить о необходимости переноса времяни/даты встречи. Минимальное время от сообщения до встречи 1 день. Воспользоваться можно один раз за встречу.\
    </p> \
    1.7 - Порядок выбора стороны \
    <p>Выбор стороны происходит по средству жребия. Капитаны используют _/roll. Победитель выбирает сторону. На следующий матч стороны команд меняются. </p> \
    1.8 - Порядок закрепления/изменения состава \
    <p>До начала встречи директорам следует закрепить состав, однако замены, изменения в расстановки никак не контролируются организатором</p> \
    1.9 - Не явка на матч \
    <p>Составу команды следует появляться на встречу вовремя и в полном составе</p> \
    2.0 - Задержка перед матчем \
    <p>Максимальное время которе команда может взять на отсрочку матчка - 10 мин</p> \
    2.1 - Минимальное время между матчами \
    <p>Минимальное время между матчами составляет 5 мин</p> \
    2.2 - Явное 322 <br /><br /> \
    ПРОТОКОЛЫ ПРОВЕДЕНИЯ МАТЧЕЙ КВАЛИФИКАЦИЙ <br /> \
    2.3 - Порядок  начисления баллов во время матча-квалификафии \
    <p style={{ fontWeight: 'bold' }}> \
        1 убийство: 1 балл <br /> \
        победа: 5 <br /> \
        признание поряжения: -5 баллов<br /> \
        ейс: 7 баллов<br /> \
        первая кровь (в целом): 7 баллов<br /> \
        ПРОТОКОЛЫ ВСТРЕЧ В ДИСКОРДЕ <br /> \
        2.4 - Порядок прибытия на турнир \
        <p>За 15 минут до начала встречи участникам следует находится в своей комнте ожидания. Вход в комнату осуществляет капитан</p> \
        2.5 - Порядок проведения встречи \
        <p>Во время встречи участники обязанны находться в отведенной для этого комнате. Вход в комнату осуществляет капитан</p> \
        2.6 - Тренера* \
        <p>Тренера не могут находится в комнате проведения встреч. Как и связываться с участниками вне дискорд-сервера</p> \
        ПРОТОКОЛЫ НЕСПОРТИВНОГО ПОВЕДЕНИЯ <br /> \
        2.7 - Неспортивным поведение следует считать \
        <p> \
            Оскорбления <br /> \
            Угрозы <br /> \
            Физическое покушение<br /> \
            Чрезмерное унижение соперника<br /> \
            Не явка на встречу<br /> \
        </p> \
        САНКЦИИ <br /> \
        2.8 - Порядок начисления санкций \
        <p>Организатор в праве применить любые из ниже перечисленных санкций</p> \
        Поражение в встрече <br /> \
        Поражение в матче <br /> \
        Дисквалификация с турнира <br /> \
        Блокировка в лиге (вренненная/бессрочная) <br /> \
        Техническое поражение <br /> \
        ОПОЗДАНИЯ <br /> \
        2.9 - Порядок начисления санкций \
        <p>Организатор в праве применить любые из ниже перечисленных санкций</p> \
        Задержка матча на 30+ минут (без учета отсрочки) Поражение в встрече <br /> \
        Задержка матча на 15+ минут (без учета отсрочки) Поражение в матче <br /> \
        Техническое поражение <br /> \
        3.0 - ЗАЯВКА НА ТУРНИР \
        <p>КАПИТАНЫ ДОЛЖНЫ ПОДАТЬ СПИСОК ЧЛЕНОВ КОМАНДЫ ПЕРЕД ТУРНИРОВ ОРГАНИЗАТОРУ ДО НАЧАЛА ТУРНИРА</p> \
        форма списка - имя/id steam <br /> \
        Техническое поражение <br /> \
        БУДЕТ ДОПОЛНЯТБСЯ/ИЗМЕНЯТЬСЯ<br /> "

    let { viewModal, viewShadow, OfModal, RunModal, propsStyle, propsStyle_, host, view, TitleFUnction } = useContext(context) 
    return (
        <>
            {view ? <main>
                <Background />
                <Shadow viewShadow={viewShadow} OfModal={OfModal} />
                <Modal viewModal={viewModal} component={<Content_modal OfModal={OfModal} linkcs={'/cs'} linkdota={'/dota'} linkbascketball={'/bascketball'} />} propsStyle_={propsStyle_} propsStyle={propsStyle} />
                <Header />
                <main>
                    <section><Panel RunModal={RunModal} /></section>
                    <section><Protokols content={content} /></section>
                    <section id="s_id"><Right_panel str_direction={str_direction} /></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Protokols_PAGE;