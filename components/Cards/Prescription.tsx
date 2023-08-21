"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardBody, Divider } from "@nextui-org/react";
import { Tooltip } from "@nextui-org/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCapsules,
  faTrash,
  faFilePen,
} from "@fortawesome/free-solid-svg-icons";
import { useDeletePrescriptionMutation } from "@/store/medicinereducer";
import { Modal, useDisclosure } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalDelete from "../Modal/Modal";
import ModalEdit from "../Modal/EditModal";
import { Presc } from "@/types";

// diagonisis, description, Medicine, OtherInformation

export default function Prescription(props: Presc) {
  const {
    isOpen: isOpendelete,
    onOpen: opendelete,
    onOpenChange: opendeletechange,
  } = useDisclosure();

  const {
    isOpen: isOpenedit,
    onOpen: openedit,
    onOpenChange: openeditchange,
  } = useDisclosure();

  const [deleted, setDeleted] = useState(false);

  const [deleteHandler, { isLoading, isSuccess, isError }] =
    useDeletePrescriptionMutation();

  if (isSuccess) {
    toast.success("Prescription Deleted successfully", {
      position: "top-center",
      // autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <>
      <Card className="w-[70%] m-2">
        <CardHeader className="flex justify-between items-center gap-3">
          <div className="flex flex-col ml-3">
            <p className="text-md">{props.Diagonisis}</p>
            <p className="text-small text-default-500">Date: {props.date}</p>
          </div>
          <div className="flex justify-between">
            <Tooltip content="Edit" color="secondary">
              <FontAwesomeIcon
                icon={faFilePen}
                className="mr-2"
                style={{ cursor: "pointer" }}
                onClick={openedit}
              />
            </Tooltip>
            <Tooltip content="Delete" color="danger">
              <FontAwesomeIcon
                icon={faTrash}
                className="mr-3"
                style={{ cursor: "pointer" }}
                onClick={opendelete}
              />
            </Tooltip>
          </div>
        </CardHeader>

        <Divider />
        <CardBody>
          <p style={{ textAlign: "center" }}>Symptom</p>
          <div
            style={{
              borderRadius: "10px",
              background: "grey",
              padding: "10px",
            }}
          >
            <p>{props.description}</p>
          </div>
        </CardBody>

        <CardBody>
          <p style={{ textAlign: "center" }}>Doctors Word</p>
          <div
            style={{
              borderRadius: "10px",
              background: "grey",
              padding: "10px",
            }}
          >
            <p>{props.OtherInformation}</p>
          </div>
        </CardBody>
        <Divider />
        <CardBody>
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon
              icon={faCapsules}
              style={{ marginRight: "10px" }}
            />
            <p style={{ textAlign: "center", margin: "0" }}>Medicine</p>
          </div>
          <p>{props.Medicine}</p>
        </CardBody>
      </Card>
      {/* popup for delete */}
      <Modal isOpen={isOpendelete} onOpenChange={opendeletechange}>
        <ModalDelete
          onClose={onclose}
          onDelete={() => {
            deleteHandler(props._id);
            opendeletechange;
          }}
        />
      </Modal>

      {/* edit modal */}
      <Modal isOpen={isOpenedit} onOpenChange={openeditchange}>
        <ModalEdit onClose={onclose} id={props._id} onedit={openeditchange} />
      </Modal>

      <ToastContainer />
      {/* popup for edit */}
    </>
  );
}
