import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Content = () => {
    let host = 'https://mdf28server.site'
    let direction = 'dota'
    const navigate = useNavigate();
    let { id } = useParams()
    const [data, setdata] = useState({})
    const [cups, setcups] = useState([])
    const [players, setplayers] = useState([])
    let SearhTeam = async (id) => {
        let response = await fetch(`${host}/api/${direction}/search/team/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setdata(data.results[0])
        setcups(data.results[0]?.cups)
    }
    useEffect(() => {
        SearhTeam(id)
        SearchPlayer(id)
    }, [])
    const [pts, setpts] = useState(10)
    useEffect(() => {
        let zxc = 0;
        for (let index = 0; index < players.length; index++) {
            zxc = zxc + players[index].pts;
        }
        setpts(zxc)
    }, [players])
    let SearchPlayer = async (id) => {
        let response = await fetch(`${host}/api/${direction}/search/player/?team=${id}&offset=0&limit=16`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setplayers(data.results)
    }
    const [og, setog] = useState([])
    const [yg, setyg] = useState([])
    useEffect(() => {
        if (players.length > 0) {
            setog(players.filter(el => el.generation?.generation_name == "основной состав"))
            setyg(players.filter(el => el.generation?.generation_name == "второй состав"))
        }
    }, [players])
    return (
        <>
            <div className={styles.content}>
                <div className={styles.back} style={{ backgroundImage: `url(${data.background})` }}>
                    {/* {id && id == data.director?.id && <img src="/svg/menu_b.svg" style={{ position: 'absolute', right: '12px', top: '10px', cursor: 'pointer' }} />}
                    {id && id == data.director?.id && <div className={id ? styles.leave : styles.leavego}>
                        <div><p>редактировать</p><img src="/svg/pencil.svg" style={{ marginLeft: '5px' }} /></div>
                        <div onClick={id}><p style={{ transform: 'translateY(-2px)' }}>выйти</p><img src="/svg/logout.svg" style={{ marginLeft: '5px' }} /></div>
                    </div>} */}
                </div>
                <div className={styles.us_info}>
                    <div    ><div className={styles.logo} style={{ backgroundImage: `url(${data.logo})` }}></div><div className={styles.fakelogo}></div></div>
                    <div className={styles.info}><div>
                        <div>
                            <p id={styles.id_1}>{data.team_name}</p>
                            <p id={styles.id_2}>{data.status}</p>
                        </div>
                        <p id={styles.id_2}>{data.detail}</p>
                    </div></div>
                </div>
            </div>
            {data && <div className={styles.content_DOTA} style={{ width: '280px' }}>
                <div style={{ display: 'flex' }}>
                    <div className={styles.value_D}><p>матчей</p><span>{data.matches}-{data.win_matches}</span></div>
                    <div className={styles.value_D}><p>турниров</p><span>{data.tournament}-{data.win_tournament}</span></div>
                </div>
                {data && <div className={styles.content_DOTA} style={{ width: '140px', position: 'absolute', top: '-30px', right: '-480px' }}>
                    <div style={{ display: 'flex'}}>
                        <div className={styles.value_D}><p>процент</p><span>{(data.win_matches / data.matches * 100).toFixed(1)}</span></div>
                    </div>
                </div>}
                {data && <div className={styles.content_DOTA} style={{ width: '140px', position: 'absolute', top: '-30px', right: '-300px' }}>
                    <div style={{ display: 'flex'}}>
                        <div className={styles.value_D}><p>ср. птс</p><span>{(pts / players?.length).toFixed(0)}</span></div>
                    </div>
                </div>}
            </div>}
            {cups.length > 0 && <div className={styles.content_DOTA}>
                {cups.map((el) => <div className={styles.cup} style={{ backgroundImage: `url(${el.image})` }}></div>)}
            </div>}
            {og.length > 0 && <div className={styles.content}>
                <p className={styles.og}>основной состав</p>
                {Array.isArray(og) && og.map((el) => <div className={styles.info_el} onClick={() => navigate(`/profile/${el.user?.id}`)}>
                    <div style={{ backgroundImage: `url(${el.user?.ava})` }} className={styles.ava}>
                    </div><p>{el.user?.first_name} {el.user?.last_name}
                        {el.user?.smail && <div style={{ backgroundImage: `url(${el.user?.smail.image})` }} className={styles.smail}></div>}
                        {el.user?.team_sap && <div style={{ backgroundImage: `url(${el.user?.team_sap.image})` }} className={styles.smail}></div>}
                    </p><div className={styles.dotas}><div className={styles.pos_list}>{el.position?.length > 0 && el.position.map((el) => <div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>)}</div><img src={el.rank?.image_rank} /></div></div>)}
            </div>}
            {yg.length > 0 && <div className={styles.content}>
                <p className={styles.og}>второй состав</p>
                {Array.isArray(yg) && yg.map((el) => <div className={styles.info_el} onClick={() => navigate(`/profile/${el.user?.id}`)}>
                    <div style={{ backgroundImage: `url(${el.user?.ava})` }} className={styles.ava}>
                    </div><p>{el.user?.first_name} {el.user?.last_name}
                        {el.user?.smail && <div style={{ backgroundImage: `url(${el.user?.smail.image})` }} className={styles.smail}></div>}
                        {el.user?.team_sap && <div style={{ backgroundImage: `url(${el.user?.team_sap.image})` }} className={styles.smail}></div>}
                    </p><div className={styles.dotas}><div className={styles.pos_list}>{el.position?.length > 0 && el.position.map((el) => <div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>)}</div><img src={el.rank?.image_rank} /></div></div>)}
            </div>}
            <div style={{ height: '50px' }}></div>
        </>
    );
}

export default Content;