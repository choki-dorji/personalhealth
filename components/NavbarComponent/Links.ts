"use client"
import {
    faBook,
    faCalendar,
    faWeightHanging,
    faTint,
  } from "@fortawesome/free-solid-svg-icons";

export const links = [
    {
      id: 1,
      name: "Home",
      href: "/",
    },
    {
      id: 3,
      name: "Add Record",
      href: "",
    },
    {
      id: 4,
      name: "About",
      href: "/about",
    },
    {
      id: 5,
      name: "Prescription",
      href: "/prescription",
    },
  ];

  export const dropdown = [
    {
      id: 1,
      name: "Add data of your priscriptions in here for suture use",
      icon: faBook,
      title: "Prescription",
      url: "/HealthRecord",
    },
    {
      id: 3,
      name: "You can add your height and weight and know whether you are over weight, underweight or normal as time passes",
      icon: faWeightHanging,
      title: "Weight and Height",
      url: "/weight",
    },
    {
      id: 4,
      name: "It helps you to keep track of your blood pressure as time pass.",
      icon: faTint,
      title: "Blood Pressure",
      url: "/bp",
    },
  ];