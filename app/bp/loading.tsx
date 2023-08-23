"use client";
import React from "react";
import { CircularProgress } from "@nextui-org/react";

export default function App() {
  return (
    <div className="flex gap-4 justify-center">
      <CircularProgress size="lg" aria-label="Loading..." />
    </div>
  );
}
