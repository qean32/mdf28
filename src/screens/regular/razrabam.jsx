import Header from "../../components/use/meny/header";
import Loader from "../../components/use/meny/loader";
import context from '../../connections/context';
import { useContext, useEffect, useState } from "react";

const Razrabam_PAGE = () => {
    let { host, view, TitleFUnction } = useContext(context) 

    TitleFUnction('разработчикам')

    return (
        <>
            {view ? <main>
                <Header />
                <main>
                    <section></section>
                    <section>
                        <a target="_blank" href="https://vk.com/qean4playbragin"> vk </a>
                        <a target="_blank" href="https://t.me/qean4playbragin"> telegram </a>
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Razrabam_PAGE;