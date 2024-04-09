import styles from './content.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Content = () => {
    let host = 'https://mdf28server.site'
    const navigate = useNavigate();
    const [smailImage, setsmailImage] = useState('')
    const [user, setuser] = useState({})
    const [userDOTA, setuserDOTA] = useState()
    const [userBASCLETBALL, setuserBASCKETBALL] = useState()
    const [userCS, setuserCS] = useState()
    const [cupsDOTA, setcupsDOTA] = useState([])
    const [cupsBASCLETBALL, setcupsBASCKETBALL] = useState([])
    const [cupsCS, setcupsCS] = useState([])
    let { id } = useParams()
    let SearhUser = async (id) => {
        let response = await fetch(`${host}/api/users/search/user/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data.results[0].smail) {
            setsmailImage(data.results[0].smail.image)
        }
        setuser(data.results[0])
    }
    let SearhPlayer = async (id, direction, set, setCUPS) => {
        let response = await fetch(`${host}/api/${direction}/search/player/?user=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        if (data?.results[0]?.cups) {
            set(data.results[0])
            setCUPS(data.results[0].cups)
        }
    }
    useEffect(() => {
        SearhUser(id)
    }, [])
    useEffect(() => {
        if (user) {
            SearhPlayer(id, 'dota', setuserDOTA, setcupsDOTA)
            SearhPlayer(id, 'cs', setuserCS, setcupsCS)
            SearhPlayer(id, 'bascketball', setuserBASCKETBALL, setcupsBASCKETBALL)
        }
    }, [user])
    return (
        <>
            <div className={styles.content}>
                {user.steam && <p className={styles.steam}><img src='/svg/steam.svg' />{user.steam}</p>}
                <div className={styles.back} style={{ backgroundImage: `url(${user.background})` }}>
                </div>
                <div className={styles.us_info}>
                    <div className={styles.ava} style={{ backgroundImage: `url(${user.ava})` }}></div>
                    <div className={styles.info}><div>
                        <div>
                            <p id={styles.id_1}>{user.first_name} {user.last_name}</p>
                            <div className={styles.smail} style={{ backgroundImage: `url(${smailImage})` }}></div>
                        </div>
                        <div className={styles.followers}><img src="/svg/follow.svg" style={{opacity: 0}}/></div>
                        <p id={styles.id_2}>{user.status}</p>
                        {user.roles?.length > 0 && <div className={styles.roles}>{user.roles.map((el) => <div style={{ background: `${el.color}` }} className={styles.role}><p>{el.name}</p></div>)}</div>}
                    </div></div>
                </div>
            </div>
            {userDOTA && <div className={styles.content_DOTA}>
                <div className={styles.team_logo} onClick={() => navigate(`/dota/team/${userDOTA.team?.id}`)} style={{ backgroundImage: `url(${userDOTA.team?.logo})` }}></div>
                <div style={{ backgroundImage: `url(${userDOTA.rank?.image_rank})`,transform: 'translateX(-7px)' }} className={styles.rank}></div>
                <div className={styles.DOTA_info}><p>{userDOTA.team?.team_name}</p>
                    <div className={styles.pos_list}>
                        {userDOTA.position?.length > 0 && userDOTA.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>))}
                        <p style={{ position: 'absolute', bottom: '17px', left: '28px' }}>{userDOTA.generation?.generation_name}</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>контракт</p><span>{userDOTA.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>м.</span></span></div>
                        <div className={styles.value_D}><p>матчей</p><span>{userDOTA.matches}-{userDOTA.win_matches}</span></div>
                        <div className={styles.value_D}><p>турниров</p><span>{userDOTA.tournament}-{userDOTA.win_tournament}</span></div>
                    </div>
                </div>
            </div>}
            {cupsDOTA.length > 0 && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                {cupsDOTA.map((el) => <div className={styles.cup} style={{ backgroundImage: `url(${el.image})` }}></div>)}
            </div>}
            {userCS && <div className={styles.content_DOTA}>
                <div className={styles.team_logo}  onClick={() => navigate(`/cs/team/${userCS.team?.id}`)} style={{ backgroundImage: `url(${userCS.team?.logo})` }}></div>
                <div style={{ backgroundImage: `url(${userCS.rank?.image_rank})` ,transform: 'translateX(-20px)' ,height: '50px',width: '50px'}} className={styles.rank}></div>
                <div className={styles.DOTA_info}><p>{userCS.team?.team_name}</p>
                    <div className={styles.pos_list}>
                        {userCS.position.length > 0 && userCS.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>))}
                        <p style={{ position: 'absolute', bottom: '17px', left: '28px' }}>{userCS.generation?.generation_name}</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>контракт</p><span>{userCS.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>м.</span></span></div>
                        <div className={styles.value_D}><p>матчей</p><span>{userCS.matches}-{userCS.win_matches}</span></div>
                        <div className={styles.value_D}><p>турниров</p><span>{userCS.tournament}-{userCS.win_tournament}</span></div>
                    </div>
                </div>
            </div>}
            {cupsCS.length > 0 && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                {cupsCS.map((el) => <div className={styles.cup} style={{ backgroundImage: `url(${el.image})` }}></div>)}
            </div>}
            {userBASCLETBALL && <div className={styles.content_DOTA}>
                <div className={styles.team_logo}  onClick={() => navigate(`/bascketball/team/${userBASCLETBALL.team?.id}`)} style={{ backgroundImage: `url(${userBASCLETBALL.team?.logo})` }}></div>
                <div className={styles.rank} style={{display: 'flex', alignItems: 'center', justifyContent: 'center',transform: 'translateX(-10px)'}}><img src="/svg/form_bascketball.svg" style={{ height: '70px'}} /><p style={{ position: 'absolute',color: 'whitesmoke', fontSize: '20px',marginTop: '15px',marginRight: '2px'}}>{userBASCLETBALL.number}</p></div>
                <div className={styles.DOTA_info}><p>{userBASCLETBALL.team?.team_name}</p>
                    <div className={styles.pos_list}>
                        {userBASCLETBALL.position.length > 0 && userBASCLETBALL.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>))}
                        <p style={{ position: 'absolute', bottom: '17px', left: '28px' }}>{userBASCLETBALL.generation?.generation_name}</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>контракт</p><span>{userBASCLETBALL.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>м.</span></span></div>
                        <div className={styles.value_D}><p>матчей</p><span>{userBASCLETBALL.matches}-{userBASCLETBALL.win_matches}</span></div>
                        <div className={styles.value_D}><p>турниров</p><span>{userBASCLETBALL.tournament}-{userBASCLETBALL.win_tournament}</span></div>
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