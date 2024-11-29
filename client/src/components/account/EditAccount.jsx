import styles from "./account.module.css";

import { useState } from "react";

const EditAccount = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, firstName, lastName, phoneNumber });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Paskyros duomenys</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <label htmlFor="phoneNumber" className={styles.label}>
            Telefono numeris
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="email" className={styles.label}>
            El. pašto adresas
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="firstName" className={styles.label}>
            Vardas
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="lastName" className={styles.label}>
            Pavardė
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submit_button}>
          Išsaugoti pakeitimus
        </button>
      </form>
    </div>
  );
};

export default EditAccount;
