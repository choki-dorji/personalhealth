"use client";
import React from "react";
import Search from "@/components/Search/page";
import CardWithHead from "@/components/Cards/Card1";
import Prescription from "@/components/Cards/Prescription";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import {
  useGetDetailPrescriptionQuery,
  useGetPrescriptionQuery,
} from "@/store/medicinereducer";
import Loader from "@/components/Loader/load";
import { Loginuserdata } from "@/utils/util";
import { Presc } from "@/types";
import { useGetItemOnSessionChange } from "@/utils/islogin";

interface State {
  text: string;
}
interface inState {
  search: State;
}

function Page() {
  useGetItemOnSessionChange();
  const { data, isLoading, error } = useGetPrescriptionQuery();
  const searchText = useSelector((state: inState) => state.search);
  const userdata = useSelector((state: any) => state.user);
  // console.log(userdata);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  const specificuser = Loginuserdata(
    data?.Healthdata,
    userdata.user?.user?.email
  );

  // console.log(specificuser);

  const filtered: Presc[] = specificuser.filter(
    (item: Presc) => item.Diagonisis === searchText.text
  );

  return (
    <div>
      <Search />
      <div className="flex justify-center">
        <div
          className={styles.container3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {filtered && filtered.length > 0 ? (
            <Prescription
              _id={filtered[0]._id}
              key={filtered[0]._id}
              Diagonisis={filtered[0].Diagonisis}
              Medicine={filtered[0].Medicine}
              description={filtered[0].description}
              OtherInformation={filtered[0].OtherInformation}
              date={filtered[0].date}
            />
          ) : specificuser.length > 0 ? (
            specificuser.map((item: any) => (
              <Prescription
                _id={item._id}
                key={item._id}
                Diagonisis={item.Diagonisis}
                Medicine={item.Medicine}
                description={item.description}
                OtherInformation={item.OtherInformation}
                date={item.date}
              />
            ))
          ) : (
            <div>
              <p>No prescription</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
