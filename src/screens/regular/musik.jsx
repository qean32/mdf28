import { useEffect, useState } from 'react';
import Header from "../../components/use/meny/header";
import Shadow from "../../components/use/meny/shadow";
import Modal from "../../components/use/meny/modal";
import Content_modal_musik from '../../components/use/one/modal_musik';

const Musik = () => {
    const [viewShadow, setviewShadow] = useState(true)
    const [viewModal, setviewModal] = useState(true)
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} />
                <Modal viewModal={viewModal} component={<Content_modal_musik />} />
                <Header />
                <main>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default Musik;