"use client";
import React from "react";
import Card1 from "@/app/components/Cards/Card";
import { useGetBMIQuery } from "@/store/bp";
import { Loginuserdata } from "@/utils/util";
import { useSelector } from "react-redux";
import { useGetBpQuery } from "@/store/bp";
import { formatDateToString } from "@/utils/MonthDate/date";
import { useSession } from "next-auth/react";

const BMI_BP = () => {
  const user = useSelector((state: any) => state.user);

  const {
    data: BMIQuery,
    isLoading: Bmiloading,
    error: isError,
  } = useGetBMIQuery();

  const {
    data: bpdata,
    isLoading: bloodloading,
    error: bperror,
  } = useGetBpQuery();

  if (isError || bperror) {
    return <p>An error occured</p>;
  }

  const loginuser = Loginuserdata(BMIQuery?.data, user.user?.user?.email);
  const specificuser = Loginuserdata(
    bpdata && bpdata.Healthdata,
    user.user?.user?.email
  );
  const date =
    specificuser && specificuser.length > 0
      ? formatDateToString(specificuser[specificuser.length - 1].date)
      : "";

  return (
    <>
      <div>
        {Bmiloading ? (
          <Card1 title="Loading ..." description="Loading ..." content="" />
        ) : (
          <Card1
            title={
              loginuser.length > 0
                ? `BMI = ${loginuser[loginuser.length - 1].BMI} `
                : "BMI"
            }
            description={
              loginuser && loginuser.length > 0
                ? `weight = ${
                    loginuser[loginuser.length - 1].weight
                  } , height=${loginuser[loginuser.length - 1].Height}`
                : "Add data to display"
            }
            content={
              loginuser && loginuser.length > 0
                ? loginuser[loginuser.length - 1].BMI > 24
                  ? "You are over Weight"
                  : loginuser[loginuser.length - 1].BMI < 18
                  ? "You are Under Weight"
                  : "You are Normal"
                : ""
            }
          />
        )}
      </div>
      <div>
        {!bloodloading ? (
          <Card1
            title="Blood Pressure"
            description={
              specificuser && specificuser.length > 0
                ? `${specificuser[specificuser.length - 1].highPressure}/${
                    specificuser[specificuser.length - 1].lowerPressure
                  } mmHg`
                : "Add data to display"
            }
            content={
              specificuser && specificuser.length > 0
                ? specificuser[specificuser.length - 1].highPressure > 120
                  ? "High BP"
                  : specificuser &&
                    specificuser[specificuser.length - 1].highPressure < 80
                  ? "Low BP"
                  : "Normal BP"
                : "no data"
            }
            footer={`${date}`}
          />
        ) : (
          <Card1 title="Loading ..." description="Loading ..." content="" />
        )}
      </div>
    </>
  );
};

export default BMI_BP;
