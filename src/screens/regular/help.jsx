import Header from "../../components/use/meny/header";
import { useState, useEffect } from "react";

const Help = () => {
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
                    <section><p>помоги себе сам</p></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Help;