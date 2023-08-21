import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { BMIData } from "@/store/bp";

const BMIGraph = (props: BMIData) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      if (chartRef.current) {
        // Destroy the previous Chart instance
        chartRef.current.destroy();
      }

      const ctx = canvas.getContext("2d");
      console.log(props);

      const labels =
        props.Healthdata && props.Healthdata.map(({ date }) => date);
      const values = props.Healthdata && props.Healthdata.map(({ bmi }) => bmi);

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

  return (
    <div>
      <canvas ref={canvasRef} width="400" height="100"></canvas>
    </div>
  );
};

export default BMIGraph;
