"use client";
import React from "react";
import Card1 from "@/app/components/Cards/Card";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const UserGreet = () => {
  const { data: session, status } = useSession({
    required: true,
  });
  // console.log(session);
  const user = useSelector((state: any) => state.user);
  return (
    <Card1
      title={session?.user ? `Hello!!! ${session?.user?.email}` : "Loading ..."}
      description={session?.user ? "Have a nice day!" : "Loading ..."}
      description1=" "
    />
  );
};

export default UserGreet;
