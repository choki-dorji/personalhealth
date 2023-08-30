import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { BMIData } from "@/types";

const BMIGraph = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<any | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      if (chartRef.current) {
        // Destroy the previous Chart instance
        chartRef.current.destroy();
      }

      const ctx: any = canvas.getContext("2d");
      console.log(props);

      const labels =
        props.Healthdata &&
        props.Healthdata.map(({ date }: { date: any }) => date);
      const values =
        props.Healthdata &&
        props.Healthdata.map(({ bmi }: { bmi: any }) => bmi);

      chartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "BMI",
              data: values,
              borderColor: "rgba(149, 76, 233, 1)",
              backgroundColor: "rgba(149, 76, 233, 0.5)",
              pointRadius: 3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Bmi",
              },
            },
          },
        },
      });
    }
  }, [props.Healthdata]);

  return <canvas ref={canvasRef} width="400" height="100"></canvas>;
};

export default BMIGraph;
