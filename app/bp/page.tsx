"use client";
import React, { useState } from "react";
import { useGetBpQuery } from "@/store/bp";
import { useSelector } from "react-redux";
import PressureBarGraph from "../components/chart/ChartBp";
import { useGetBlooddataQuery } from "@/store/bp";
import Paginations from "../components/Pagination/pagination";
import { useGetItemOnSessionChange } from "@/utils/islogin";
import { loginuser } from "@/types";
import Loader from "../components/Loader/load";
import GraphCard from "../pages/AddBP/GraphCard";

function BP() {
  useGetItemOnSessionChange();
  const userloggedin: loginuser = useSelector((state: any) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const { data: data1, isLoading, error } = useGetBpQuery();
  const {
    data: blooddata,
    isLoading: loader,
    error: bloodError,
  } = useGetBlooddataQuery();

  if (isLoading || loader) {
    return (
      <div className="flex justify-center mt-3">
        <Loader />
      </div>
    );
  }
  if (error) {
    return <p>error</p>;
  }

  const dataloggedin = blooddata?.Healthdata.filter(
    (data: any) => data.user === userloggedin?.user?.user?.email
  );

  console.log(dataloggedin);

  // console.log(userloggedin);
  const loggedinuser =
    data1 &&
    data1.Healthdata.filter(
      (user: any) => user.user === userloggedin?.user.user.email
    );
  console.log(loggedinuser);

  // pagination  //////////////////////////////////////////////////////////////////////////////////////////////////
  const pageSize = 3;
  const totalitems = loggedinuser && loggedinuser.length;
  const totalPage = totalitems && Math.ceil(totalitems / pageSize);

  const handleChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = totalitems && Math.min(startIndex + pageSize, totalitems);
  const currentPageData =
    loggedinuser && loggedinuser.slice(startIndex, endIndex);
  return (
    <>
      <div className="flex justify-center">
        <div className="mt-4 w-[140vh] h-[50vh] m-2  flex-wrap border border-gray-300W">
          <PressureBarGraph data={dataloggedin && dataloggedin} />
        </div>
      </div>

      {/* add here */}
      <GraphCard data={currentPageData} />
      {/* dsfvdsf */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <Paginations
          initialPage={currentPage}
          pageSize={pageSize}
          total={totalPage ?? 0}
          onChange={(page: number) => handleChange(page)}
        />
      </div>
    </>
  );
}

export default BP;
