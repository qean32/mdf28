import Header from "../../../components/use/meny/header";
import Tournament from '../../../components/use/unification/tournament/tournament';
import Background from '../../../components/use/background/dota_background';
import { useContext, useEffect, useState } from "react";
import Loader from '../../../components/use/meny/loader';
import context from '../../../connections/context';

const Tournament_PAGE = () => {

    TitleFUnction('турнир')
    
    let direction = 1
    let str_direction = 'dota'
    let { host, view, TitleFUnction } = useContext(context) 
    return (
        <>
            {view ? <main>
                <Background />
                <Header />
                <main>
                    <section></section>
                    <section style={{ paddingTop: '10px' }}>
                        <Tournament host={host} direction={direction} str_direction={str_direction} />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Tournament_PAGE;