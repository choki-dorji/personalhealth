import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface PrescriptionModalContentProps {
  onDelete: () => void;
}

const ModalDelete: React.FC<PrescriptionModalContentProps> = ({ onDelete }) => {
  return (
    <>
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Prescription
            </ModalHeader>
            <ModalBody>
              <p>Are you sure?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                No
              </Button>
              <Button color="primary" onClick={onDelete}>
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </>
  );
};
export default ModalDelete;
