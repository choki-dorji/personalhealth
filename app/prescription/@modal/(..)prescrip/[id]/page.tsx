"use client";
import React, { useState } from "react";
import styles from "./Popup.module.css";

export default function Popup() {
  const [isOpen, setIsOpen] = useState(false);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className={`${styles.popup__container} ${isOpen ? styles.open : ""}`}>
      {isOpen && (
        <div className={styles.popup}>
          <div className={styles.popup__content}>
            <h2>Popup Content</h2>
            <p>This is a simple pop-up component.</p>
            <button className={styles.close__button} onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
