import React, { useState, useEffect } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EditModalProps, EditedData, editPrescription } from "@/types";

import {
  useGetDetailPrescriptionQuery,
  useEditPrescriptionMutation,
} from "@/store/medicinereducer";

const ModalEdit: React.FC<EditModalProps> = ({ id, onedit }) => {
  const { data, isLoading } = useGetDetailPrescriptionQuery(id);
  const [editPrescription, { isLoading: isEditing, isSuccess, isError }] =
    useEditPrescriptionMutation();

  // State variables to store input values
  const [diagnosis, setDiagnosis] = useState("");
  const [description, setDescription] = useState("");
  const [medicine, setMedicine] = useState("");
  const [otherInformation, setOtherInformation] = useState("");

  useEffect(() => {
    if (!isLoading && data) {
      setDiagnosis(data.data.feedback.Diagonisis);
      setDescription(data.data.feedback.description);
      setMedicine(data.data.feedback.Medicine);
      setOtherInformation(data.data.feedback.OtherInformation);
    }
  }, [isLoading, data]);

  const handleUpdateClick = async () => {
    const updatedData = {
      diagonisis: diagnosis,
      description: description,
      Medicine: medicine,
      OtherInformation: otherInformation,
    };

    const editedData: any = await editPrescription({
      id: id,
      data: updatedData,
    });
    if (isLoading) {
      return <p>loading</p>;
    }

    console.log(editedData);

    // console.log(isSuccess);
    if (editedData.data.status === "success") {
      toast.success("Prescription updated successfully", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      onedit();
    }
  };
  // jsbddjbasdvjbsadjbkjadsv
  if (isLoading) {
    return (
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Prescription
            </ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                label="Diagnosis"
                variant="bordered"
                value="Loading..." // Placeholder text or loading indicator
                disabled // Disable the input while loading
              />
              <Input
                label="Description"
                variant="bordered"
                value="Loading..."
                disabled
              />
              <Input
                label="Medicine"
                variant="bordered"
                value="Loading..."
                disabled
              />
              <Input
                label="Doctor's Message"
                variant="bordered"
                value="Loading..."
                disabled
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" disabled>
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    );
  }

  return (
    <ModalContent>
      {(onClose: any) => (
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
              onClick={handleUpdateClick}
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

export default ModalEdit;
