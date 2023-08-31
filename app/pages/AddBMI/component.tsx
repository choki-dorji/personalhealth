import React from "react";
import { Bdata, BMIitem } from "@/types";
import CardWithHead from "@/app/components/Cards/Card1";

interface BMIcardprops {
  data: Bdata[] | undefined;
}

const BMICard: React.FC<BMIcardprops> = (props) => {
  return (
    <div className="mt-4 m-2 flex justify-center flex-wrap">
      {props.data &&
        props.data.map((item: BMIitem) => {
          const height = item.Height / 100;
          const weight = item.weight;

          const BMI = weight / (height * height);

          return (
            <CardWithHead
              key={item._id}
              date={`BMI : ${BMI}`}
              pressure={`Height: ${item.weight} ,Weight:  ${item.Height}`}
            />
          );
        })}
    </div>
  );
};

export default BMICard;
