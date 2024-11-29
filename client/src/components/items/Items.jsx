import Info from "../info/Info";
import ItemsSection from "./ItemsSection";
import CartConfirmationModal from "../products/CartConfirmationModal";
import AOS from "aos";
import "aos/dist/aos.css";

import { useState, useEffect } from "react";
import { OurItems, coffeeMachine } from "../../data/data";
import { useCart } from "../cartContext/CartContext";

const Items = () => {
  const [visibleItems, setVisibleItems] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out-back", once: true });
  }, []);

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <main>
      <section>
        <ItemsSection
          title="Mėgaukitės kiekvienu puodeliu"
          link="/kava"
          items={OurItems}
          visibleItems={visibleItems}
          onAddToCart={handleAddToCart}
        />
      </section>

      <Info />

      <section>
        <ItemsSection
          title="Top kavos aparatai"
          link="/top-kavos-aparatai"
          items={coffeeMachine}
          visibleItems={visibleItems}
          onAddToCart={handleAddToCart}
        />
      </section>

      <CartConfirmationModal show={showModal} onClose={handleCloseModal} />
    </main>
  );
};

export default Items;
