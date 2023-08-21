"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Input1 from "../Input";
import { Button } from "@nextui-org/button";
import { usePostBMIMutation } from "@/store/bp";
import { useSession } from "next-auth/react";

interface Props {
  label1: string;
  label2: string;
}

function AddWeight(props: Props) {
  const { data: session, status } = useSession({
    required: true,
  });
  const [value, setValue] = useState<Number | null>(null);
  const [value1, setValue1] = useState<Number | null>(null);

  const [postBMi] = usePostBMIMutation();

  console.log(session?.user?.email);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await postBMi({
      Height: value,
      weight: value1,
      user: session?.user?.email,
    });
  };

  return (
    <>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <Input1
          type="number"
          label={props.label1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="mr-2 h-[2rem]" // Margin and equal height
        />
        <Input1
          type="number"
          label={props.label2}
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
          className="mr-2 h-[2rem]" // Margin and equal height
        />
        <Button type="submit" className="mt-2 h-[3rem]">
          Add
        </Button>
      </form>
    </>
  );
}

export default AddWeight;
