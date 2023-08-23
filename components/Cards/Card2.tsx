import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import {
  faTrash,
  faPenToSquare,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Delete1 from "../Modal/Dashbaord/Delete";
import Edit from "../Modal/Dashbaord/Edit";
import { useDeleteAlarmMutation } from "@/store/medicinereducer";

export default function Card2(props: Alarmdata) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id, setId] = useState("");
  const [toastDisplayed, setToastDisplayed] = useState(false); // Add this state

  const [deleteHandler, { isLoading, isSuccess, isError }] =
    useDeleteAlarmMutation();

  useEffect(() => {
    if (isSuccess && !toastDisplayed) {
      // Check if toast has not been displayed yet
      toast.success("Alarm Deleted successfully", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setToastDisplayed(true); // Set the state to indicate toast is displayed
    }
  }, [isSuccess, toastDisplayed]);

  // const {
  //   isOpen: isOpendelete,
  //   onOpen: onOpenDelete,
  //   onOpenChange: onDeleteOpenChange,
  // } = useDisclosure();

  const selectedtime = useSelector((state: any) => state.time);
  // console.log(selectedtime);
  // console.log(props.user);
  const specificuser =
    props.alarm && props.alarm.filter((f) => f.user === props.user);
  // console.log(specificuser);

  const filteredAlarms = Alarms(specificuser, selectedtime);
  // console.log(filteredAlarms);
  // console.log(filteredAlarms);
  // console.log(props);

  // );
  // const Edit = () => {};
  const Delete = (Id: string) => {
    setId(Id);
    onOpen();
  };

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
          filteredAlarms?.map((alarm: Alarm) => (
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
                      onClick={() => Delete(alarm._id)}
                      className="mr-2"
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>
                  {/* <Tooltip content="Edit" color="primary">
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip> */}
                </div>
                {/* delete */}
              </CardBody>
            </>
          ))
        ) : (
          <CardBody
            className="flex flex-row justify-between"
            style={{
              backgroundColor: "#4D3C77",
              margin: "12px",
              borderRadius: "12px",
            }}
          >
            <FontAwesomeIcon icon={faClock} />
            <p>No Alarm </p>
          </CardBody>
        )}
      </div>
      {/* delete */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <Delete1
          onDelete={() => {
            deleteHandler(id);
            onOpenChange;
          }}
          isLoading={isLoading}
        />
      </Modal>

      {/* edit */}
      {/* <Modal
        isOpen={isOpendelete}
        onOpenChange={onDeleteOpenChange}
        placement="top-center"
      >
        <Edit onClose={onclose} id={props.alarm?._id} onedit={onOpenChange} />
      </Modal> */}
      <ToastContainer />
    </Card>
  );
}
