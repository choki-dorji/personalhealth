"use client";
import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import { useGetAlluserQuery } from "@/store/medicinereducer";

const link =
  "https://firebasestorage.googleapis.com/v0/b/projectauthbackend.appspot.com/o/images";

export default function App({ params }: { params: { id: string } }) {
  const { data: data1, isLoading, error } = useGetAlluserQuery();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log(decodeURIComponent(params.id));
  console.log(data1);
  const user = data1?.userList.filter(
    (us: any) => us.email == decodeURIComponent(params.id)
  );
  console.log("user", user);

  return (
    <div className="flex flex-row gap-3">
      <Card className="py-4 w-[25%] flex justify-center">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">
            {(user && user[0]?.name) || (user && user[0].email)}
          </p>
          <small className="text-default-500">{user && user[0].email}</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={user && `${link}%2F${user[0].image}?alt=media`}
            width={270}
          />
        </CardBody>
      </Card>
      <Card className="py-4 w-[75%] flex justify-center">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">
            {(user && user[0]?.name) || (user && user[0].email)}
          </p>
          <small className="text-default-500">{user && user[0].email}</small>
          <h4 className="font-bold text-large">Frontend Radio</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={user && `${link}%2F${user[0].image}?alt=media`}
            width={270}
          />
        </CardBody>
      </Card>
    </div>
  );
}
