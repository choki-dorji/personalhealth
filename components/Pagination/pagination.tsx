import React from "react";
import { Pagination } from "@nextui-org/react";
import { PaginationProps } from "@/types";

export default function Paginations(props: PaginationProps) {
  return (
    <Pagination
      total={props.total}
      initialPage={props.initialPage}
      onChange={props.onChange}
    />
  );
}
