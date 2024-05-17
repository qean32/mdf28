import { useContext, useEffect, useState } from "react";
import Content from "../../components/regular/regular/login/content";
import Content_modal_login from "../../components/regular/regular/login/content_modal";
import Header from "../../components/use/meny/header";
import Loader from '../../components/use/meny/loader';
import context from '../../connections/context';
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';

const Login_PAGE = () => {
    const [pass_reg, setpass_reg] = useState('')
    const [email_reg, setemail_reg] = useState('')
    const [name_reg, setname_reg] = useState('')
    const [last_name_reg, setlast_name_reg] = useState('')
    let { host } = useContext(context)
    const [viewShadow, setviewShadow] = useState(false)
    const [viewModal, setviewModal] = useState(false)
    const reg_sub = (e) => {
        e.preventDefault()
        setviewShadow(true)
        setviewModal(true)
    }
    const of_modal = () => {
        setviewModal(false)
        setviewShadow(false)
    }
    
    const [view, setview] = useState(false)

    useEffect(() => {
        document.title = 'регистрация';
    }, [])

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
                        <Content host={host} email_reg={email_reg} name_reg={name_reg} last_name_reg={last_name_reg} pass_reg={pass_reg} setpass_reg={setpass_reg} setemail_reg={setemail_reg} setname_reg={setname_reg} setlast_name_reg={setlast_name_reg} reg_sub={reg_sub} />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Login_PAGE;