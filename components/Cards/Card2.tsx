import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import Select from "../Select/page";
import { useSelector } from "react-redux";
import { Alarm, Alarmdata } from "@/types";
import { Alarms, format12Hour } from "@/utils/util";
import A from "../sound/Notifi";

export default function Card2(props: Alarmdata) {
  const selectedtime = useSelector((state: any) => state.time);
  // console.log(selectedtime);

  const specificuser =
    props.alarm && props.alarm.filter((f) => f.user === props.user);

  const filteredAlarms = Alarms(specificuser, selectedtime);
  // console.log(filteredAlarms);

  return (
    <Card className="max-w-[360px]">
      <CardHeader
        className="flex justify-between items-center"
        style={{ background: "#6E78FF" }}
      >
        <div className="flex flex-col">
          <p className="text-md">Medicine to Take</p>
        </div>

        <Select />
      </CardHeader>
      <Divider />
      <div className="h-[60vh] overflow-y-scroll">
        {filteredAlarms && filteredAlarms.length > 0 ? (
          filteredAlarms.map((alarm: Alarm) => (
            <Tooltip
              content={`you have alarm at ${selectedtime.user}`}
              key={alarm.time}
            >
              <CardBody
                className="flex flex-row justify-between"
                style={{
                  backgroundColor: "#4D3C77",
                  margin: "12px",
                  borderRadius: "12px",
                }}
              >
                <div className="flex flex-col">
                  <p className="text-md">{alarm.medicine}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-small text-default-500">
                    {format12Hour(alarm.time)}
                  </p>
                </div>
              </CardBody>
              <A alarm={alarm.time} name={alarm.medicine} />
            </Tooltip>
          ))
        ) : specificuser &&
          filteredAlarms?.length === 0 &&
          specificuser.length > 0 ? (
          specificuser.map((item: Alarm) => (
            <CardBody key={item.time} className="flex flex-row justify-between">
              <div className="flex flex-col">
                <p className="text-md">{item.medicine}</p>
              </div>

              <div className="flex items-center">
                {/* <Check /> */}
                <p className="text-small text-default-500">
                  {format12Hour(item.time)}
                </p>
              </div>
              <A alarm={item.time} name={item.medicine} />
            </CardBody>
          ))
        ) : filteredAlarms?.length === 0 ? (
          <Tooltip content={`No alarm at ${selectedtime.user}`}>
            <div
              style={{
                backgroundColor: "#4D3C77",
                margin: "12px",
                borderRadius: "12px",
                padding: "30px",
              }}
            >
              <p className="text-lg text-default-700 flex justify-center">
                No Alarms
              </p>
            </div>
          </Tooltip>
        ) : specificuser?.length === 0 ? (
          <Tooltip content={`No alarm at ${selectedtime.user}`}>
            <div
              style={{
                backgroundColor: "#4D3C77",
                margin: "12px",
                borderRadius: "12px",
                padding: "30px",
              }}
            >
              <p className="text-lg text-default-700 flex justify-center">
                No Alarms
              </p>
            </div>
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    </Card>
  );
}
