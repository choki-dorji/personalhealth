"use client";
import React, { useState } from "react";
import styles from "./style.module.css"; // Your custom CSS file
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setAlert] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${process.env.DOMAIN}/api/register`, {
        email: email,
        password: password,
      })
      .then((resp) => {
        setAlert(true);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        // Handle the error here
        toast.error("User already exist", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  if (showAlert) {
    toast.success("Account created successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setAlert(false);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h2>Register</h2>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button className={styles.button} type="submit">
          Register
        </button>
        <p className="mr-3 mt-3">Already Have an account? </p>
        <Link href="/auth/signin" className={styles.link}>
          Login
        </Link>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
