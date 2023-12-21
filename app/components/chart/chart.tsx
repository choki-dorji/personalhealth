"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useGetAllPrescriptionQuery } from "@/store/Medicine/medicine.api";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};
export default function ScatterPlot() {
  const { data: session, status } = useSession();
  console.log(session);

  const { data: data1, isLoading, error } =
    //@ts-ignore
    useGetAllPrescriptionQuery(session?.user?.email);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <p className="text-4xl animate-gradient">Fetching Data ...</p>
      </div>
    );
  }

  const labels = data1 && Object.keys(data1);
  const counts = data1 && Object.values(data1);

  const data = {
    labels,
    datasets: [
      {
        backgroundColor: "#C0AFE2",
        label: "My Visit to Doctor",
        data: counts,
        fill: true,
        borderWidth: 2,
        borderColor: "#6511EE",
        lineTension: 0.4,
        pointBackgroundColor: "#C64CDE",
        pointRadius: 5,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
