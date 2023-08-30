import { Metadata } from "next";

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
  return <>{children} </>;
}
