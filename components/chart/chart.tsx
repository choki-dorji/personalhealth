import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { useGetAllPrescriptionQuery } from "@/store/medicinereducer";
import { onedata } from "@/types";
import { Image } from "@nextui-org/react";

export default function ScatterPlot() {
  const [authuser, setAuthuser] = useState<onedata[] | undefined>();
  const { data: data1, isLoading, error } = useGetAllPrescriptionQuery();
  const userdata = useSelector((state: any) => state.user);
  const canvasEl = useRef<HTMLCanvasElement | null>(null);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };

  console.log(data1);

  useEffect(() => {
    const ctx: any = canvasEl.current?.getContext("2d");

    const specificuser = data1?.Healthdata.filter(
      (d: any) => d.user === userdata.user?.user?.email
    );
    console.log(specificuser);
    setAuthuser(specificuser);

    const aggregatedData: any = {};
    specificuser?.forEach((entry) => {
      const { user, month, count } = entry;
      if (aggregatedData[month]) {
        aggregatedData[month].count += count;
      } else {
        aggregatedData[month] = { user, month, count };
      }
    });

    const result = Object.values(aggregatedData);
    console.log(result);

    const labels = result.map((entry: any) => entry.month);
    console.log(labels);

    const counts = result.map((entry: any) => entry.count);
    console.log(counts);
    // order the months

    const gradient = ctx?.createLinearGradient(0, 16, 0, 600);
    gradient?.addColorStop(0, colors.purple.half);
    gradient?.addColorStop(0.65, colors.purple.quarter);
    gradient?.addColorStop(1, colors.purple.zero);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: "My Visit to Doctor",
          data: counts,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
      ],
    };
    const config: any = {
      type: "line",
      data: data,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
    // }
    // });
  }, [isLoading]);

  console.log(authuser);

  return (
    <div className="App">
      {isLoading ? (
        <div className="flex justify-center">
          <p>Fetching Data ....</p>
        </div>
      ) : authuser && authuser?.length === 0 ? (
        <div className="flex flex-col items-center">
          <div>
            <h1 className="text-4xl">No Data Available</h1>
          </div>
          <div className="mt-3">
            <Image src="/nodata.jpg" alt="modata" height={200} width={200} />
          </div>
        </div>
      ) : (
        <canvas id="myChart" ref={canvasEl} height="100" />
      )}
    </div>
  );
}
