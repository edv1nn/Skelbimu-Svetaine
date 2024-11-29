import styles from "./errorpage.module.css";

import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={styles.error} role="alert">
      <h1 className={styles.error_code}>404 – puslapis nerastas</h1>
      <p className={styles.error_message}>
        Šis puslapis, kurio ieškote, galėjo būti pašalintas, pavadinimas
        pasikeitė arba jis laikinai nepasiekiamas.
      </p>
      <Link to="/" className="button" aria-label="Grįžti į pagrindinį puslapį">
        Grįžti į pagrindinį puslapį
      </Link>
    </div>
  );
};

export default ErrorPage;
