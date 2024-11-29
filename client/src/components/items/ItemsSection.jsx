import styles from "./items.module.css";

import { Link } from "react-router-dom";

const ItemsSection = ({
  title,
  subtitle,
  link,
  items,
  visibleItems,
  onAddToCart,
}) => {
  return (
    <section className={styles.items}>
      <div className="container">
        <h2 className={styles.items_title} data-aos="fade-up">
          {title}
        </h2>
        {subtitle && (
          <p className={styles.items_subtitle} data-aos="fade-up">
            {subtitle}
          </p>
        )}
        <Link
          to={link}
          className={`${styles.items_button_more} ${styles.btn_hover}`}
          data-aos="fade-left"
          aria-label={`View more ${title}`}
        >
          Žiūrėti daugiau
        </Link>
        <div className={styles.items_row}>
          {items.slice(0, visibleItems).map((item) => (
            <article
              key={item.id}
              className={`${styles.items_product} ${styles.card}`}
              data-aos="fade-up"
            >
              <Link
                to={item.to}
                className={styles.items_image}
                aria-label={item.title}
              >
                <img src={item.image} alt={item.title} />
              </Link>
              <div className={styles.items_info}>
                <div className={styles.items_star_rating}>⭐⭐⭐⭐⭐</div>
                <h3 className={styles.items_product_title}>{item.title}</h3>
                <p className={styles.items_product_price}>€{item.price}</p>
                <button
                  className={`${styles.items_button} ${styles.btn_animated}`}
                  onClick={() => onAddToCart(item)}
                  aria-label={`Add ${item.title} to cart`}
                >
                  Į Krepšelį
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ItemsSection;
