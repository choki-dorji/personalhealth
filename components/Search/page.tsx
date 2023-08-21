"use client";
import React, { ChangeEvent, useState } from "react";
import Input1 from "../Input";
import { Button } from "@nextui-org/button";
import { useDispatch } from "react-redux";
import { searchPrescription } from "@/store/search";
import store from "@/store/store";

function Search() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(searchPrescription(value));
    console.log(store.getState());
  };

  return (
    <>
      <form className="flex justify-center" onSubmit={submitHandler}>
        <Input1
          type="text"
          label="Search Prescription"
          value={value}
          onChange={(e: ChangeEvent) => setValue(e.target.value)}
          //   className="mr-2 h-[2rem]" // Margin and equal height
        />

        <Button type="submit" className="mt-2 h-[3rem]">
          Search
        </Button>
      </form>
    </>
  );
}

export default Search;
