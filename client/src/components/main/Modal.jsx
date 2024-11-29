// Modal.js
import React, { useState } from "react";// Optional: styles for the modal

const Modal = ({ closeModal, addProductAd }) => {
    const [productDetails, setProductDetails] = useState({
        name: "",
        description: "",
        price: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add the new product ad to the parent component (MainPage)
        addProductAd(productDetails);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Create a Product Ad</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={productDetails.name}
                        onChange={handleInputChange}
                        placeholder="Product Name"
                    />
                    <textarea
                        name="description"
                        value={productDetails.description}
                        onChange={handleInputChange}
                        placeholder="Product Description"
                    />
                    <input
                        type="number"
                        name="price"
                        value={productDetails.price}
                        onChange={handleInputChange}
                        placeholder="Product Price"
                    />
                    <button type="submit">Create Ad</button>
                    <button type="button" onClick={closeModal}>
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
