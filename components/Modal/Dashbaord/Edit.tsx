import React, { useState, useEffect } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EditModalProps {
  id: string;
  onedit: () => void;
}

import {
  useGetDetailPrescriptionQuery,
  useEditPrescriptionMutation,
} from "@/store/medicinereducer";

interface EditedDataResponse {
  data: {
    status: string;
  };
}

const Edit: React.FC<EditModalProps> = ({ id, onedit }) => {
  const { data, isLoading } = useGetDetailPrescriptionQuery(id);
  const [editPrescription, { isLoading: isEditing, isSuccess, isError }] =
    useEditPrescriptionMutation();

  // State variables to store input values
  const [diagnosis, setDiagnosis] = useState("");
  const [description, setDescription] = useState("");
  const [medicine, setMedicine] = useState("");
  const [otherInformation, setOtherInformation] = useState("");

  return (
    <ModalContent>
      {(onClose: void) => (
        <>
          <ToastContainer />
          <ModalHeader className="flex flex-col gap-1">
            Edit Prescription
          </ModalHeader>
          <ModalBody>
            <Input
              autoFocus
              label="Diagnosis"
              variant="bordered"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
            <Input
              label="Description"
              variant="bordered"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              label="Medicine"
              variant="bordered"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />
            <Input
              label="Doctor's Message"
              variant="bordered"
              value={otherInformation}
              onChange={(e) => setOtherInformation(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onClick={onClose}>
              Close
            </Button>
            <Button
              color="primary"
              //   onClick={handleUpdateClick}
              disabled={isEditing}
            >
              {isEditing ? "Updating..." : "Update"}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};

export default Edit;
