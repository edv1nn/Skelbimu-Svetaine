import styles from "./ScrollToTopButton.module.css";

import { useState, useEffect } from "react";
import { IoIosArrowRoundUp } from "react-icons/io";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isAtTop, setIsAtTop] = useState(false);
  const [hideTimeout, setHideTimeout] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setScrollPercentage(scrollPercent);

      if (scrollTop > 0) {
        setShowButton(true);
        setIsAtTop(false);
      }

      if (scrollTop === 0) {
        setIsAtTop(true);
        if (hideTimeout) {
          clearTimeout(hideTimeout);
          setHideTimeout(null);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hideTimeout]);

  useEffect(() => {
    if (isAtTop) {
      const timeout = setTimeout(() => {
        setShowButton(false);
      }, 1000);
      setHideTimeout(timeout);

      return () => clearTimeout(timeout);
    }
  }, [isAtTop]);

  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  const scrollToTop = () => {
    const start = window.scrollY;
    const duration = 1000;
    let startTime;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, start * (1 - ease));
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollPercentage / 100) * circumference;

  return (
    <>
      {showButton && (
        <div className={styles.wrapper}>
          <svg width="60" height="60" aria-labelledby="scrollToTopButtonTitle">
            <title id="scrollToTopButtonTitle">Scroll to Top Indicator</title>
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke="#007bff"
              strokeWidth="5"
              fill="transparent"
              className={styles.circle}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
              }}
            />
          </svg>
          <button
            onClick={scrollToTop}
            className={styles.button}
            aria-label="Scroll to top"
            title="Scroll to Top"
          >
            <IoIosArrowRoundUp />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollToTopButton;
