import styles from './edit_structure.module.css'
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import context from '../../../../connections/context';

const Edit_structure = ({host, direction, str_direction, Player_}) => {
    let { id } = useParams()
    let { user } = useContext(context)
    const [info, setinfo] = useState({})
    const [players, setplayers] = useState([])
    let Searh = async (id) => {
        let response = await fetch(`${host}/api/unification/search/team/?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setinfo(data.results[0])
    }
    useEffect(() => {
        Searh(id)
        SearchPlayer(id)
    }, [])
    useEffect(() => {
        if (info.director?.id) {
            if (user.user_id != info.director?.id) {
                alert('как ты сюда попал?')
                navigate('/')
            }
        }
    }, [info])
    let SearchPlayer = async (id) => {
        let response = await fetch(`${host}/api/unification/search/player/?team=${id}&offset=0&limit=16`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let data = await response.json()
        setplayers(data.results)
    }
    return (
        <>
            <div className={styles.content} style={{ marginTop: '40px', paddingTop: '20px' }}>
                {players.map((el) => <Player_ idteam={info.id} el={el} />)}
            </div>
            <div style={{ height: '40px' }}></div>
        </>
    );
}

export default Edit_structure;