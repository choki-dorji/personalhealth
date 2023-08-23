import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useSelector } from "react-redux";
import { useGetAllPrescriptionQuery } from "@/store/medicinereducer";

export default function ScatterPlot() {
  const { data: data1, isLoading, error } = useGetAllPrescriptionQuery();
  const userdata = useSelector((state: any) => state.user);
  const canvasEl = useRef(null);

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
    const ctx = canvasEl.current?.getContext("2d");

    if (isLoading) {
      // Return early if data is still loading
      return;
    }

    const specificuser = data1?.Healthdata.filter(
      (d: any) => d.user === userdata.user?.user?.email
    );
    console.log(specificuser);

    const labels = specificuser.map((entry) => entry.month);
    console.log(labels);

    const counts = specificuser.map((entry) => entry.count);
    console.log(counts);
    // order the months

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

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
    const config = {
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

  return (
    <div className="App">
      <span>Chart.js Demo</span>
      <canvas id="myChart" ref={canvasEl} height="100" />
    </div>
  );
}
