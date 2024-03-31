import { useNavigate } from 'react-router-dom';

const Right_panel_place = ({namee,navigat}) => {
    const navigate = useNavigate ();
    return (
        <>
            <div onClick={() => navigate(navigat)}><p>{namee}</p></div>
        </>
    );
}

export default Right_panel_place;