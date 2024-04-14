import { useEffect, useState } from 'react';
import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';

const Directions = ({ img, LOGO, text, iscs, style, navigat,id }) => {
    const navigate = useNavigate();
    const [go, setgo] = useState(false)
    const [goStyle, setgoStyle] = useState({})
    const goH = () => {
        if (go) {
            setgoStyle({
                transform: 'translateY(-15px)',
            })
        } else {
            setgoStyle({})
        }
    }
    useEffect(() => {
        goH()
    }, [go])
    return (
        <div className={styles.dis} onClick={() => navigate(`${navigat}`)} onMouseEnter={() => setgo(true)} onMouseLeave={() => setgo(false)} style={style}>
            <img src={img} style={goStyle} className={styles.img} />
            <div>
                <img style={goStyle} src={LOGO} id={id} />
                <p style={goStyle}>{text}</p>
            </div>
        </div>
    );
}

export default Directions;