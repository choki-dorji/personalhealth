import React from "react";
import { Pagination } from "@nextui-org/react";
interface Props {
  initialPage: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export default function Paginations(props: Props) {
  return (
    <Pagination
      total={props?.total}
      initialPage={props.initialPage}
      pageSize={props.pageSize}
      onChange={props.onChange}
    />
  );
}
