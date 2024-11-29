import { useState, useEffect } from "react";
import styles from "./numberinput.module.css";

const NumberInput = ({ initialQuantity = 1, onChange = () => {} }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleIncrement = () => {
    const newQuantity = Math.min(99, quantity + 1);
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleInputChange = (e) => {
    const value = Math.max(1, Math.min(99, Number(e.target.value) || 1));
    setQuantity(value);
    onChange(value);
  };

  return (
    <div className={styles.number_input}>
      <button onClick={handleDecrement} className={styles.minus}></button>
      <input
        className={styles.quantity}
        min="1"
        max="99"
        name="quantity"
        value={quantity}
        type="number"
        onChange={handleInputChange}
      />
      <button onClick={handleIncrement} className={styles.plus}></button>
    </div>
  );
};

export default NumberInput;
