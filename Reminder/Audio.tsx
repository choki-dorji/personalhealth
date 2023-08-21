import React, { useEffect } from "react";

const AudioNotification = () => {
  useEffect(() => {
    const audio = new Audio("alarm.mp3"); // Replace with your audio file
    audio.play();
  }, []);

  return null;
};

export default AudioNotification;
