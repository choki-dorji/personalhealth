"use client";
import React from "react";
import { useSession } from "next-auth/react";
import style from "./page.module.css";
import Card1 from "@/components/Cards/Card";
import ScatterPlot from "@/components/chart/chart";
import Card2 from "@/components/Cards/Card2";
import { useGetAlarmQuery } from "@/store/medicinereducer";
import Loading from "@/components/Skeleton/skeletionload";
import DashboardSkeleton from "@/components/Skeleton/skeleton";
import { useGetBpQuery } from "@/store/bp";
import { formatDateToString } from "@/components/MonthDate/date";
import { format } from "path";

function Home() {
  return (
    <>
      {/* user: {session?.user?.email} */}
      <div className={style.container1}>
        <div>
          <Card1
            title="Hello!!! Choki Dorji"
            description="You have missed your alarm"
            description1=" "
          />
        </div>
        <div className={style.container3}>
          <Card1
            title="BMI = 23"
            description="weight = 80, height=123"
            content="Over Weight"
          />
          <Card1
            title="Blood Pressure"
            description={`${bpdata.Healthdata[0].highPressure}/${bpdata.Healthdata[0].lowerPressure} mmHg`}
            content="High Pressure"
            footer={`${date}`}
          />
        </div>
      </div>
      <div className={style.container}>
        <div className={style.apple}>
          <h3>Know about yourself</h3>
          <ScatterPlot />
        </div>
        <div className={style.fruits}>
          <div className={style.mango}>
            <Card2 data={data1} />
          </div>
          <div className={style.banana}>
            <Card1
              title="Your Symptoms"
              description="You have missed your alarm"
            />{" "}
          </div>
        </div>
      </div>
      <p>hbakjchbaskh</p>
    </>
  );
}

export default Home;
