import Follow_ from "../../components/regular/regular/follow/follow";
import Header from "../../components/use/meny/header";
import context from '../../connections/context';
import { useContext, useEffect, useState } from "react";
import Loader from '../../components/use/meny/loader';

const Follow_PAGE = () => {
    let { host } = useContext(context)
    
    const [view, setview] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])

    useEffect(() => {
        document.title = 'подписки';
    }, [])
    return (
        <>
            {view ? <main>
                <Header />
                <main>
                    <section></section>
                    <section><Follow_ host={host} /></section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Follow_PAGE;