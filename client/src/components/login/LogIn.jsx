import styles from "./login.module.css";
import logo from "../../images/logo.webp";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cartContext/CartContext";
import { RxCross2 } from "react-icons/rx";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineError } from "react-icons/md";
import { GoogleLogin } from "@react-oauth/google";

const LogIn = ({ setShowLogin, setUserName }) => {
  const { url, setToken } = useCart();
  const [currState, setCurrState] = useState("Prisijungti");
  const [data, setData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loginPassword, setLoginPassword] = useState(""); // Separate state for login password
  const [registrationPassword, setRegistrationPassword] = useState(""); // Separate state for registration password
  const [registrationConfirmPassword, setRegistrationConfirmPassword] =
    useState(""); // Separate state for confirm password
  const [isVisible, setIsVisible] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false); // For toggling login password visibility
  const [showRegistrationPassword, setShowRegistrationPassword] =
    useState(false); // For toggling registration password visibility
  const [errorMessage, setErrorMessage] = useState("");
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (
      currState === "Registruotis" &&
      (!data.name.trim() ||
        !data.surname.trim() ||
        registrationPassword !== registrationConfirmPassword)
    ) {
      setErrorMessage(
        "Klaida: Prašome įvesti vardą, pavardę ir patvirtinti slaptažodį."
      );
      return;
    }

    const endpoint =
      currState === "Prisijungti" ? "/api/user/login" : "/api/user/register";
    const newUrl = `${url}${endpoint}`;

    try {
      const response = await axios.post(newUrl, {
        ...data,
        password:
          currState === "Prisijungti" ? loginPassword : registrationPassword, // Use the appropriate password
      });

      if (response.data.success) {
        const { token } = response.data;
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem(
          "userName",
          currState === "Registruotis"
            ? `${data.name} ${data.surname}`
            : data.email
        );
        setUserName(`${data.name} ${data.surname}` || data.email);
        navigate("/mano-paskyra/edit-account");
        closePopup();
      } else {
        setErrorMessage(
          "Neteisingai įvedėte savo el.paštą/slaptažodį arba jūsų slaptažodis nebegalioja"
        );
      }
    } catch (error) {
      setErrorMessage("Server error, please try again.");
    }
  };

  const onPasswordReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/reset-password`, {
        email: data.email,
      });

      if (response.data.success) {
        setErrorMessage("Nuoroda slaptažodžiui atkurti išsiųsta į el. paštą.");
      } else {
        setErrorMessage("Toks el.paštas nerastas.");
      }
    } catch (error) {
      setErrorMessage("Server error, please try again.");
    }
  };

  const handleGoogleLogin = async (response) => {
    const token = response.credential;

    try {
      const res = await axios.post(`${url}/api/auth/google`, { token });

      if (res.data.success) {
        const { token, userName } = res.data;
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userName", userName);
        setUserName(userName);
        navigate("/mano-paskyra/orders");
        closePopup();
      } else {
        setErrorMessage(
          "Neteisingai įvedėte savo el.paštą/slaptažodį arba jūsų slaptažodis nebegalioja"
        );
      }
    } catch (error) {
      setErrorMessage("Google authentication failed.");
    }
  };

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      closePopup();
    }
  };

  const closePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowLogin(false);
      document.body.style.overflow = "auto";
    }, 300);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleOutsideClick);
    setTimeout(() => setIsVisible(true), 10);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const errorIconSize = errorMessage.length < 30 ? 24 : 40;

  return (
    <div
      className={`${styles.login_popup} ${isVisible ? styles.visible : styles.hidden
        }`}
    >
      <form
        ref={popupRef}
        className={styles.login_popup_container}
        onSubmit={
          currState === "Atkurti Slaptažodį" ? onPasswordReset : onLogin
        }
      >
        <RxCross2
          className={styles.close_icon}
          color="#fff"
          onClick={closePopup}
        />
        <div className={styles.login_popup_title}>
          <div className={styles.title_container}>
            <img src={logo} style={{ width: 120, height: 70 }} alt="Logo" />
            <h2>{currState}</h2>
          </div>
        </div>
        <div className={styles.login_popup_inputs}>
          {errorMessage && (
            <div className={styles.error_message}>
              <MdOutlineError
                className={styles.error_icon}
                size={errorIconSize}
              />
              {errorMessage}
            </div>
          )}
          {currState === "Registruotis" && (
            <>
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Vardas"
                required
                onFocus={() => setErrorMessage("")}
              />
              <input
                name="surname"
                onChange={onChangeHandler}
                value={data.surname}
                type="text"
                placeholder="Pavardė"
                required
                onFocus={() => setErrorMessage("")}
              />
            </>
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="El. paštas"
            required
            onFocus={() => setErrorMessage("")}
          />
          {/* Show password field only in "Prisijungti" state */}
          {currState === "Prisijungti" && (
            <div className={styles.password_container}>
              <input
                name="loginPassword" // New name for the login password
                onChange={(e) => setLoginPassword(e.target.value)} // Update login password state
                value={loginPassword} // Use the separate login password state
                type={showLoginPassword ? "text" : "password"}
                placeholder="Slaptažodis"
                required
                onFocus={() => setErrorMessage("")}
              />
              <span
                className={styles.password_toggle_icon}
                onClick={() => setShowLoginPassword((prev) => !prev)}
              >
                {showLoginPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </span>
            </div>
          )}
          {currState === "Registruotis" && (
            <div className={styles.password_container}>
              <input
                name="registrationPassword" // New name for the registration password
                onChange={(e) => setRegistrationPassword(e.target.value)} // Update registration password state
                value={registrationPassword} // Use the separate registration password state
                type={showRegistrationPassword ? "text" : "password"}
                placeholder="Slaptažodis"
                required
                onFocus={() => setErrorMessage("")}
              />
              <span
                className={styles.password_toggle_icon}
                onClick={() => setShowRegistrationPassword((prev) => !prev)}
              >
                {showRegistrationPassword ? (
                  <IoEyeOutline />
                ) : (
                  <IoEyeOffOutline />
                )}
              </span>
            </div>
          )}
          {currState === "Registruotis" && (
            <div className={styles.password_container}>
              <input
                name="registrationConfirmPassword" // New name for confirm password
                onChange={(e) => setRegistrationConfirmPassword(e.target.value)} // Update confirm password state
                value={registrationConfirmPassword} // Use the separate confirm password state
                type="password"
                placeholder="Pakartok Slaptažodį"
                required
                onFocus={() => setErrorMessage("")}
              />
              <span
                className={styles.password_toggle_icon}
                onClick={() => setShowRegistrationPassword((prev) => !prev)}
              >
                {showRegistrationPassword ? (
                  <IoEyeOutline />
                ) : (
                  <IoEyeOffOutline />
                )}
              </span>
            </div>
          )}
          {currState === "Prisijungti" && (
            <p
              className={styles.forgot_password}
              onClick={() => setCurrState("Atkurti Slaptažodį")}
            >
              Praradote savo slaptažodį?
            </p>
          )}
        </div>
        <button type="submit">
          {currState === "Registruotis"
            ? "Registruotis"
            : currState === "Atkurti Slaptažodį"
              ? "Atkurti slaptažodį"
              : "Prisijungti"}
        </button>
        {currState === "Prisijungti" && (
          <>
            <span className={styles.additional_text}>
              arba prisijungti vienu paspaudimu su
            </span>
            <div className={styles.google_login_container}>
              <GoogleLogin onSuccess={handleGoogleLogin} />
            </div>
            <p>
              Dar neturi paskyros?
              <span
                className={styles.link}
                onClick={() => setCurrState("Registruotis")}
              >
                Registruotis
              </span>
            </p>
          </>
        )}
        {currState === "Registruotis" && (
          <p>
            Jau turi paskyrą?
            <span
              className={styles.link}
              onClick={() => setCurrState("Prisijungti")}
            >
              Prisijungti
            </span>
          </p>
        )}
        {currState === "Atkurti Slaptažodį" && (
          <p>
            Grįžti į
            <span
              className={styles.link}
              onClick={() => setCurrState("Prisijungti")}
            >
              Prisijungti
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LogIn;
