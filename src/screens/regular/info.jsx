import Header from "../../components/use/meny/header";
import { useState, useEffect } from "react";

const Info = () => {
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    return (
        <>
            {view ? <main>
                <Header></Header>
                <main>
                    <section></section>
                    <section>
                        <p>26.03.24</p>
                        <p>платформа для проведения\организации турниров по различным спортивным\киберспортивным дисциплинам</p>
                    </section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Info;