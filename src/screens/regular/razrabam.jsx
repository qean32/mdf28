import Header from "../../components/use/meny/header";
import { useState, useEffect } from "react";

const Razrabam = () => {
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
                        <a  target="_blank" href="https://vk.com/qean4playbragin"> vk </a>
                        <a target="_blank" href="https://t.me/qean4playbragin"> telegram </a>
                    </section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Razrabam;