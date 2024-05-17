import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Content_modal_musik = ({ }) => {
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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <img src="/svg/repair.svg" id="id_101" style={{ height: '140px' }} />
                    <p style={{ fontSize: '20px', marginLeft: '-15px' }}>упс, раздел в разработке</p>
                    <audio loop src='/audio/serega.mp3' type="audio/mpeg" controls></audio>
                </div>
            </div> : <span className='loader'>загрузка..</span>}
        </>
    )
}

export default Content_modal_musik;