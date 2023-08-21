"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "./sign.module.css";

function Signin() {
  const email = useRef("");
  const password = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Login</h2>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email</label>
          <input
            type="email"
            onChange={(e) => (email.current = e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password</label>
          <input
            type="password"
            onChange={(e) => (password.current = e.target.value)}
            className={styles.input}
          />
        </div>
        <button className={styles.button} onClick={onSubmit}>
          Login
        </button>
        <p className="mr-3 mt-3">Dont have an account yet? </p>
        <Link href="/auth/signup" className={styles.link}>
          Register
        </Link>
      </div>
      {/* <ToastContainer /> */}
    </div>
    /////
  );
}

export default Signin;
