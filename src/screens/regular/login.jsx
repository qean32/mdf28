import { useContext, useEffect, useState } from "react";
import Header from "../../components/use/meny/header";
import Loader from '../../components/use/meny/loader';
import context from '../../connections/context';
import Shadow from '../../components/use/meny/shadow';
import Modal from '../../components/use/meny/modal';
import Login from "../../components/regular/regular/login/login";
import Login_modal from "../../components/regular/regular/login/login_modal";

const Login_PAGE = () => {
    let { host, view, TitleFUnction } = useContext(context)
    const [pass_reg, setpass_reg] = useState('')
    const [email_reg, setemail_reg] = useState('')
    const [first_name_reg, setfirst_name_reg] = useState('')
    const [last_name_reg, setlast_name_reg] = useState('')
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

    TitleFUnction('регистрация')
    return (
        <>
            {view ? <main>
                <Shadow viewShadow={viewShadow} of_modal={of_modal} />
                <Modal viewModal={viewModal} component={<Login_modal host={host} email_reg={email_reg} first_name_reg={first_name_reg} last_name_reg={last_name_reg} pass_reg={pass_reg} of_modal={of_modal} />} />
                <Header />
                <main>
                    <section></section>
                    <section style={{paddingTop: '20px'}}>
                        <Login host={host} email_reg={email_reg} first_name_reg={first_name_reg} last_name_reg={last_name_reg} pass_reg={pass_reg} setpass_reg={setpass_reg} setemail_reg={setemail_reg} setfirst_name_reg={setfirst_name_reg} setlast_name_reg={setlast_name_reg} reg_sub={reg_sub} />
                    </section>
                </main>
            </main> : <Loader />}
        </>
    );
}

export default Login_PAGE;