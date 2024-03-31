import Content from "../../components/regular/regular/offers/content";
import Header from "../../components/use/meny/header";
import { useState, useEffect } from "react";

const Offers = () => {
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
                    <section><Content /></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Offers;