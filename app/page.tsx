"use client";

import style from "./page.module.css";
import Card1 from "@/components/Cards/Card";
import ScatterPlot from "@/components/chart/chart";
import Card2 from "@/components/Cards/Card2";
import { useGetAlarmQuery } from "@/store/medicinereducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useGetBpQuery } from "@/store/bp";
import { formatDateToString } from "@/utils/MonthDate/date";
import Load from "@/components/Skeleton/load/page";
import DashModal from "@/components/Modal/DashModal";
import React from "react";
import { Modal, useDisclosure } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { useGetBMIQuery } from "@/store/bp";
import { Loginuserdata } from "@/utils/util";
import { useDispatch } from "react-redux";
import { getItem } from "@/store/reducer";
import { useSession } from "next-auth/react";
import { useGetItemOnSessionChange } from "@/utils/islogin";

function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // user data//////////
  useGetItemOnSessionChange();
  const user = useSelector((state: any) => state.user);
  //end userdata
  // const { data: session, status } = useSession({
  //   required: true,
  // });
  console.log(user);

  const {
    data: data1,
    isLoading: loading1,
    error: error1,
  } = useGetAlarmQuery();

  const {
    data: bpdata,
    isLoading: bloodloading,
    error: bperror,
  } = useGetBpQuery();

  const {
    data: BMIQuery,
    isLoading: Bmiloading,
    error: isError,
  } = useGetBMIQuery();

  if (loading1 || bloodloading || Bmiloading) {
    return (
      <div>
        <Load />
      </div>
    );
  }

  if (error1 || bperror || isError) {
    return <div>Error: </div>;
  }

  // console.log(user);
  const loginuser = Loginuserdata(BMIQuery?.data, user.user?.user?.email);

  const specificuser = Loginuserdata(
    bpdata && bpdata.Healthdata,
    user.user?.user?.email
  );
  // console.log(specificuser);
  const date =
    specificuser && specificuser.length > 0
      ? formatDateToString(specificuser[specificuser.length - 1].date)
      : "";

  return (
    <>
      <div className={style.container1}>
        <div>
          <Card1
            title={`Hello!!! ${
              user && user.user?.user?.name
                ? user.user?.user?.name
                : user.user?.user?.email
            }`}
            description="Have a great day!"
            description1=" "
          />
        </div>
        <div className={style.container3}>
          <Card1
            title={
              loginuser.length > 0
                ? `BMI = ${loginuser[loginuser.length - 1].BMI} `
                : "no data"
            }
            description={
              loginuser && loginuser.length > 0
                ? `weight = ${
                    loginuser[loginuser.length - 1].weight
                  } , height=${loginuser[loginuser.length - 1].Height}`
                : "Add data to display"
            }
            content={
              loginuser && loginuser.length > 0
                ? loginuser[loginuser.length - 1].BMI > 24
                  ? "You are over Weight"
                  : loginuser[loginuser.length - 1].BMI < 18
                  ? "You are Under Weight"
                  : "You are Normal"
                : ""
            }
          />
          <Card1
            title="Blood Pressure"
            description={
              specificuser && specificuser.length > 0
                ? `${specificuser[specificuser.length - 1].highPressure}/${
                    specificuser[specificuser.length - 1].lowerPressure
                  } mmHg`
                : "Add data to se display"
            }
            content={
              specificuser && specificuser.length > 0
                ? specificuser[specificuser.length - 1].highPressure > 120
                  ? "High BP"
                  : specificuser &&
                    specificuser[specificuser.length - 1].highPressure < 80
                  ? "Low BP"
                  : "Normal BP"
                : "no data"
            }
            footer={`${date}`}
          />
        </div>
      </div>
      <div className={style.container}>
        <div className={style.apple}>
          <h3>Know about yourself</h3>
          <ScatterPlot />
        </div>
        <div className={style.fruits}>
          <div className={style.mango}>
            <Card2 alarm={data1 && data1.alarm} user={user.user?.user?.email} />
          </div>
          <div className={style.floatingButton} onClick={onOpen}>
            Add Alarm{""}
            <FontAwesomeIcon icon={faCalendar} />
          </div>
          {/* should be in another file  */}
          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <DashModal />
          </Modal>
        </div>
      </div>
    </>
  );
}

export default Home;
