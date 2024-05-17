import { useNavigate } from "react-router-dom";

const ContentModalOffers = ({ OfModal, str_direction }) => {
    let navigate = useNavigate()
    return (
        <>
            <div style={{ height: '57%', width: '100%' }}>
                <img src="/svg/repair.svg" alt="" style={{ height: '130px', position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '15%' }} />
                <img src="/svg/krestik.svg" onClick={() => OfModal()} className="krestik" alt="" />
            </div>
            <div style={{ padding: '50px' }}>
                <p>ОТКАЗАННО</p>
                <p>у вас не должно быть действующего контракта / или</p>
                <p>вы должны являться <span onClick={() => navigate(`/${str_direction}/regplayer`)} style={{ color: '#e74343', cursor: 'pointer' }}>игроком лиги</span>/ или</p>
                <p>вы не должны являться капитаном команды</p>
            </div>
        </>
    );
}

export default ContentModalOffers;