import { useEffect, useState } from 'react';
import Header from "../../components/use/meny/header";


const Leha_dr = () => {
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    return (
        <>
            {view ? <main>
                <Header />
                <main>
                <img src="/svg/rediant_creaps.svg" alt="" id="id_bck_1"/>
                <img src="/svg/dire_creaps.svg" alt="" id="id_bck_2" />
                <img src="/svg/kosmonavt.svg" alt="" id="id_bck_4" />
                <img src="/svg/kosmonavt.svg" alt="" id="id_bck_4" style={{left: '390px',top: '130px',transform: 'rotate(-110deg)'}}/>
                <img src="/svg/kosmonavt.svg" alt="" id="id_bck_4" style={{left: '390px',top: '430px',transform: 'rotate(-30deg)'}}/>
                <img src="/svg/kosmonavt.svg" alt="" id="id_bck_4" style={{left: '120px',top: '330px',transform: 'rotate(100deg)'}}/>
                <img src="/svg/kosmonavt.svg" alt="" id="id_bck_4" style={{left: '1390px',top: '380px',transform: 'rotate(110deg)'}}/>
                <img src="/svg/kosmonavt.svg" alt="" id="id_bck_4" style={{left: '1690px',top: '70px',transform: 'rotate(-130deg)'}}/>
                <img src="/svg/kosmonavt.svg" alt="" id="id_bck_4" style={{left: '1490px',top: '170px',transform: 'rotate(-40deg)'}}/>
                <img src="/svg/kosmonavt.svg" alt="" id="id_bck_4" style={{left: '1690px',top: '420px',transform: 'rotate(10deg)'}}/>
                    <section></section>
                    <section style={{ paddingTop: '20px' }}>
                        <img src="/png/AEahGvADEs8.jpg" style={{ height: '600px', borderRadius: '10px' }} alt="" />
                        <p style={{ marginLeft: '2px', marginTop: '10px' }}>Лешка с днем рождения тебя! <br /> желаю счастья, здоровья, закончить свою шарагу и стать машинистом уже
                            отвезешь меня куда нить
                            в теплые края
                            потом нафиг можешь идти! <br />
                            помни что ты очень крутой и я очень рад что ты появился в моей жизни!
                            30.03.24</p>
                    </section>
                    <section></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Leha_dr;