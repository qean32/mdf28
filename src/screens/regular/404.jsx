import { useEffect, useState } from 'react';
import Header from "../../components/use/meny/header";
import { useNavigate } from 'react-router-dom';


const Page_404 = () => {
    let navigate = useNavigate()
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
                    <section></section>
                    <section style={{ paddingTop: '100px' }}>
                        <p style={{ fontSize: '120px', color: '#E74343' }}>404</p>
                        <p style={{ marginLeft: '15px', fontSize: '20px', color: '#E74343', marginBottom: '20px' }}>страница не найдена</p>
                        <div className='more' onClick={() => navigate('/')}> <p>на главную</p>
                        </div>
                    </section>
                    <section></section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Page_404;