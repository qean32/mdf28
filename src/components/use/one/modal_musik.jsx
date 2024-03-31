import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Content_modal_musik = ({ propsStyles }) => {
    const navigate = useNavigate();
    const [view, setview] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setview(true)
        }, 300)
    }, [])
    return (
        <>
            {view ? <div className='full'>
                <img src="/svg/krestik.svg" onClick={() => navigate('/')} className='krestik' />
                <div style={propsStyles}>
                    <img src="/svg/repair.svg" id="id_101" />
                    <p style={{ fontSize: '20px', marginLeft: '7px' }}>упс, раздел в разработке</p>
                </div>
            </div> : <span className='loader'>загрузка..</span>}
        </>
    )
}

export default Content_modal_musik;