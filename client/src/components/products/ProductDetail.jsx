import styles from "./productdetail.module.css";
import PriceRating from "../priceRating/PriceRating.jsx";
import NumberInput from "../numberInput/NumberInput.jsx";
import CartConfirmationModal from "./CartConfirmationModal.jsx";
import Breadcrumbs from "./Breadcrumbs.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { OurItems, coffeeMachine } from "../../data/data";
import { useCart } from "../../components/cartContext/CartContext";
import { FaPlus } from "react-icons/fa";
import { TbTruckDelivery, TbShoppingBagCheck } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdEnergySavingsLeaf } from "react-icons/md";

const ProductDetail = () => {
  const { id } = useParams();
  const isCoffeeMachine =
    window.location.pathname.startsWith("/coffee-machine");
  const product = isCoffeeMachine
    ? coffeeMachine.find((item) => item.id === parseInt(id))
    : OurItems.find((item) => item.id === parseInt(id));

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [buttonState, setButtonState] = useState("default");
  const [expandedItems, setExpandedItems] = useState([]);
  const { addToCart } = useCart();
  const [showReviews, setShowReviews] = useState(true);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product]);

  const handleThumbnailClick = (index) => {
    setIsImageTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsImageTransitioning(false);
    }, 300);
  };

  const handleSubmit = () => {
    if (review.trim() && rating > 0) {
      setReviews((prevReviews) => [
        ...prevReviews,
        { id: product.id, rating, text: review },
      ]);
      setReview("");
      setRating(0);
    } else {
      alert(
        "Prašome parašyti atsiliepimą ir pasirinkti vertinimą prieš siunčiant."
      );
    }
  };

  const handleAddToCart = () => {
    setButtonState("loading");
    setTimeout(() => {
      addToCart({ ...product, quantity });
      setButtonState("added");
      setModalOpen(true);
      setTimeout(() => {
        setButtonState("default");
      }, 5000);
    }, 2000);
  };

  const toggleFAQItem = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const breadcrumbPaths = [
    { title: "Pradžia", link: "/" },
    { title: "Produktai", link: "/products" },
    { title: product.secondtitle, link: window.location.pathname },
  ];

  return (
    <>
      <div className={styles.product_detail}>
        <div className="small-container">
          <Breadcrumbs paths={breadcrumbPaths} />
          <div className={styles.product_row}>
            <div className={styles.product_col}>
              <div className={styles.image_container}>
                <img
                  className={`${styles.product_image} ${
                    isImageTransitioning ? styles.fade_out : styles.fade_in
                  }`}
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                />
              </div>
              <div className={styles.thumbnail_row}>
                <div className={styles.thumbnail_container}>
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      className={`${styles.thumbnail_image} ${
                        index === currentImageIndex
                          ? styles.active_thumbnail
                          : ""
                      }`}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.product_col}>
              <p className={styles.product_toptitle}>{product.toptitle}</p>
              <h2 className={styles.product_secondtitle}>
                {product.secondtitle}
              </h2>
              <PriceRating
                price={product.price}
                rating={rating}
                onRatingChange={setRating}
              />
              <div className={styles.stock_container}>
                <MdEnergySavingsLeaf className={styles.stock_icon} />
                <span className={styles.stock_text}>
                  Turime centriniame sandėlyje (prekę galite įsigyti internetu)
                </span>
              </div>
              <div className={styles.product_info}>
                <TbTruckDelivery
                  style={{ fontSize: "24px", marginRight: "8px" }}
                />
                <div>
                  <span className={styles.delivery_text}>
                    Pristatysime per 1 - 3 darbo dienas
                  </span>
                  <p className={styles.delivery_info}>
                    * 96 % užsakymų yra pristatomi kitą darbo dieną.
                  </p>
                </div>
              </div>
              <p>Kiekis</p>
              <NumberInput onChange={setQuantity} />
              <button className={styles.product_btn} onClick={handleAddToCart}>
                {buttonState === "loading" ? (
                  <AiOutlineLoading3Quarters
                    className={styles.spinner}
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  />
                ) : buttonState === "added" ? (
                  <TbShoppingBagCheck
                    style={{
                      marginRight: "8px",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  />
                ) : (
                  <FaPlus
                    style={{
                      marginRight: "8px",
                    }}
                  />
                )}
                {buttonState === "loading"
                  ? "Pridedama..."
                  : buttonState === "added"
                  ? "Prekė pridėta"
                  : "Pridėti į krepšelį"}
              </button>
              <p className="title">Aprašymas</p>
              <ul className={styles.product_list}>
                {product.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <h2 className="title">Papildoma informacija</h2>
              <h3 className={styles.faq_title}>D.U.K</h3>
              <div className={styles.faq}>
                {product.additionalInfo.map((item, index) => (
                  <div key={index} className={styles.faq_item}>
                    <h4
                      onClick={() => toggleFAQItem(index)}
                      className={styles.faq_question}
                    >
                      <span className={styles.question_text}>{item.title}</span>
                      {expandedItems.includes(index) ? (
                        <IoIosArrowUp style={{ marginLeft: "8px" }} />
                      ) : (
                        <IoIosArrowDown style={{ marginLeft: "8px" }} />
                      )}
                    </h4>
                    <div
                      className={`${styles.faq_content} ${
                        expandedItems.includes(index) ? styles.show : ""
                      }`}
                    >
                      <span className={styles.answer_text}>{item.content}</span>
                    </div>
                  </div>
                ))}
              </div>
              <h2 className="title">Vertinimas</h2>
              <div className={styles.review_toggle}>
                <button
                  className={showReviews ? styles.active : ""}
                  onClick={() => setShowReviews(true)}
                >
                  Atsiliepimai ({reviews.length})
                </button>
                <button
                  className={!showReviews ? styles.active : ""}
                  onClick={() => setShowReviews(false)}
                >
                  Palikti atsiliepimą
                </button>
              </div>

              {showReviews ? (
                <div className={styles.reviews}>
                  <div className={styles.review_list}>
                    {reviews.length > 0 ? (
                      reviews.map((rev, index) => (
                        <div key={index} className={styles.review_item}>
                          <div>Vertinimas: {rev.rating}</div>
                          <p>{rev.text}</p>
                        </div>
                      ))
                    ) : (
                      <p>Šiuo metu atsiliepimų nėra.</p>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.review_form}>
                  <h3>
                    Papasakokite daugiau apie Kavos Drauge įsigytas prekes ar
                    paslaugas. Jūsų vertinimai mums ypač svarbūs!
                  </h3>
                  <div className={styles.rating}>
                    <span>Atsiliepimas</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        onClick={() => setRating(star)}
                        style={{
                          cursor: "pointer",
                          color: star <= rating ? "gold" : "gray",
                        }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <label htmlFor="title">Pavadinimas</label>
                  <input className={styles.input} type="text" id="title" />
                  <label className={styles.label} htmlFor="email">
                    El. paštas
                  </label>
                  <input className={styles.input} type="email" id="email" />
                  <label className={styles.label} htmlFor="review">
                    Jūsų atsiliepimas
                  </label>
                  <textarea
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    rows="4"
                  />
                  <button
                    onClick={handleSubmit}
                    className={styles.submit_button}
                  >
                    Palikti atsiliepimą
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CartConfirmationModal
          onClose={() => setModalOpen(false)}
          product={product}
        />
      )}
    </>
  );
};

export default ProductDetail;
