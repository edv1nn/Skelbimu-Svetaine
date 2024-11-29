import styles from "./info.module.css";

import beans from "../../images/info/coffee_bean.png";
import cup from "../../images/info/cup.png";

const Info = () => {
  return (
    <section className={styles.info} aria-labelledby="info-title">
      <div className="container">
        <div className={styles.info_inner}>
          <div className={styles.info_text}>
            <h2 id="info-title">Gaukite galimybę praleisti nuostabų rytą</h2>
            <p>
              Mes suteikiame jums vienkartinę galimybę patirti geresnį gyvenimą
              su kava.
            </p>
            <button className="button">Užsisakykite Dabar</button>
          </div>
          <div className={styles.info_images}>
            <img
              src={cup}
              alt="Coffee cup"
              className={styles.cup_image}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <img
        src={beans}
        alt="Coffee beans"
        className={styles.beans_corner}
        loading="lazy"
      />
    </section>
  );
};

export default Info;
