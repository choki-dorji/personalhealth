import React from "react";
import { items } from "@/types";
import CardWithHead from "@/app/components/Cards/Card1";
import { Bp } from "@/types";
import { convertIsoToCustomFormat } from "@/utils/util";

interface Graph {
  data: Bp[] | undefined;
}

const GraphCard: React.FC<Graph> = (props) => {
  let description: string;
  return (
    <div className="mt-4 m-2 flex justify-center flex-wrap">
      {props.data && props.data.length > 0 ? (
        props.data.map((item: items) => {
          if (item.highPressure > 120 || item.lowerPressure > 80) {
            description = "you have high blood pressure take necessary action";
          }
          if (item.lowerPressure <= 80 || item.highPressure <= 120) {
            description = "your blood pressure is normal";
          }
          return (
            <CardWithHead
              key={item._id}
              date={convertIsoToCustomFormat(item.date)}
              pressure={`${item.highPressure}/${item.lowerPressure} mmHg`}
              description={description}
            />
          );
        })
      ) : (
        <p>No Data</p>
      )}
    </div>
  );
};

export default GraphCard;
