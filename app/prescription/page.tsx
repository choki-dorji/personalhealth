"use client";
import React from "react";
import Search from "../components/Search/page";
import CardWithHead from "../components/Cards/Card1";
import Prescription from "../components/Cards/Prescription";
import styles from "./style.module.css";
import { useSelector } from "react-redux";
import {
  useGetDetailPrescriptionQuery,
  useGetPrescriptionQuery,
} from "@/store/Medicine/medicine.api";
import Loader from "../components/Loader/load";
import { Loginuserdata } from "@/utils/util";
import { Presc } from "@/types";
import { useGetItemOnSessionChange } from "@/utils/islogin";
import Link from "next/link";

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

  console.log(searchText);
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

  // console
  const filtered: Presc[] = specificuser.filter((item: Presc) => {
    if (searchText.text) {
      return item.Diagonisis.toLowerCase().includes(
        searchText.text.toLowerCase()
      );
    }
  });
  console.log(filtered);

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
          {/* {filtered.length === 0 ? <div>No Search Results</div> : ""} */}
          {filtered && filtered.length > 0 ? (
            filtered.map((item) => (
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
          ) : specificuser.length === 0 ? (
            <div>
              <p>No prescription</p>
            </div>
          ) : searchText.text !== "" && filtered && filtered.length === 0 ? (
            <div>
              <p>No Search Result</p>
            </div>
          ) : (
            specificuser.map((item: any) => (
              <>
                {" "}
                <Prescription
                  _id={item._id}
                  key={item._id}
                  Diagonisis={item.Diagonisis}
                  Medicine={item.Medicine}
                  description={item.description}
                  OtherInformation={item.OtherInformation}
                  date={item.date}
                />
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
