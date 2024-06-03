import styles from "./login.module.css";

const Perehod = ({ RunFunction, no_RunFunction }) => {
  return (
    <div className={styles.go}>
      <div className={styles.go_left} onClick={no_RunFunction}>
        <p>вход</p>
        <img src="/svg/open_door.svg" id="img_id_2" />
      </div>
      <div className={styles.go_right} onClick={RunFunction}>
        <p>регистрация</p>
        <img src="/svg/reg_prof.svg" id='img_id_2' />
      </div>
    </div>
  );
};

export default Perehod;
