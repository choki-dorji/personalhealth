"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";

export default function Loader() {
  return (
    <div className="flex justify-center">
      <div className="flex gap-4">
        <Spinner size="lg" />
        <p>Please Wait...</p>
      </div>
    </div>
  );
}
