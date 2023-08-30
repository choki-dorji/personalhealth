import React from "react";
import { Input } from "@nextui-org/input";

interface Input {
  type?: "email" | "password" | "text" | "number";
  label: string;
  value?: string | (readonly string[] & string) | undefined;
  onChange?: any;
}
export default function Input1(props: Input) {
  return (
    <Input
      isRequired
      type={props.type}
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      className="max-w-xs m-1"
      // errorMessage={props.value?.length === 0 ? "It is required" : ""}
    />
  );
}
