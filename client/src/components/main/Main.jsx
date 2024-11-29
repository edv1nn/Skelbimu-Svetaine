// MainPage.js
import React, { useState } from "react";
import Modal from "./Modal"; // Modal component to create the product ad
import styles from "./MainPage.module.css"; // Your styles

const MainPage = () => {
    const [showModal, setShowModal] = useState(false); // Modal visibility state
    const [productAds, setProductAds] = useState([]); // Store product ads here

    // Function to toggle the modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Function to handle submitting a new product ad from the modal
    const handleAddProductAd = (newProductAd) => {
        setProductAds([...productAds, newProductAd]); // Add new ad to the list
        setShowModal(false); // Close modal after submission
    };

    return (
        <div className={styles.mainPage}>

            {/* Create Product Ad Button */}
            <button className={styles.createAdButton} onClick={toggleModal}>
                Create Product Ad
            </button>

            {/* Modal for creating an ad */}
            {showModal && <Modal closeModal={toggleModal} addProductAd={handleAddProductAd} />}

            {/* Main content */}
            <div className={styles.content}>
                <h1>Product Ads</h1>
                <div className={styles.productAdsList}>
                    {/* Render all product ads here */}
                    {productAds.length > 0 ? (
                        productAds.map((ad, index) => (
                            <div key={index} className={styles.productAd}>
                                <h3>{ad.name}</h3>
                                <p>{ad.description}</p>
                                <p>Price: ${ad.price}</p>
                            </div>
                        ))
                    ) : (
                        <p>No product ads created yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainPage;
