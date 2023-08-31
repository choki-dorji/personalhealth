import React, { useRef, useState } from "react";
import { useEditFireMutation } from "@/store/firebase";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/Firebase/setup";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";

const ProfileCard = (props: any) => {
  const name = useRef("");
  const [image, setImage] = useState<Uint8Array | Blob | ArrayBuffer>();

  const address = useRef("");
  const dob = useRef("");
  const [edit, { isLoading: isEditing, isSuccess, isError }] =
    useEditFireMutation();

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    // console.log(file);
    setImage(file);
  };

  //   console.log(image);
  const edithandler = () => {
    // const imageref = ref(storage, `images/${image?.name}`);
    const imageref = ref(
      storage,
      `images/${image instanceof File ? image.name : "defaultName"}`
    );

    image &&
      uploadBytes(imageref, image)
        .then(() => {
          console.log("bj");
        })
        .catch((e) => console.log(e));

    edit({
      id: props.userid,
      data: {
        name: name.current,
        address: address.current,
        image: image instanceof File ? image.name : "defaultName",
      },
    })
      .then((r) => console.log("updated"))
      .catch((err) => console.log(err));
    return true;
  };
  return (
    <ModalContent>
      {(onClose: any) => (
        <>
          <ModalHeader className="flex flex-col gap-1">
            {props.data.name && props.data.email && props.data.address
              ? "Edit User Details"
              : "Add User Details"}
          </ModalHeader>
          <ModalBody>
            <Input
              label="username"
              defaultValue={props.data.name ? props.data.name : ""}
              onChange={(e) => (name.current = e.target.value)}
            />
            <Input
              label="address"
              defaultValue={props.data.address ? props.data.address : ""}
              onChange={(e) => (address.current = e.target.value)}
            />

            <p>Image</p>
            <Input type="file" onChange={handleImageChange} />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onClick={onClose}>
              Close
            </Button>
            <Button
              color="primary"
              onClick={async () => {
                // Call the edithandler function here
                const editSuccessful = await edithandler();
                // console.log(editSuccessful);
                if (editSuccessful) {
                  onClose(); // Close the modal if editing was successful
                }
              }}
            >
              {props.data.name && props.data.email && props.data.address
                ? "Edit Details"
                : "Add Details"}
            </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
  );
};

export default ProfileCard;
