import styles from "./productdetail.module.css";

import { Link } from "react-router-dom";

const Breadcrumbs = ({ paths }) => {
  return (
    <nav className={styles.breadcrumbs} aria-label="Breadcrumbs">
      {paths.map((path, index) => (
        <span key={index}>
          <Link to={path.link} className={styles.breadcrumb_link}>
            {path.title}
          </Link>
          {index < paths.length - 1 && (
            <span className={styles.separator} aria-hidden="true">
              {" | "}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
