import { useEffect, useState } from 'react';
import Content from "../../components/regular/regular/login/content";
import Header from "../../components/use/meny/header";
import Shadow from "../../components/use/meny/shadow";
import Modal from "../../components/use/meny/modal";
import Content_modal_login from "../../components/regular/regular/login/content_modal";

const login = () => {
    const [pass_reg, setpass_reg] = useState('')
    const [email_reg, setemail_reg] = useState('')
    const [name_reg, setname_reg] = useState('')
    const [last_name_reg, setlast_name_reg] = useState('')
    const [viewShadow, setviewShadow] = useState(false)
    const [viewModal, setviewModal] = useState(false)
    const reg_sub = (e) => {
        e.preventDefault()
        setviewShadow(true)
        setviewModal(true)
    }
    const modal_of = () => {
        setviewModal(false)
    }
    const shadow_of = () => {
        setviewShadow(false)
    }
    const of_modal = () => {
        modal_of();
        shadow_of();
    }
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 500)
    }, [])
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Content_modal_login email_reg={email_reg} name_reg={name_reg} last_name_reg={last_name_reg} pass_reg={pass_reg} of_modal={of_modal} />} />
                <Header />
                <main>
                    <section></section>
                    <section>
                        <Content email_reg={email_reg} name_reg={name_reg} last_name_reg={last_name_reg} pass_reg={pass_reg} setpass_reg={setpass_reg} setemail_reg={setemail_reg} setname_reg={setname_reg} setlast_name_reg={setlast_name_reg} reg_sub={reg_sub} />
                    </section>
                </main>
            </main> : <span className="loader" id="id_00">загрузка..</span>}
        </>
    );
}

export default login;