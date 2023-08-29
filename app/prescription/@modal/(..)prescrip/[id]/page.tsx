import React, { useState, useEffect } from "react";
import styles from "./Popup.module.css";

interface PopupProps {
  initiallyOpen: boolean;
}

export default function Popup({ initiallyOpen }: PopupProps) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  useEffect(() => {
    setIsOpen(initiallyOpen);
  }, [initiallyOpen]);

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
