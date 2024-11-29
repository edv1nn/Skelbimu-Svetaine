import styles from "./account.module.css";

import { useState } from "react";

const Address = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [county, setCounty] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address saved:", {
      name,
      surname,
      phone,
      address,
      city,
      county,
      postalCode,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pristatymo adresas</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_group}>
          <label htmlFor="name" className={styles.label}>
            Vardas *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="surname" className={styles.label}>
            Pavardė *
          </label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="phone" className={styles.label}>
            Telefonas *
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_group}>
          <label className={styles.label}>Šalis *</label>
          <p className={styles.country}>Lietuva</p>
        </div>

        <div className={styles.input_group}>
          <label htmlFor="address" className={styles.label}>
            Adresas *
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className={styles.input}
            placeholder="Gatvės pavadinimas ir namo numeris"
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="city" className={styles.label}>
            Miestas *
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="county" className={styles.label}>
            Apskritis *
          </label>
          <input
            type="text"
            id="county"
            value={county}
            onChange={(e) => setCounty(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.input_group}>
          <label htmlFor="postalCode" className={styles.label}>
            Pašto kodas *
          </label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.submit_button}>
          Išsaugoti adresą
        </button>
      </form>
    </div>
  );
};

export default Address;
