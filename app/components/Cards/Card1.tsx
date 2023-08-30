"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

interface Props {
  date: string | number;
  pressure: string;
  description?: string;
}

export default function CardWithHead(props: Props) {
  return (
    <>
      <Card className="max-w-[400px] m-2">
        <CardHeader className="flex gap-3" style={{ background: "#6E78FF" }}>
          <div className="flex flex-col">
            <p className="text-md">{props.date}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-md text-bold text-default-700">{props.pressure}</p>
          <p>{props?.description}</p>
        </CardBody>
      </Card>
    </>
  );
}
