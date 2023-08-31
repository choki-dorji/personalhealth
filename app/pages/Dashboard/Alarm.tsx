"use client";
import React from "react";
import { useGetAlarmQuery } from "@/store/medicinereducer";
import Card2 from "@/app/components/Cards/Card2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { Modal, useDisclosure } from "@nextui-org/react";
import DashModal from "@/app/components/Modal/DashModal";
import style from "./Alarm.module.css";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

const Alarm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector((state: any) => state.user);

  const {
    data: data1,
    isLoading: loading1,
    error: error1,
  } = useGetAlarmQuery();
  return (
    <div className={`${style.fruits}`}>
      <div className={style.mango}>
        {loading1 ? (
          <Card2 isLoading={true} user={user.user?.user?.email} />
        ) : (
          <Card2 alarm={data1 && data1.alarm} user={user.user?.user?.email} />
        )}
      </div>
      {!loading1 ? (
        <div className={style.floatingButton} onClick={onOpen}>
          Add Alarm{""}
          <FontAwesomeIcon icon={faCalendar} />
        </div>
      ) : (
        <div className={style.floatingButton} onClick={onOpen}>
          Add Alarm{""}
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <DashModal />
      </Modal>
    </div>
  );
};

export default Alarm;
