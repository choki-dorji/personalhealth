import { Metadata } from "next";
import AddWeight from "../components/FormAdd'/AddWeight";

export const metadata: Metadata = {
  title: {
    default: "BMI - Healths Assistant",
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
    <>
      <div className="flex justify-center">
        <h1>Add BMI data</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <AddWeight />
      </div>

      {children}
    </>
  );
}
