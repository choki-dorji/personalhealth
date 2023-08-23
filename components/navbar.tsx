"use client";
import { Navbar as NextUINavbar, NavbarContent } from "@nextui-org/navbar";
import { useSession } from "next-auth/react";
import Logo from "./NavbarComponent/Logo";
import { useDispatch } from "react-redux";
import { getItem } from "@/store/reducer";
import Left from "./NavbarComponent/Left";
import Right from "./NavbarComponent/Right";

export const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        {status === "authenticated" ? (
          <>
            <Logo />

            <Right />
          </>
        ) : (
          ""
        )}
      </NavbarContent>
      {status === "authenticated" ? <Left /> : ""}
    </NextUINavbar>
  );
};
