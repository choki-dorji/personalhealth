import styles from "./sign.module.css";
import Add from "../components/FormAdd'/Add";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Register - Healths Assistant",
    template: "",
  },
  icons: {
    icon: "/logo1Ha.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};
export default function Profile({ children }: { children: React.ReactNode }) {
  return <>{children} </>;
}
