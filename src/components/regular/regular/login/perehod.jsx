import styles from "./content.module.css";

const Perehod = ({ go, nogo }) => {
  return (
    <div className={styles.go}>
      <div className={styles.go_left} onClick={nogo}>
        <p>вход</p>
        <img src="/mdf28/svg/open_door.svg" id="img_id_2" />
      </div>
      <div className={styles.go_right} onClick={go}>
        <p>регистрация</p>
        <img src="/mdf28/svg/reg_prof.svg" id='img_id_2' />
      </div>
    </div>
  );
};

export default Perehod;
