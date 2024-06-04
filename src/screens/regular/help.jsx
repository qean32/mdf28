import Header from "../../components/use/meny/header";
import context from '../../connections/context';
import { useContext, useEffect, useState } from "react";
import Loader from '../../components/use/meny/loader';
import Help from "../../components/regular/regular/help/help";

const Help_PAGE = () => {
    let { host, view, TitleFUnction } = useContext(context) 

    TitleFUnction('FaQ')
    return (
        <>
            {view ? <main>
                <Header />
                <main>
                    <section></section>
                    <section><Help /></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Help_PAGE;