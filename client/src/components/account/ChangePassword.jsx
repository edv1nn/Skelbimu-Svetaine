import styles from "./account.module.css";
import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import { MdOutlineCheck } from "react-icons/md";
import { AiOutlineExclamation } from "react-icons/ai";

const ChangePassword = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Naujas slaptažodis ir patvirtinimas nesutampa.");
      setSuccess(false);
      return;
    }

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage("Nepavyko pakeisti slaptažodžio.");
      setSuccess(false);
    }
  };

  return (
    <div className={styles.container}>
      {message && (
        <div
          className={
            success ? styles.success_notification : styles.error_notification
          }
        >
          <span className={styles.checkmark}>
            {success ? (
              <MdOutlineCheck className={styles.successIcon} />
            ) : (
              <AiOutlineExclamation className={styles.errorIcon} />
            )}
          </span>
          <p>{success ? "Slaptažodis sėkmingai pakeistas!" : message}</p>
        </div>
      )}
      <h2 className={styles.title}>Slaptažodžio keitimas</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <label htmlFor="currentPassword" className={styles.label}>
            Esamas slaptažodis (nieko nerašykite, jei nenorite jo keisti)
          </label>
          <div className={styles.input_wrapper}>
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className={styles.input}
            />
            <button
              type="button"
              className={styles.eye_button}
              onClick={toggleCurrentPasswordVisibility}
            >
              {showCurrentPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>

        <div className={styles.input_group}>
          <label htmlFor="newPassword" className={styles.label}>
            Naujas slaptažodis
          </label>
          <div className={styles.input_wrapper}>
            <input
              type={showNewPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className={styles.input}
            />
            <button
              type="button"
              className={styles.eye_button}
              onClick={toggleNewPasswordVisibility}
            >
              {showNewPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>

        <div className={styles.input_group}>
          <label htmlFor="confirmPassword" className={styles.label}>
            Patvirtinti naują slaptažodį
          </label>
          <div className={styles.input_wrapper}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={styles.input}
            />
            <button
              type="button"
              className={styles.eye_button}
              onClick={toggleConfirmPasswordVisibility}
            >
              {showConfirmPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
            </button>
          </div>
        </div>

        <button type="submit" className={styles.submit_button}>
          Išsaugoti pakeitimus
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
