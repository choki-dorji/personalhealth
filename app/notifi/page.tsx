"use client";
import React, { useState, useEffect } from "react";
import AudioNotification from "@/Reminder/Audio";
import ReminderNotification from "@/Reminder/remind";

// import styles from "../styles/Home.module.css";

const IndexPage = () => {
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      if (hours === 3 && minutes === 31) {
        console.log("alarm");
        setShowReminder(true);
      } else {
        setShowReminder(false);
      }
    };

    const interval = setInterval(checkTime, 1000 * 60); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Notification Reminder</h1>
      {showReminder && <ReminderNotification />}
      {showReminder && <AudioNotification />}
    </div>
  );
};

export default IndexPage;
