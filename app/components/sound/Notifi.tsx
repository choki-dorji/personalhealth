"use client";
import { TotpMultiFactorGenerator } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  alarm: string;
  name: string;
}
const Alarm = (props: Props) => {
  const [alarm, setAlarm] = useState(false);
  const targetHour = 16;
  const targetMinute = 58;

  const [propsHours, propsMinutes] = props.alarm.split(":").map(Number);
  console.log(propsHours, propsMinutes);

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  console.log(hours, targetHour);
  console.log(targetMinute, minutes);

  useEffect(() => {
    if (propsHours === hours && propsMinutes === minutes) {
      setAlarm(true);
      toast.success(`You have alarm ${props.name}`, {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [hours, minutes]);

  return (
    <div>
      {alarm ? (
        <>
          <audio src="/alarm.mp3" autoPlay></audio>
          <ToastContainer />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Alarm;
