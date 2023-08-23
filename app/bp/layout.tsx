import styles from "./sign.module.css";
import Add from "@/components/FormAdd'/Add";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Blood Pressure - Healths Assistant",
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
    <div>
      <div className="flex justify-center">
        <h1>Add Blood Pressure data</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Add />
      </div>
      {children}
    </div>
  );
}
