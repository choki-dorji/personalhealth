import React from "react";

function Time() {
  const targetTime = new Date().getTime(); // Your target time in milliseconds
  const dateObj = new Date(targetTime);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  return formattedTime;
}

export default Time;
