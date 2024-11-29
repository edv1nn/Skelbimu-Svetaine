import styles from "./header.module.css";
import logo from "../../images/logo.webp";
import userIcon from "../../images/header/user.webp";
import cartIcon from "../../images/header/cart.webp";
import { CiSearch } from "react-icons/ci";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../cartContext/CartContext.jsx";
import {
  headerLinksData,
  headerLinksDataBottom,
  OurItems,
} from "../../data/data.js";
import { useState, useRef, useEffect } from "react";

// Ad Creation Modal Component
const AdCreationModal = ({ showModal, setShowModal }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleClose = () => {
    setShowModal(false); // Close modal
  };

  const handleCreateAd = () => {
    // Handle ad creation logic (you might want to send this data to an API)
    console.log("Ad created:", { productName, productDescription, productPrice });
    setShowModal(false); // Close modal after creating ad
  };

  return (
    showModal && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <h2>Create Product Ad</h2>
          <label>
            Product Name:
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
            />
          </label>
          <label>
            Description:
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter product description"
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="Enter product price"
            />
          </label>
          <button onClick={handleCreateAd}>Create Ad</button>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    )
  );
};

const Header = ({ setShowLogin }) => {
  const [active, setActive] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false); // State for the modal visibility
  const navigate = useNavigate();
  const { cartItems, token, setToken } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const dropdownRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken("");
    setUserName("");
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = OurItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredItems([]);
      setIsDropdownOpen(false);
    }
  };

  const handleDropdownClose = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDropdownClose);
    return () => {
      document.removeEventListener("mousedown", handleDropdownClose);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredItems.length > 0) {
      navigate(filteredItems[0].to);
      setSearchQuery("");
      setIsDropdownOpen(false);
    }
  };

  const handleDropdownItemClick = (item) => {
    navigate(item.to);
    setSearchQuery("");
    setIsDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const truncateUsername = (username) => {
    if (username.length > 10) {
      return username.slice(0, 10) + "...";
    }
    return username;
  };

  const handleProfileMenuClick = (path) => {
    navigate(path);
    setIsProfileMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header_inner}>
          <div className={styles.header_info_left}>
            <NavLink to="/" aria-label="Home">
              <img src={logo} alt="Logo" style={{ width: 150, height: 90 }} />
              <span>Skelbimų Svetainė</span>
            </NavLink>
            <ul className={active ? styles.activeList : ""}></ul>
          </div>

          <div className={styles.header_menu}>
            <NavLink to="/cart" aria-label="View cart"></NavLink>

            {/* Create Ad Button */}
            <button
              onClick={() => setShowModal(true)}
              className={styles.createAdButton}
            >
              Create Product Ad
            </button>

            {!token ? (
              <button
                className={styles.cart_login_button}
                onClick={() => setShowLogin(true)}
                aria-label="Login"
              >
                <img src={userIcon} width={35} height={35} alt="Account Icon" />
                <span>Profilis</span>
              </button>
            ) : (
              <div className={styles.header_profile}>
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                    src={userIcon}
                    width={35}
                    height={35}
                    alt="Profile Icon"
                    onClick={handleProfileClick}
                  />
                  <span className={styles.status_dot}></span>
                </div>
                <span onClick={handleProfileClick} className={styles.user_name}>
                  <span style={{ color: "white", display: "block" }}>
                    Sveiki,
                  </span>
                  <span style={{ color: "white" }}>
                    {truncateUsername(userName)}
                  </span>
                </span>
                {isProfileMenuOpen && (
                  <ul
                    className={styles.header_profile_dropdown}
                    ref={profileMenuRef}
                    role="menu"
                  >
                    <li
                      role="none"
                      onClick={() =>
                        handleProfileMenuClick("/mano-paskyra/orders")
                      }
                    >
                      <p role="menuitem">Užsakymai</p>
                    </li>
                    <li
                      role="none"
                      onClick={() =>
                        handleProfileMenuClick("/mano-paskyra/edit-address")
                      }
                    >
                      <p role="menuitem">Adresai</p>
                    </li>
                    <li
                      role="none"
                      onClick={() =>
                        handleProfileMenuClick("/mano-paskyra/edit-account")
                      }
                    >
                      <p role="menuitem">Paskyros Duomenys</p>
                    </li>
                    <li
                      role="none"
                      onClick={() =>
                        handleProfileMenuClick("/mano-paskyra/change-password")
                      }
                    >
                      <p role="menuitem">Slaptažodis</p>
                    </li>
                    <li onClick={logout} className={styles.logout} role="none">
                      <p role="menuitem">Atsijungti</p>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <AdCreationModal showModal={showModal} setShowModal={setShowModal} />
    </header>
  );
};

export default Header;
