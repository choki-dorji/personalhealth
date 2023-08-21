"use client";
import Add from "@/components/FormAdd'/Add";
import React, { useState } from "react";
import CardWithHead from "@/components/Cards/Card1";
import { useGetBpQuery } from "@/store/bp";
import { useSelector } from "react-redux";
import PressureBarGraph from "@/components/chart/ChartBp";
import { useGetBlooddataQuery } from "@/store/bp";
import Paginations from "@/components/Pagination/pagination";
import { User, loginuser } from "@/types";
import { useGetItemOnSessionChange } from "@/utils/islogin";

interface items {
  _id: string;
  date: string;
  highPressure: number;
  lowerPressure: number;
  description: string;
}

function BP() {
  useGetItemOnSessionChange();
  const userloggedin = useSelector((state: User | loginuser) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: data1, isLoading, error } = useGetBpQuery();
  const {
    data: blooddata,
    isLoading: loader,
    error: bloodError,
  } = useGetBlooddataQuery();

  if (isLoading || loader) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  console.log(blooddata);

  const dataloggedin = blooddata?.Healthdata.filter(
    (data: User) => data.user === userloggedin?.user?.user?.email
  );

  console.log(userloggedin);

  // console.log(userloggedin);
  const loggedinuser =
    data1 &&
    data1.Healthdata.filter(
      (user) => user.user === userloggedin?.user.user.email
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

  // Get the data for the current page
  const currentPageData =
    loggedinuser && loggedinuser.slice(startIndex, endIndex);

  // end pagination //////////////////////////////////////////////

  function convertIsoToCustomFormat(isoDatetime: string) {
    // Parse the ISO 8601 date-time string
    const parsedDatetime = new Date(isoDatetime);
    // Define month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Format the date in the desired format
    const formattedDate = `${parsedDatetime.getDate()} ${
      monthNames[parsedDatetime.getMonth()]
    } ${parsedDatetime.getFullYear()}`;

    return formattedDate;
  }
  let description: string;

  return (
    <div>
      <div className="flex justify-center">
        <h1>Add Blood Pressure data</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Add />
      </div>

      <div className="flex justify-center">
        <div className="mt-4 w-[140vh] h-[50vh] m-2  flex-wrap border border-gray-300W">
          {/* <ScatterGraph data={data} /> */}
          <PressureBarGraph data={dataloggedin && dataloggedin} />
        </div>
      </div>
      <div className="mt-4 m-2 flex justify-center flex-wrap">
        {currentPageData && currentPageData.length > 0 ? (
          currentPageData.map((item: items) => {
            if (item.highPressure > 120 || item.lowerPressure > 80) {
              description =
                "you have high blood pressure take necessary action";
            }
            if (item.lowerPressure <= 80 || item.highPressure <= 120) {
              description = "your blood pressure is normal";
            }
            return (
              <CardWithHead
                key={item._id}
                date={convertIsoToCustomFormat(item.date)}
                pressure={`${item.highPressure}/${item.lowerPressure} mmHg`}
                description={description}
              />
            );
          })
        ) : (
          <p>No Data</p>
        )}
      </div>
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
          total={totalPage}
          onChange={(page: number) => handleChange(page)}
        />
      </div>
    </div>
  );
}

export default BP;
