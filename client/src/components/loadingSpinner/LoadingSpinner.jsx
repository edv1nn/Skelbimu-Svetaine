import styles from "./loadingspinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default LoadingSpinner;
