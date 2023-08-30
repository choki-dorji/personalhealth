import React from "react";
import { Navbar as NextUINavbar, NavbarItem } from "@nextui-org/navbar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
} from "@nextui-org/react";
import NextLink from "next/link";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { dropdown } from "./Links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { links } from "./Links";

function Right() {
  return (
    <div>
      <ul className="hidden lg:flex gap-4 justify-start ml-2">
        {links.map((item) => (
          <NavbarItem key={item.id}>
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
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.name}
              </NextLink>
            )}
          </NavbarItem>
        ))}
      </ul>
    </div>
  );
}

export default Right;
