import styles from "./navbar.module.css";
import { assets } from "../../images/assets.js";
const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <img
        className="logo"
        src={assets.logo}
        width={150}
        height={100}
        alt="Logo"
      />
      <img className="profile" src={assets.profile_image} alt="Profile Image" />
    </nav>
  );
};

export default NavBar;
