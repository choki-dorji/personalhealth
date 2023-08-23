import styles from "./sign.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Login Form - Healths Assistant",
    template: "",
  },
  icons: {
    icon: "/logo1Ha.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function Signin({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h2>Login</h2>
        {children};
      </div>
    </div>
  );
}
