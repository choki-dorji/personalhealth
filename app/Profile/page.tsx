"use client";
import React from "react";
import styles from "./profile.module.css";
import { useSession } from "next-auth/react";
import { LoginUserProfile } from "@/utils/util";
import Loader from "../components/Loader/load";
import { useGetFireDataQuery, useGetFireDataidQuery } from "@/store/firebase";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { Modal, useDisclosure } from "@nextui-org/react";
import { useGetItemOnSessionChange } from "@/utils/islogin";
import ProfileCard from "../pages/Profile/profileModal";

const link =
  "https://firebasestorage.googleapis.com/v0/b/projectauthbackend.appspot.com/o/images";

interface Image {
  name: string;
}

const Profile = () => {
  useGetItemOnSessionChange();

  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: profile, isLoading, error } = useGetFireDataQuery();
  const iduser = LoginUserProfile(profile, session?.user?.email);

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
          <ProfileCard data={data1} userid={iduser} />
        </Modal>
        {/* </> */}
      </div>
    </div>
  );
};

export default Profile;
