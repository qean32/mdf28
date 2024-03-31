import { useEffect, useState } from 'react'
import styles from './content.module.css'
import { useNavigate } from 'react-router-dom';

const Form = ({ player, stylee }) => {
    let navigate = useNavigate()
    function translit(word) {
        let answer = '';
        let converter = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
            'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
            'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
            'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
            'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
            'э': 'e', 'ю': 'yu', 'я': 'ya',

            'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
            'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
            'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
            'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
            'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch',
            'Ш': 'Sh', 'Щ': 'Sch', 'Ь': '', 'Ы': 'Y', 'Ъ': '',
            'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
        };

        for (let index = 0; index < word.length; index++) {
            if (converter[word[index]] == undefined) {
                answer += word[index];
            } else {
                answer += converter[word[index]];
            }
        }

        return answer;
    }
    const [lastname, setlastname] = useState(false)
    useEffect(() => {
        if (player?.user?.last_name) {
            setlastname(player?.user?.last_name)
        }
    }, [])
    return (
        <div style={stylee}>
            <div onClick={() => navigate(`/profile/${player?.user?.id}`)} className={styles.player}>
                <img src='/svg/form_.svg' /><p style={{ position: 'absolute', color: 'whitesmoke', fontSize: '16px' }}>{lastname && translit(lastname)}</p>
            </div>
        </div>
    );
}

export default Form;