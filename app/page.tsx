"use client";
import style from "./page.module.css";
import Card1 from "./components/Cards/Card";
import ScatterPlot from "./components/chart/chart";
import Card2 from "./components/Cards/Card2";
import { useGetAlarmQuery } from "@/store/medicinereducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { useGetBpQuery } from "@/store/bp";
import { formatDateToString } from "@/utils/MonthDate/date";

import DashModal from "./components/Modal/DashModal";
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
  const { data: session, status } = useSession({
    required: true,
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // user data//////////
  useGetItemOnSessionChange();
  const user = useSelector((state: any) => state.user);
  //end userdata
  // console.log(user);

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
      <div
        className={`flex sm: flex-row md:flex-row xl: flex-col lg:flex-col${style.container1} `}
      >
        {/* <Usermess user={user.user?.user?.email} /> */}
        <div className="sm:w-[100%] xs:w-[100%] md:w-[100%] md:mr-4 lg:mr-4 xl:mr-4 sm:mr-0 xs:mr-0">
          <Card1
            title={
              user.user?.user
                ? `Hello!!! ${user.user?.user?.email}`
                : "Loading ..."
            }
            description={user.user?.user ? "Have a nice day!" : "Loading ..."}
            description1=" "
          />
        </div>

        {/* one */}
        <div
          className={`flex flex-row ${style.container3} xs:top-4 sm:mt-4 md:mt-0 xl:mt-0 lg:mt-0`}
        >
          <div>
            {/* onee */}
            {Bmiloading ? (
              <Card1 title="Loading ..." description="Loading ..." content="" />
            ) : (
              <Card1
                title={
                  loginuser.length > 0
                    ? `BMI = ${loginuser[loginuser.length - 1].BMI} `
                    : "BMI"
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
            )}
          </div>

          {/* another */}
          <div>
            {!bloodloading ? (
              <Card1
                title="Blood Pressure"
                description={
                  specificuser && specificuser.length > 0
                    ? `${specificuser[specificuser.length - 1].highPressure}/${
                        specificuser[specificuser.length - 1].lowerPressure
                      } mmHg`
                    : "Add data to display"
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
            ) : (
              <Card1 title="Loading ..." description="Loading ..." content="" />
            )}
          </div>
          {/* endanother */}
        </div>

        {/* end */}
      </div>

      <div className={`${style.container}`}>
        <div className={`${style.apple}`}>
          <h3>Know about yourself</h3>
          <ScatterPlot />
        </div>
        <div className={`${style.fruits}`}>
          <div className={style.mango}>
            {loading1 ? (
              <Card2 isLoading={true} user={user.user?.user?.email} />
            ) : (
              <Card2
                alarm={data1 && data1.alarm}
                user={user.user?.user?.email}
              />
            )}
          </div>
          {!loading1 ? (
            <div className={style.floatingButton} onClick={onOpen}>
              Add Alarm{""}
              <FontAwesomeIcon icon={faCalendar} />
            </div>
          ) : // <div className={style.floatingButton} onClick={onOpen}>
          //   Add Alarm{""}
          // </div>
          null}

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
