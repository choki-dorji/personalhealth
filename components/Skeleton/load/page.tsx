"use client";
import React from "react";
import style from "./load.module.css";
import Card1 from "@/components/Cards/Card";
import ScatterPlot from "@/components/chart/chart";
import Card2 from "@/components/Cards/Card2";
import SkeletonMain from "@/components/Skeleton/SkeletonMain";
import SkeletionGraph from "@/components/Skeleton/SkeletionGraph";
import { Skeleton } from "@nextui-org/react";
import SkeletionAlarm from "../SkeletonAlarm";
function Load() {
  return (
    <>
      {/* user: {session?.user?.email} */}
      <div className={style.container1}>
        <div>
          <SkeletonMain />
        </div>
        <div className={style.container3}>
          <SkeletonMain />
          <SkeletonMain />
        </div>
      </div>
      <div className={style.container}>
        <div className={style.apple}>
          <Skeleton className="w-3/5 rounded-lg bg-[#ffffff40]">
            <div className="h-5 w-3/5 rounded-lg bg-default-300"></div>
          </Skeleton>
          {/* <ScatterPlot /> */}

          <SkeletionGraph />
        </div>
        <div className={style.fruits}>
          <div className={style.mango}>
            <SkeletionAlarm />
          </div>
          <div className={style.banana}>
            {/* <Card1
              title="Your Symptoms"
              description="You have missed your alarm"
            />{" "} */}
          </div>
        </div>
      </div>
      <p>hbakjchbaskh</p>
    </>
  );
}

export default Load;
