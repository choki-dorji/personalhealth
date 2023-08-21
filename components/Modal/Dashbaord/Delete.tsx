import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface PrescriptionModalContentProps {
  onClose: () => any;
  onDelete: () => void;
}

const Delete: React.FC<PrescriptionModalContentProps> = ({
  onClose,
  onDelete,
}) => {
  return (
    <>
      <ModalContent>
        {(onClose: void) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Alarm
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
export default Delete;
