import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface Data {
  data: [
    user: string,
    data: [
      month: string,
      high: [value: number, date: string],
      low: [value: number, date: string]
    ]
  ];
}
interface ChartData {
  date: string;
  value: string;
}

const PressureBarGraph = (props: Data) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

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
  console.log(props);

  let allHighData: number[] = [];
  let allLowData: number[] = [];
  let allDates: string[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      props.data.forEach((userEntry) => {
        userEntry.data.forEach((dataEntry) => {
          dataEntry.high.forEach((highEntry) => {
            allHighData.push(highEntry.value);
            allDates.push(highEntry.date);
          });

          dataEntry.low.forEach((lowEntry) => {
            allLowData.push(lowEntry.value);
          });
        });
      });
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: allDates,
          datasets: [
            {
              label: "High Pressure",
              data: allHighData,
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderWidth: 1,
              fill: true,

              borderColor: colors.purple.default,

              pointBackgroundColor: colors.purple.default,
              pointRadius: 3,
              // Adjust this value for the spacing between bars
            },
            {
              label: "Lower Pressure",
              data: allLowData,
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              borderWidth: 1,
              fill: true,

              borderColor: colors.purple.default,

              pointBackgroundColor: colors.purple.default,
              pointRadius: 3,
              // Adjust this value for the spacing between bars
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              stacked: false, // Remove stacking for side-by-side bars
            },
            y: {
              stacked: false, // Remove stacking for side-by-side bars
            },
          },
        },
      });
    }
  }, [props.data]);

  return (
    <div>
      <canvas ref={canvasRef} width="400" height="100"></canvas>
    </div>
  );
};

export default PressureBarGraph;
