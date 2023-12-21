"use client";
import React, { ChangeEvent } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import { searchedUser } from "@/store/searchuser.reducer";
import { useState } from "react";
import { User } from "@/types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
} from "@nextui-org/react";
import { useGetFireDataQuery } from "@/store/Fire/fire.api";
import { useGetAlluserQuery } from "@/store/Medicine/medicine.api";
import store from "@/store/store";
import Link from "next/link";

const link =
  "https://firebasestorage.googleapis.com/v0/b/projectauthbackend.appspot.com/o/images";

export default function Search() {
  const [search, setSearch] = useState("");
  console.log(store.getState());
  const { data: user, isLoading: userloading } = useGetAlluserQuery();
  const { data, isLoading } = useGetFireDataQuery();
  if (isLoading || userloading) {
    return <p>Loading</p>;
  }
  let filter: User[] | undefined;
  if (search !== "") {
    filter = user?.userList.filter(
      (user) =>
        user.name?.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search)
    );
  }
  console.log(filter);
  // const imagelink = `${link}%2F${data1.image}?alt=media`;
  return (
    <div
      className="flex flex-col justify-start"
      style={
        filter && filter.length > 0
          ? { marginTop: "13rem" }
          : { marginTop: "0.7rem" }
      }
    >
      <Input
        onChange={(e: any) => setSearch(e.target.value)}
        isClearable
        radius="lg"
        style={{ width: "100%" }}
        classNames={{
          label: "text-black/50 dark:text-white/90",
          input: [
            "bg-transparent",
            "text-black/90 dark:text-white/90",
            "placeholder:text-default-700/50 dark:placeholder:text-white/60",
          ],
          innerWrapper: "bg-transparent",
          inputWrapper: [
            "shadow-xl",
            "bg-default-200/50",
            "dark:bg-default/60",
            "backdrop-blur-xl",
            "backdrop-saturate-200",
            "hover:bg-default-200/70",
            "dark:hover:bg-default/70",
            "group-data-[focused=true]:bg-default-200/50",
            "dark:group-data-[focused=true]:bg-default/60",
            "!cursor-text",
          ],
        }}
        placeholder="Search User..."
        startContent={
          <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
        }
      />
      {filter && filter.length > 0 ? (
        <Card className="max-w-[400px] h-[200px] overflow-auto ">
          {filter.map((value) => (
            <div key={value.email}>
              <Link href={`/userdisplay/${value.email}`}>
                <CardHeader className="flex gap-3 cursor-pointer">
                  <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    src={
                      value.image !== ""
                        ? `${link}%2F${value.image}?alt=media`
                        : "/image.png"
                    }
                    width={40}
                  />
                  <div className="flex flex-col">
                    <p className="text-md">{value.name || value.email}</p>
                    <p className="text-small text-default-500">{value.email}</p>
                  </div>
                </CardHeader>
              </Link>
              <Divider />
            </div>
          ))}
        </Card>
      ) : null}
    </div>
  );
}
