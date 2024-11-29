import styles from "./account.module.css";

import { NavLink, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <div className={styles.account_container}>
      <h2 className={styles.account_title}>Mano Paskyra</h2>
      <ul className={styles.account_list}>
        <li>
          <NavLink
            to="/mano-paskyra/orders"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Užsakymai
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mano-paskyra/edit-address"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Adresas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mano-paskyra/edit-account"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Paskyros duomenys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/mano-paskyra/change-password"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Slaptažodis
          </NavLink>
        </li>
      </ul>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
