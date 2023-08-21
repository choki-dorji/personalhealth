import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Tooltip,
  Modal,
  useDisclosure,
} from "@nextui-org/react";
import Select from "../Select/page";
import { useSelector } from "react-redux";
import { Alarm, Alarmdata } from "@/types";
import { Alarms, format12Hour } from "@/utils/util";
import A from "../sound/Notifi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Delete from "../Modal/Dashbaord/Delete";
import Edit from "../Modal/Dashbaord/Edit";

export default function Card2(props: Alarmdata) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpendelete,
    onOpen: onOpenDelete,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const selectedtime = useSelector((state: any) => state.time);
  console.log(selectedtime);
  console.log(props.user);
  const specificuser =
    props.alarm && props.alarm.filter((f) => f.user === props.user);
  console.log(specificuser);

  const filteredAlarms = Alarms(specificuser, selectedtime);
  console.log(filteredAlarms);
  // console.log(filteredAlarms);
  console.log(props);
  // const Delete = () => (

  // );
  // const Edit = () => {};

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
        {filteredAlarms?.map((alarm: Alarm) => (
          // <Tooltip
          //   content={`you have alarm at ${selectedtime.user}`}
          //   key={alarm._id}
          // >
          <>
            <CardBody
              className="flex flex-row justify-between"
              key={alarm._id}
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
                <p className="text-small mr-9 text-default-500">
                  {format12Hour(alarm.time)}
                </p>
                <Tooltip content="Delete" color="danger">
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={onOpen}
                    className="mr-2"
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
                <Tooltip content="Edit" color="primary">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    onClick={Edit}
                    style={{ cursor: "pointer" }}
                  />
                </Tooltip>
              </div>
              {/* delete */}
            </CardBody>
            {/* <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              placement="top-center"
            >
              <Delete onClose={onclose} onDelete={onclose} />
            </Modal> */}
          </>

          // {/* <A alarm={alarm.time} name={alarm.medicine} /> */}
          // </Tooltip>
        ))}
      </div>
      {/* delete */}

      {/* edit */}
      {/* <Modal
        isOpen={isOpendelete}
        onOpenChange={onDeleteOpenChange}
        placement="top-center"
      >
        <Edit onClose={onclose} id={props.alarm?._id} onedit={onOpenChange} />
      </Modal> */}
    </Card>
  );
}
