"use client";
import React from "react";
// import { useSession } from "next-auth/react";
import style from "./page.module.css";
import Card1 from "@/components/Cards/Card";
import ScatterPlot from "@/components/chart/chart";
import Card2 from "@/components/Cards/Card2";
import { useGetAlarmQuery } from "@/store/medicinereducer";
import SkeletonLoad from "@/components/Skeleton/skeleton";

function Loading() {
  return (
    <>
      {/* user: {session?.user?.email} */}
      <div className={style.container1}>
        <SkeletonLoad />
        {/* <Card1
          title="BMI = 23"
          description="weight = 80"
          description1="weight = 180"
          content="Over Weight"
          footer="23/4/34"
        /> */}
        {/* <Card1
          title="Blood Pressure"
          description="140/90 mmhg"
          content="High Pressure"
        /> */}
      </div>
      <div className={style.container}>
        <div className={style.apple}>
          {/* <h3>Know about yourself</h3> */}
          {/* <ScatterPlot /> */}
        </div>
        <div className={style.fruits}>
          <div className={style.mango}>{/* <Card2 data={data1} /> */}</div>
          <div className={style.banana}>
            {/* <Card1 title="dfnk" description="You have missed your alarm" />{" "} */}
          </div>
        </div>
      </div>
      <p>hbakjchbaskh</p>
    </>
  );
}

export default Loading;
