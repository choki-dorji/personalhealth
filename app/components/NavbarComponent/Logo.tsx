import React from "react";

import { Navbar as NextUINavbar, NavbarBrand } from "@nextui-org/navbar";

import NextLink from "next/link";

function Logo() {
  return (
    <NavbarBrand as="li" className="gap-3 max-w-fit">
      <NextLink className="flex justify-start items-center gap-1" href="/">
        <p className="font-bold text-inherit">BumThap</p>
      </NextLink>
    </NavbarBrand>
  );
}

export default Logo;
