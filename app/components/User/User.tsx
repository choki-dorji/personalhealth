import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Avatar,
  User,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSelector } from "react-redux";

interface Auth {
  image: string;
  email: string;
}
const link =
  "https://firebasestorage.googleapis.com/v0/b/projectauthbackend.appspot.com/o/images%2F";

export default function App(props: Auth) {
  const userimage = useSelector((state: any) => state.user);
  // console.log(userimage.user.user.email);

  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            color="success"
            as="button"
            className="transition-transform"
            src={
              props.image !== ""
                ? `${link}${props.image}?alt=media`
                : "/image.png"
            }
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          color="secondary"
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{userimage.user?.user?.email}</p>
          </DropdownItem>
          {/* <DropdownItem key="settings">My Settings</DropdownItem> */}
          {/* <DropdownItem key="team_settings">Team Settings</DropdownItem> */}
          {/* <DropdownItem key="analytics">Analytics</DropdownItem> */}
          <DropdownItem key="system">
            <Link href="/Profile">Profile</Link>
          </DropdownItem>
          {/* <DropdownItem key="configurations">Configurations</DropdownItem> */}
          {/* <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}
          <DropdownItem
            key="logout"
            color="danger"
            onClick={() =>
              signOut({ callbackUrl: "http://localhost:3000/auth/signin" })
            }
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
