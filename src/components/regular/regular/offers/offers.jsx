import styles from './offers.module.css'
import { useContext, useEffect, useState } from 'react';
import context from '../../../../connections/context';
import Offer from './offer';
import { useNavigate } from 'react-router-dom';

const Offers_ = ({ host, go_modal, go_modal_1, go_modal_2 }) => {
    let { user } = useContext(context)
    const [offers, setoffers] = useState([])
    let navigate = useNavigate()
    let SearchOffer = async () => {
        let response = await fetch(`${host}/api/unification/search/offers/?user=${user.user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
        })
        let data = await response.json()
        setoffers(data.results)
    }
    useEffect(() => {
        SearchOffer()
    }, [])
    let ViewOffers = async (el) => {
        let response = await fetch(`${host}/api/unification/delete/offers/${el.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${JSON.parse(localStorage.getItem('token')).access}`,
            },
            body: JSON.stringify({ is_view: true })
        })
        let data = await response.json()
    }
    useEffect(() => {
        if (offers) {
            offers.map((el) => {
                ViewOffers(el)
            })
        }
    }, [offers])
    return (
        <>
            <div className={styles.content}>
                {offers.length > 0 ? offers.map((el) => <Offer go_modal={go_modal} go_modal_1={go_modal_1} go_modal_2={go_modal_2} host={host} el={el} key={el.id} />) : <>
                    <div style={{ height: '700px', width: '691px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <img src="/svg/long_arrow.svg" id={styles.id_0} onClick={() => navigate(-1)} />
                        <img src="/svg/repair.svg" alt="" style={{ height: '170px', transform: 'translateY(-80px)' }} />
                        <p>у вас нет приглашений</p>
                    </div>
                </>}
            </div>
        </>
    );
}

export default Offers_;