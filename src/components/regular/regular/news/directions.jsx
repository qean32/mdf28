import { useEffect, useState } from 'react';
import styles from './news.module.css'
import { useNavigate } from 'react-router-dom';

const Directions = ({ img, LOGO, text, style_, navigat,id }) => {
    const navigate = useNavigate();
    const [triger, settriger] = useState(false)
    const [style, setstyle] = useState({})
    const Run = () => {
        if (triger) {
            setstyle({
                transform: 'translateY(-15px)',
            })
        } else {
            setstyle({})
        }
    }
    useEffect(() => {
        Run()
    }, [triger])
    return (
        <div className={styles.dis} onClick={() => navigate(`${navigat}`)} onMouseEnter={() => settriger(true)} onMouseLeave={() => settriger(false)} style={style_}>
            <img src={img} style={style} className={styles.img} />
            <div>
                <img style={style} src={LOGO} id={id} />
                <p style={style}>{text}</p>
            </div>
        </div>
    );
}

export default Directions;