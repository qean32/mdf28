import styles from '../news/news.module.css'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import context from '../../../../connections/context';

const Post = ({ el, host }) => {
    const navigate = useNavigate();
    let { user } = useContext(context)
    return (
        <div>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div>
                        <div className={styles.ava} onClick={() => navigate(`/profile/${el.author?.id}`)} style={{ backgroundImage: `url(${el.author?.ava})` }}></div>
                    </div>
                    <div className={styles.text}>
                        <p className={styles.author} onClick={() => navigate(`/profile/${el.author?.id}`)}>{el.author?.first_name} {el.author?.last_name}</p>
                        {el.image && <img src={el.image} />}
                        <div><p dangerouslySetInnerHTML={{ __html: el.content }}></p></div>
                    </div>
                    <div className={styles.date}>
                        <div><p>{el.created_at}</p></div>
                    </div>
                </div>
                <div className={styles.bottom}>
                </div>
            </div>
        </div>
    );
}

export default Post;