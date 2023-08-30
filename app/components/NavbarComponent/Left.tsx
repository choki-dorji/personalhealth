import React from "react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import { SearchIcon } from "../icons";
import { ThemeSwitch } from "../theme-switch";
import Link from "next/link";
import { links, dropdown } from "./Links";
import User1 from "../User/User";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NextLink from "next/link";
import Search from "./searchfrom";

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
          {/* <Search /> */}
          <ThemeSwitch />
        </NavbarItem>
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
        <User1 image={props.image} email={props.email} />
        {/* <Button onClick={() => signOut()}>Log Out</Button> */}
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <User1 image={props.image} email={props.email} />
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {links.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              {item.name === "Add Record" ? (
                <Dropdown>
                  <DropdownTrigger style={{ cursor: "pointer" }}>
                    Add Record
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="ACME features"
                    className="w-[340px]"
                    itemClasses={{
                      base: "gap-4",
                    }}
                  >
                    {dropdown.map((item) => (
                      <DropdownItem
                        key={item.id}
                        description={item.name}
                        startContent={<FontAwesomeIcon icon={item.icon} />}
                      >
                        <NextLink href={item.url}>{item.title}</NextLink>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Link color="foreground" href={item.href}>
                  {item.name}
                </Link>
              )}
            </NavbarMenuItem>
          ))}
        </div>
        <Button
          onClick={() =>
            signOut({
              callbackUrl: `${process.env.NEXT_PUBLIC_NEXT_DOMAIN}auth/signin`,
            })
          }
        >
          Log Out
        </Button>
      </NavbarMenu>
    </>
  );
}

export default Left;
