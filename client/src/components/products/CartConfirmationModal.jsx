import styles from "./productdetail.module.css";

import { useEffect } from "react";

const CartConfirmationModal = ({ show, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className={styles.modal_overlay} role="dialog" aria-modal="true">
      <div className={styles.modal_content}>
        <header className={styles.modal_header}>
          <div className={styles.checkmark_container}>
            <div className={styles.checkmark_circle}>
              <span className={styles.checkmark}>✓</span>
            </div>
            <p className={styles.confirmation_text}>Prekė įdėta į krepšelį</p>
          </div>
          <button
            className={styles.close_button}
            onClick={onClose}
            aria-label="Close modal"
          >
            ✖
          </button>
        </header>
        <div className={styles.modal_body}></div>
        <footer className={styles.modal_actions}>
          <button className={styles.continue_button} onClick={onClose}>
            Tęsti apsipirkimą
          </button>
          <button
            className={styles.cart_button}
            onClick={() => (window.location.href = "/cart")}
          >
            Į krepšelį
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CartConfirmationModal;
