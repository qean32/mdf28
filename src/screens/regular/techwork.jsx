import { useNavigate } from "react-router-dom";
import Header from "../../components/use/meny/header";
import context from '../../connections/context';
import { useContext, useEffect, useState } from "react";
import Loader from '../../components/use/meny/loader';


const Tech_PAGE = () => {
    let { host, techwork, view, TitleFUnction } = useContext(context)
    let navigate = useNavigate() 
    useEffect(() => {
        document.title = 'серые будни мы воркаем много';
        if (!techwork) {
            navigate('/')
        }
    }, [])
    return (
        <>
            {view ? <main>
                <main>
                    <section></section>
                    <section>
                        <div className="content_right_" style={{ height: '400px', width: '600px', marginTop: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <img src="/svg/repair.svg" alt="" style={{ height: '120px', margin: '70px',marginTop: '25px'}} />
                            <br />
                            <p>СЕРЫЕ БУДНИ МЫ ВОРКАЕМ МНОГО</p>
                            <p style={{opacity: '0.8', margin: '5px'}}>идут работы</p>
                        </div>
                    </section>
                    <section></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Tech_PAGE;