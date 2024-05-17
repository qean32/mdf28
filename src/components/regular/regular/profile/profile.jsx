import styles from './profile.module.css'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile_ = ({host}) => {
    const navigate = useNavigate();
    const [smailImage, setsmailImage] = useState('')
    const [user, setuser] = useState({})
    const [dota, setdota] = useState()
    const [bascketball, setbascketball] = useState()
    const [cs, setcs] = useState()
    const [dotaCups, setdotaCups] = useState([])
    const [bascketballCups, setbascketballCups] = useState([])
    const [csCups, setcsCups] = useState([])
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
        let response = await fetch(`${host}/api/unification/search/player/${direction}/?user=${id}`, {
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
            SearhPlayer(id, 'dota', setdota, setdotaCups)
            SearhPlayer(id, 'cs', setcs, setcsCups)
            SearhPlayer(id, 'bascketball', setbascketball, setbascketballCups)
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
                        <div className={styles.followers}><img src="/svg/follow.svg" style={{ opacity: 0 }} /></div>
                        <p id={styles.id_2}>{user.status}</p>
                        {user.roles?.length > 0 && <div className={styles.roles}>{user.roles.map((el) => <div style={{ background: `${el.color}` }} className={styles.role}><p>{el.name}</p></div>)}</div>}
                    </div></div>
                </div>
            </div>
            {dota && <div className={styles.content_DOTA}>
                <div className={styles.team_logo} onClick={() => navigate(`/dota/team/${dota.team?.id}`)} style={{ backgroundImage: `url(${dota.team?.logo})` }}></div>
                <div style={{ backgroundImage: `url(${dota.rank?.image})`, transform: 'translateX(-5px)' }} className={styles.rank}></div>
                <div className={styles.DOTA_info}><p>{dota.team?.name}</p>
                    <div className={styles.pos_list}>
                        {dota.position?.length > 0 && dota.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>))}
                        <p style={{ position: 'absolute', bottom: '17px', left: '28px' }}>{dota.generation?.generation_name}</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>контракт</p><span>{dota.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>м.</span></span></div>
                        <div className={styles.value_D}><p>матчей</p><span>{dota.matches}-{dota.win_matches}</span></div>
                        <div className={styles.value_D}><p>турниров</p><span>{dota.tournament}-{dota.win_tournament}</span></div>
                    </div>
                </div>
            </div>}
            {dota && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                <div className={styles.DOTA_info}>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>убийств</p><span>{0}</span></div>
                        <div className={styles.value_D}><p>смертей</p><span>{0}</span></div>
                        <div className={styles.value_D}><p>помощи</p><span>{0}</span></div>
                        <div style={{ display: 'flex', gap: '20px', marginLeft: '30px', marginTop: '35px' }}>
                            <p style={{position: 'absolute', top: '5px'}}>последние герои</p>
                            <div className={styles.hero} style={{backgroundImage: `url(${0})`}}></div>
                            <div className={styles.hero} style={{backgroundImage: `url(${0})`}}></div>
                            <div className={styles.hero} style={{backgroundImage: `url(${0})`}}></div>
                        </div>
                    </div>
                </div>
            </div>}
            {dotaCups.length > 0 && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                {dotaCups.map((el) => <div className={styles.cup} style={{ backgroundImage: `url(${el.image})` }}></div>)}
            </div>}
            {cs && <div className={styles.content_DOTA}>
                <div className={styles.team_logo} onClick={() => navigate(`/cs/team/${cs.team?.id}`)} style={{ backgroundImage: `url(${cs.team?.logo})` }}></div>
                <div style={{ backgroundImage: `url(${cs.rank?.image})`, transform: 'translateX(-15px)', height: '50px', width: '50px' }} className={styles.rank}></div>
                <div className={styles.DOTA_info}><p>{cs.team?.name}</p>
                    <div className={styles.pos_list}>
                        {cs.position.length > 0 && cs.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>))}
                        <p style={{ position: 'absolute', bottom: '17px', left: '28px' }}>{cs.generation?.generation_name}</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>контракт</p><span>{cs.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>м.</span></span></div>
                        <div className={styles.value_D}><p>матчей</p><span>{cs.matches}-{cs.win_matches}</span></div>
                        <div className={styles.value_D}><p>турниров</p><span>{cs.tournament}-{cs.win_tournament}</span></div>
                    </div>
                </div>
            </div>}
            {cs && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                <div className={styles.DOTA_info}>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>убийств</p><span>{0}</span></div>
                        <div className={styles.value_D}><p>смертей</p><span>{0}</span></div>
                        <div className={styles.value_D}><p>помощи</p><span>{0}</span></div>
                        <div style={{marginLeft: '230px'}} className={styles.value_D}><p style={{width: '200px'}}>не учтено матчей</p><span>0</span></div>
                    </div>
                </div>
            </div>}
            {csCups.length > 0 && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                {csCups.map((el) => <div key={el.id} className={styles.cup} style={{ backgroundImage: `url(${el.image})` }}></div>)}
            </div>}
            {bascketball && <div className={styles.content_DOTA}>
                <div className={styles.team_logo} onClick={() => navigate(`/bascketball/team/${bascketball.team?.id}`)} style={{ backgroundImage: `url(${bascketball.team?.logo})` }}></div>
                <div className={styles.rank} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img src="/svg/form_bascketball.svg" style={{ height: '70px' }} /><p style={{ position: 'absolute', color: 'whitesmoke', fontSize: '20px', marginTop: '15px', marginRight: '2px' }}>{bascketball.number}</p></div>
                <div className={styles.DOTA_info}><p>{bascketball.team?.name}</p>
                    <div className={styles.pos_list}>
                        {bascketball.position.length > 0 && bascketball.position?.map((el) => (<div className={styles.pos} style={{ backgroundImage: `url(${el.image_position})` }}></div>))}
                        <p style={{ position: 'absolute', bottom: '17px', left: '28px' }}>{bascketball.generation?.generation_name}</p>
                    </div>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>контракт</p><span>{bascketball.matches_in_offers}<span style={{ fontSize: '16px', marginLeft: '5px' }}>м.</span></span></div>
                        <div className={styles.value_D}><p>матчей</p><span>{bascketball.matches}-{bascketball.win_matches}</span></div>
                        <div className={styles.value_D}><p>турниров</p><span>{bascketball.tournament}-{bascketball.win_tournament}</span></div>
                    </div>
                </div>
            </div>}
            {bascketball && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                <div className={styles.DOTA_info}>
                    <div style={{ display: 'flex', marginLeft: '10px' }}>
                        <div className={styles.value_D}><p>попадания</p><span>{0}</span></div>
                        <div className={styles.value_D}><p>очки</p><span>{0}</span></div>
                        <div className={styles.value_D}><p>защита</p><span>{0}</span></div>
                        <div className={styles.value_D}><p>подборы</p><span>{0}</span></div>
                        <div style={{marginLeft: '120px'}} className={styles.value_D}><p style={{width: '200px'}}>не учтено матчей</p><span>0</span></div>
                    </div>
                </div>
            </div>}
            {bascketballCups.length > 0 && <div className={styles.content_DOTA} style={{ marginBottom: '-5px', borderTopLeftRadius: '0', borderTopRightRadius: '0', flexWrap: 'wrap', marginTop: '0', transform: 'translateY(-15px) translateX(-70px)' }}>
                {bascketballCups.map((el) => <div className={styles.cup} style={{ backgroundImage: `url(${el.image})` }}></div>)}
            </div>}
            <div style={{ height: '60px' }}></div>
        </>
    );
}

export default Profile_;