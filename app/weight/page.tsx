"use client";
import AddWeight from "@/components/FormAdd'/AddWeight";
import React, { useState } from "react";
import CardWithHead from "@/components/Cards/Card1";
import ScatterPlot from "@/components/chart/chart";
import { useSelector } from "react-redux";
import { useGetBMIQuery } from "@/store/bp";
import Paginations from "@/components/Pagination/pagination";
import { useGetBMIDataQuery } from "@/store/bp";
import BMIGraph from "@/components/chart/GraphBMI";
import { BMIitem } from "@/types";
import { useGetItemOnSessionChange } from "@/utils/islogin";
import Loader from "@/components/Loader/load";

function BMI() {
  useGetItemOnSessionChange();
  const logginuser = useSelector((state: any) => state.user);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: data1, isLoading, error } = useGetBMIQuery();
  const {
    data: bmiData,
    isLoading: loader,
    error: bloodError,
  } = useGetBMIDataQuery();

  if (isLoading || loader) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }
  if (error || bloodError) {
    return <p>error</p>;
  }
  const authuser = bmiData?.Healthdata?.filter(
    (data: any) => data.user === logginuser.user?.user?.email
  );

  const forauth = data1?.data?.filter(
    (data) => data.user === logginuser.user?.user?.email
  );

  const pageSize = 5;
  const totalitems = forauth?.length;
  const totalPage = totalitems && Math.ceil(totalitems / pageSize);

  const handleChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = totalitems && Math.min(startIndex + pageSize, totalitems);

  // Get the data for the current page
  const currentPageData = forauth && forauth.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex justify-center">
        <h1>Add BMI data</h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <AddWeight />
      </div>
      <div className="flex justify-center">
        <div className="mt-4 w-[140vh] h-[50vh] m-2  flex-wrap border border-gray-300W">
          {/* <ScatterGraph data={data} /> */}
          <BMIGraph Healthdata={bmiData && authuser} />
        </div>
      </div>
      <div className="mt-4 m-2 flex justify-center flex-wrap">
        {currentPageData &&
          currentPageData.map((item: BMIitem) => {
            const height = item.Height / 100;
            const weight = item.weight;

            const BMI = weight / (height * height);

            return (
              <CardWithHead
                key={item._id}
                date={`BMI : ${BMI}`}
                pressure={`Height: ${item.weight} ,Weight:  ${item.Height}`}
              />
            );
          })}
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
          total={totalPage ?? 0}
          onChange={(page: number) => handleChange(page)}
        />
      </div>
    </div>
  );
}

export default BMI;
