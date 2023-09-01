"use client";
import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import styles from "./sign.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function Signin() {
  const router = useRouter();
  const email = useRef("");
  const password = useRef("");

  const onSubmit = async () => {
    const result = await signIn("credentials", {
      email: email.current,
      password: password.current,
      redirect: false,
      callbackUrl: "/",
    });
    console.log(result);
    if (result?.error === null) {
      // router.push("/");
      // router.refresh();
      window.location.href = "/";
    } else if (result?.error !== "SessionRequired") {
      return toast.error(result?.error ?? "Couldnot Login", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      // router.push("/");
      // router.refresh();
      window.location.href = "/";
    }
  };

  return (
    <>
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
      <ToastContainer />
    </>
  );
}

export default Signin;
