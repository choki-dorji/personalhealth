import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button, Input } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { SearchIcon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import Link from "next/link";
import { links } from "./Links";
import User1 from "../User/User";

interface Auth {
  image: string;
  email: string;
}

function Left(props: Auth) {
  return (
    <>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        <User1 image={props.image} email={props.email} />
        {/* <Button onClick={() => signOut()}>Log Out</Button> */}
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {links.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href}>
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
        <Button
          onClick={() =>
            signOut({ callbackUrl: "http://localhost:3000/auth/signin" })
          }
        >
          Log Out
        </Button>
      </NavbarMenu>
    </>
  );
}

export default Left;
