import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Content = () => {
    const navigate = useNavigate();
    const [smailImage, setsmailImage] = useState('')
    const [UsInfo, setUsinfo] = useState({})
    const [UsInfoDOTA, setUsinfoDOTA] = useState()
    const [UsInfoBASCLETBALL, setUsinfoBASCKETBALL] = useState()
    const [UsInfoCS, setUsinfoCS] = useState()
    const [cupsDOTA, setcupsDOTA] = useState([])
    const [cupsBASCLETBALL, setcupsBASCKETBALL] = useState([])
    const [cupsCS, setcupsCS] = useState([])
    let { id } = useParams()
    let SearhUser = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/users/search/user/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0].smail) {
            setsmailImage(data.results[0].smail.image)
        }
        setUsinfo(data.results[0])
    }
    let SearhDOTA = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/dota/search/player/?user=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data?.results[0]?.cups) {
            setUsinfoDOTA(data.results[0])
            setcupsDOTA(data.results[0].cups)
        }
    }
    let SearhCS = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/cs/search/player/?user=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data?.results[0]?.cups) {
            setcupsCS(data.results[0].cups)
            setUsinfoCS(data.results[0])
        }
    }
    let SearhBASCKETBALL = async (id) => {
        let response = await fetch(`https://mdf28server.site/api/bascketball/search/player/?user=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data?.results[0]?.cups) {
            setUsinfoBASCKETBALL(data.results[0])
            setcupsBASCKETBALL(data.results[0].cups)
        }
    }
    useEffect(() => {
        SearhUser(id)
    }, [])
    useEffect(() => {
        if (UsInfo) {
            SearhDOTA(id)
            SearhCS(id)
            SearhBASCKETBALL(id)
        }
    }, [UsInfo])
    return (
        <>
            <div className={styles.content}>
                {UsInfo.steam && <p className={styles.steam}><img src='/mdf28/svg/steam.svg' />{UsInfo.steam}</p>}
                <div className={styles.back} style={{ backgroundImage: `url(${UsInfo.background})` }}>
                </div>
                <div className={styles.us_info}>
                    <div className={styles.ava} style={{ backgroundImage: `url(${UsInfo.ava})` }}></div>
                    <div className={styles.info}><div>
                        <div>
                            <p id={styles.id_1}>{UsInfo.first_name} {UsInfo.last_name}</p>
                            <div className={styles.smail} style={{ backgroundImage: `url(${smailImage})` }}></div>
                        </div>
                        <div className={styles.followers}><img src="/mdf28/svg/follow.svg" /></div>
                        <p id={styles.id_2}>{UsInfo.status}</p>
                        {UsInfo.roles?.length > 0 && <div className={styles.roles}>{UsInfo.roles.map((el) => <div style={{ background: `${el.color}` }} className={styles.role}><p>{el.name}</p></div>)}</div>}
                    </div></div>
                </div>
            </div>
            {UsInfoDOTA && <div className={styles.content_DOTA}>
                <div className={styles.team_logo} onClick={() => navigate(`/dota/team/${UsInfoDOTA.team?.id}`)} style={{ backgroundImage: `url(${UsInfoDOTA.team?.logo})` }}></div>
                <div style={{ backgroundImage: `url(${UsInfoDOTA.rank?.image_rank})`,transform: 'translateX(-7px)' }} className={styles.rank}></div>
                <div className={styles.DOTA_info}><p>{UsInfoDOTA.team?.team_name}</p>
                    <div className={styles.pos_list}>
                        {UsInfoDOTA.position?.length > 0 && UsInfoDOTA.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>))}
                        <p style={{ position: 'absolute', bottom: '17px', left: '28px' }}>{UsInfoDOTA.generation?.generation_name}</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>контракт</p><span>{UsInfoDOTA.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>м.</span></span></div>
                        <div className={styles.value_D}><p>матчей</p><span>{UsInfoDOTA.matches}-{UsInfoDOTA.win_matches}</span></div>
                        <div className={styles.value_D}><p>турниров</p><span>{UsInfoDOTA.tournament}-{UsInfoDOTA.win_tournament}</span></div>
                    </div>
                </div>
            </div>}
            {cupsDOTA.length > 0 && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                {cupsDOTA.map((el) => <div className={styles.cup} style={{ backgroundImage: `url(${el.image})` }}></div>)}
            </div>}
            {UsInfoCS && <div className={styles.content_DOTA}>
                <div className={styles.team_logo}  onClick={() => navigate(`/cs/team/${UsInfoCS.team?.id}`)} style={{ backgroundImage: `url(${UsInfoCS.team?.logo})` }}></div>
                <div style={{ backgroundImage: `url(${UsInfoCS.rank?.image_rank})` ,transform: 'translateX(-17px)' ,height: '55px',width: '55px'}} className={styles.rank}></div>
                <div className={styles.DOTA_info}><p>{UsInfoCS.team?.team_name}</p>
                    <div className={styles.pos_list}>
                        {UsInfoCS.position.length > 0 && UsInfoCS.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>))}
                        <p style={{ position: 'absolute', bottom: '17px', left: '28px' }}>{UsInfoCS.generation?.generation_name}</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>контракт</p><span>{UsInfoCS.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>м.</span></span></div>
                        <div className={styles.value_D}><p>матчей</p><span>{UsInfoCS.matches}-{UsInfoCS.win_matches}</span></div>
                        <div className={styles.value_D}><p>турниров</p><span>{UsInfoCS.tournament}-{UsInfoCS.win_tournament}</span></div>
                    </div>
                </div>
            </div>}
            {cupsCS.length > 0 && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                {cupsCS.map((el) => <div className={styles.cup} style={{ backgroundImage: `url(${el.image})` }}></div>)}
            </div>}
            {UsInfoBASCLETBALL && <div className={styles.content_DOTA}>
                <div className={styles.team_logo}  onClick={() => navigate(`/bascketball/team/${UsInfoBASCLETBALL.team?.id}`)} style={{ backgroundImage: `url(${UsInfoBASCLETBALL.team?.logo})` }}></div>
                <div className={styles.rank} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img src="/svg/form_bascketball.svg" style={{ height: '70px'}} /><p style={{ position: 'absolute',color: 'whitesmoke', fontSize: '20px',marginTop: '15px',marginRight: '2px'}}>{UsInfoBASCLETBALL.number}</p></div>
                <div className={styles.DOTA_info}><p>{UsInfoBASCLETBALL.team?.team_name}</p>
                    <div className={styles.pos_list}>
                        {UsInfoBASCLETBALL.position.length > 0 && UsInfoBASCLETBALL.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>))}
                        <p style={{ position: 'absolute', bottom: '17px', left: '28px' }}>{UsInfoBASCLETBALL.generation?.generation_name}</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>контракт</p><span>{UsInfoBASCLETBALL.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>м.</span></span></div>
                        <div className={styles.value_D}><p>матчей</p><span>{UsInfoBASCLETBALL.matches}-{UsInfoBASCLETBALL.win_matches}</span></div>
                        <div className={styles.value_D}><p>турниров</p><span>{UsInfoBASCLETBALL.tournament}-{UsInfoBASCLETBALL.win_tournament}</span></div>
                    </div>
                </div>
            </div>}
            {cupsBASCLETBALL.length > 0 && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                {cupsBASCLETBALL.map((el) => <div className={styles.cup} style={{ backgroundImage: `url(${el.image})` }}></div>)}
            </div>}
            <div style={{ height: '60px' }}></div>
        </>
    );
}

export default Content;