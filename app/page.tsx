import style from "./page.module.css";
import ScatterPlot from "./components/chart/chart";
import React from "react";
import { useSession } from "next-auth/react";
import BMI_BP from "./pages/Dashboard/BMI_BP";
import UserGreet from "./pages/Dashboard/UserGreet";
import Alarm from "./pages/Dashboard/Alarm";

function Home() {
  return (
    <>
      <div
        className={`flex sm: flex-row md:flex-row xl: flex-col lg:flex-col${style.container1} `}
      >
        {/* Welcome Message */}
        <div className="sm:w-[100%] xs:w-[100%] md:w-[100%] md:mr-4 lg:mr-4 xl:mr-4 sm:mr-0 xs:mr-0">
          {/* usergreet */}
          <UserGreet />
        </div>

        <div
          className={`flex flex-row ${style.container3} xs:top-4 sm:mt-4 md:mt-0 xl:mt-0 lg:mt-0`}
        >
          {/* BMI */}
          <BMI_BP />

          {/* endanother */}
        </div>

        {/* end */}
      </div>

      <div className={`${style.container}`}>
        <div className={`${style.apple}`}>
          <h3>Know about yourself</h3>
          <ScatterPlot />
        </div>

        <Alarm />
      </div>
    </>
  );
}

export default Home;
