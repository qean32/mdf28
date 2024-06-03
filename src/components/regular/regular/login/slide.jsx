import styles from "./login.module.css";

const Slide = ({ image, text, id, id_text }) => {
  return (
    <div className={styles.slide}>
      <img src={image} id={id} />
      <p id={id_text}>
        {text}
      </p>
    </div>
  );
};

export default Slide;
