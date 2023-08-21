"use client";
import React, { useState } from "react";
import Input1 from "../Input";
import { Button } from "@nextui-org/button";
import { usePostBpMutation } from "@/store/bp";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add(props) {
  const user = useSelector((state: any) => state.user);
  const [value, setValue] = useState<Number | null>(null);
  const [value1, setValue1] = useState<Number | null>(null);

  const [postBp] = usePostBpMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value !== null && value1 !== null && value > value1) {
      await postBp({
        highPressure: value,
        lowerPressure: value1,
        OtherInformation: "",
        description: "",
        user: user.user?.user?.email,
      });
      toast.success("Inserted successfully", {
        position: "top-center",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Higher end should not be less than low end", {
        position: "top-center",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
        <ToastContainer />
      </form>
    </>
  );
}

export default Add;
