import styles from "./footer.module.css";

import footerLogo from "../../images/logo.webp";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer_inner}>
          <div className={styles.logo_container}>
            <img
              src={footerLogo}
              alt="Footer Logo"
              className={styles.footer_logo}
            />
          </div>

          <div className={styles.footer_content}>
            <div className={styles.social_icons}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className={styles.social_icon} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className={styles.social_icon} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className={styles.social_icon} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaPinterestP className={styles.social_icon} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className={styles.social_icon} />
              </a>
            </div>

            <p className={styles.subscription_text}>
              Norite informacijos apie išpardavimus, renginius ir dar daugiau?
              <br />
              Užsiregistruok!
            </p>

            <form className={styles.subscription}>
              <input
                className={styles.subscription_email}
                type="email"
                placeholder="Email"
                required
              />
              <button className={styles.button} type="submit">
                Pateikti
              </button>
            </form>
          </div>

          <p className={styles.copyright}>
            Mėgaukitės kiekvienu geriausios kavos gurkšniu.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
