import { useNavigate } from "react-router-dom";
import Header from "../../components/use/meny/header";
import context from '../../connections/context';
import { useContext, useEffect, useState } from "react";
import Loader from '../../components/use/meny/loader';


const P404_PAGE = () => {
    let { host } = useContext(context)
    let navigate = useNavigate()
    
    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    
    useEffect(() => {
        document.title = 'как ты сюда попал?';
    }, [])
    return (
        <>
            {view ? <main>
                <Header />
                <main>
                    <section></section>
                    <section>
                        <div className="content_right_" style={{height: '400px', width: '600px', marginTop: '80px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                            <img src="/svg/repair.svg" alt="" style={{height: '120px', margin: '45px'}} />
                            <p style={{transform: 'translateX(-90px)'}}>упс, страница не найдена</p>
                            <div className="more" style={{width: '200px', margin: '20px'}} onClick={() => navigate(``)}><p>на главную</p></div>
                        </div>
                    </section>
                    <section></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default P404_PAGE;