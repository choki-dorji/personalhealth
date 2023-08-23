import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { usePostAlarmMutation } from "@/store/medicinereducer";

function DashModal() {
  const [AlarmPost, { isLoading }] = usePostAlarmMutation();
  const user = useSelector((state: any) => state.user);
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");

  const isButtonDisabled = time === "" || medicine === ""; // Disable button if either input is empty

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AlarmPost({
        time: time,
        medicine: medicine,
        notification: "gchchcg",
        user: user.user?.user?.email,
      });
      // Clear input fields
      setMedicine("");
      setTime("");
    } catch (e) {
      console.error("Error creating alarm:", e);
    }
  };

  return (
    <ModalContent>
      {(onClose: void) => (
        <>
          <form onSubmit={handleCreate}>
            <ModalHeader className="flex flex-col gap-1">Add Alarm</ModalHeader>
            <ModalBody>
              <Input
                autoFocus
                type="time"
                label="Time"
                value={time}
                placeholder=""
                variant="bordered"
                onChange={(e) => setTime(e.target.value)}
                required
              />
              <Input
                label="Label"
                placeholder="Enter Label"
                type="text"
                value={medicine}
                variant="bordered"
                onChange={(e) => setMedicine(e.target.value)}
                required
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                type="submit"
                // disabled={isButtonDisabled} // Disable the button if inputs are empty
              >
                {isLoading ? "Creating..." : "Create"}
              </Button>
            </ModalFooter>
          </form>
        </>
      )}
    </ModalContent>
  );
}

export default DashModal;
