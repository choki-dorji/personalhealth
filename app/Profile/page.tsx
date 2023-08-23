"use client";
import React, { useRef, useState } from "react";
import styles from "./profile.module.css";
import { useSession } from "next-auth/react";
import { LoginUserProfile } from "@/utils/util";
import Loader from "@/components/Loader/load";
import {
  useGetFireDataQuery,
  useEditFireMutation,
  useGetFireDataidQuery,
} from "@/store/firebase";
import { Button, Input } from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/Firebase/setup";
import { Imagetype } from "@/types";
import { useGetItemOnSessionChange } from "@/utils/islogin";

const link =
  "https://firebasestorage.googleapis.com/v0/b/projectauthbackend.appspot.com/o/images";

interface Image {
  name: string;
}

const Profile = () => {
  useGetItemOnSessionChange();
  const name = useRef("");
  const [image, setImage] = useState<
    Imagetype | Uint8Array | Blob | ArrayBuffer
  >();

  const address = useRef("");
  const dob = useRef("");

  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: profile, isLoading, error } = useGetFireDataQuery();
  const iduser = LoginUserProfile(profile, session?.user?.email);
  const [edit, { isLoading: isEditing, isSuccess, isError }] =
    useEditFireMutation();

  const {
    data: data1,
    isLoading: load,
    error: errorr,
  } = useGetFireDataidQuery(iduser && iduser);

  if (isLoading || load) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }
  // console.log(profile);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  console.log(image);
  const edithandler = (onClose: void) => {
    // const imageref = ref(storage, `images/${image?.name}`);
    const imageref = ref(
      storage,
      `images/${image instanceof File ? image.name : "defaultName"}`
    );

    uploadBytes(imageref, image)
      .then(() => {
        console.log("bj");
      })
      .catch((e) => console.log(e));

    edit({
      id: iduser,
      data: {
        name: name.current,
        address: address.current,
        image: image?.name ?? image,
      },
    })
      .then((r) => console.log("updated"))
      .catch((err) => console.log(err));

    onClose();
  };

  const imagelink = `${link}%2F${data1.image}?alt=media`;

  return (
    <div className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.profileImage}>
          {data1.image !== "" ? (
            <div className="flex justify-center">
              <Image
                isZoomed
                src={imagelink}
                alt="ajcnk"
                height={100}
                width={100}
              />
            </div>
          ) : (
            <div className="flex justify-center">
              <Image src="/image.png" alt="ajcnk" height={100} width={100} />
            </div>
          )}
        </div>
        <div className={styles.profileDetails}>
          <h2 className={styles.name}>
            {data1.name ? `Name: ${data1.name}` : ""}
          </h2>
          <p className={styles.email}>
            {data1.email ? `Email: ${data1.email}` : ""}
          </p>
          <p className={styles.address}>
            {data1.address ? `Address: ${data1.address}` : ""}
          </p>
        </div>
        <Button onPress={onOpen}>
          {data1.name && data1.email && data1.address
            ? "Edit Details"
            : "Add Details"}
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose: void) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add User Details
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="username"
                    defaultValue={data1.name ? data1.name : ""}
                    onChange={(e) => (name.current = e.target.value)}
                  />
                  <Input
                    label="address"
                    defaultValue={data1.address ? data1.address : ""}
                    onChange={(e) => (address.current = e.target.value)}
                  />

                  <p>Image</p>
                  <Input type="file" onChange={handleImageChange} />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onClick={() => edithandler(onClose)}>
                    {data1.name && data1.email && data1.address
                      ? "Edit Details"
                      : "Add Details"}
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {/* </> */}
      </div>
    </div>
  );
};

export default Profile;
