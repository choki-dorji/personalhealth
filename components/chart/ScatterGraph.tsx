import React from "react";
import { Scatter } from "react-chartjs-2";

const ScatterGraph = ({ data }) => {
  return (
    <Scatter
      data={data}
      options={{
        scales: {
          x: {
            position: "bottom",
          },
          y: {
            position: "left",
          },
        },
      }}
    />
  );
};

export default ScatterGraph;
