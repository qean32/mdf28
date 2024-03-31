import { useEffect, useState } from 'react';
import Post from '../../../regular/news/post';

const Content_poker = () => {

    const [news,setnews] = useState([])
    const [load,setload] = useState(true)
    const [link,setlink] = useState('https://mdf28server.site/api/news/search/news/?direction=5')
    const [fetchind,setfetchind] = useState(true)
    let SearhNews = async () => {
        if (link) {
         let response = await fetch(link, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setlink(data.next)
        setnews([...news, ...data.results])
        setfetchind(false)
        } else {
            setload(false)
        }
    }
    useEffect(() => {
        if (fetchind) {
            SearhNews()
        }
    }, [fetchind])
    const scrollHendler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setfetchind(true)
        }
    }
    useEffect(() => {
        document.addEventListener('scroll', scrollHendler)
        return function () {
            document.removeEventListener('scroll', scrollHendler)
        }
    },[])
    return ( 
        <>
        {news.length > 0 && news.map((el) => (
            <Post id={el.id} author={el.author} isV={false} image={el.image} coments={el.coments} direction={el.direction} content={el.content} created_at={el.created_at} likes={el.likes}/>
        ))}
        {load == false && <p style={{position:'static',margin:'20px',marginLeft:'170px',marginBottom:'20px'}}>записи закончились...</p>}
        </>
     );
}
 
export default Content_poker;