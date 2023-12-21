"use client";

import React, { useState } from "react";
import { StateType } from "@/types";

import {
  useGetAlarmQuery,
  usePostAlarmMutation,
} from "@/store/Medicine/medicine.api";

function Alarm() {
  const [state, setState] = useState<StateType>({
    time: undefined,
    medicine: undefined,
    notification: undefined,
  });

  const { data } = useGetAlarmQuery();
  const [postData, { isLoading }] = usePostAlarmMutation();

  const adddata = async (event: React.MouseEvent) => {
    try {
      const data = {
        time: state.time,
        medicine: state.medicine,
        notification: state.notification,
      };

      console.log("data", data);

      const result = await postData(data);
      console.log(result); // Handle the response as needed
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div>
      <input
        value={state.time}
        onChange={(e) =>
          setState((prevState) => ({ ...prevState, time: e.target.value }))
        }
      />
      <input
        value={state.medicine}
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            medicine: e.target.value,
          }))
        }
      />
      <input
        value={state.notification}
        onChange={(e) =>
          setState((prevState) => ({
            ...prevState,
            notification: e.target.value,
          }))
        }
      />
      <button onClick={adddata}>Create</button>
    </div>
  );
}

export default Alarm;
