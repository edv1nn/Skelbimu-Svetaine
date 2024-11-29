import styles from "./pricerating.module.css";

const PriceRating = ({ price, onRatingChange, rating }) => {
  const getStarClass = (value) => {
    if (value <= rating) {
      if (rating === 5) return styles.green;
      if (rating === 4 || rating === 3) return styles.yellow;
      if (rating === 2 && value <= 2) return styles.orange;
      if (rating === 1 && value === 1) return styles.red;
    }
    return "";
  };

  const handleRating = (value) => {
    if (value === 1 && rating === 1) {
      onRatingChange(0);
    } else {
      onRatingChange(value);
    }
  };

  return (
    <div className={styles.price_rating}>
      <div className={styles.price}>{price}</div>
      <div className={styles.rating}>
        <div className={styles.rating_number}>
          <span id="rating-number">{rating}</span>/5
        </div>
        <div className={styles.stars} id="stars">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={`${styles.star} ${getStarClass(value)}`}
              data-value={value}
              onClick={() => handleRating(value)}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriceRating;
