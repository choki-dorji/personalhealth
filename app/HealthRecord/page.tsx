"use client";
import React, { ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import Input1 from "@/components/Input";
import { Button } from "@nextui-org/button";
import { Healthdata } from "@/LIB/models/topic";
// import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function postApi(
  diagonisis: string,
  description: string,
  medication: string,
  otherinfo: string,
  user: string
) {
  console.log(user);
  return fetch("/api/HealthData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      diagonisis: diagonisis,
      description: description,
      medication: medication,
      otherinfo: otherinfo,
      user: user,
    }),
  });
}

function Health() {
  const user = useSelector((state: any) => state.user);
  const [DiaError, setDiaError] = useState("");
  const [DescriptionError, setDescriptionError] = useState("");
  const [MedicationError, setMedicationError] = useState("");
  const [OtherInfoError, setOtherInfoError] = useState("");

  // for data
  const [Dia, setDia] = useState("");
  const [Description, setDescription] = useState("");
  const [Medication, setMedication] = useState("");
  const [OtherInfo, setOtherInfo] = useState("");

  // nsdkvas
  const validateFields = () => {
    let isValid = true;

    if (!Dia) {
      setDiaError("Diagnosis is required");
      isValid = false;
    } else {
      setDiaError("");
    }

    if (!Description) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!Medication) {
      setMedicationError("Medication is required");
      isValid = false;
    } else {
      setMedicationError("");
    }

    if (!OtherInfo) {
      setOtherInfoError("Other Info is required");
      isValid = false;
    } else {
      setOtherInfoError("");
    }

    return isValid;
  };

  const submitForm = () => {
    if (!validateFields()) {
      return; // If any field is empty, stop form submission
    }
    postApi(Dia, Description, Medication, OtherInfo, user.user?.user?.email)
      .then((response) => {
        if (response.ok) {
          setDia("");
          setDescription("");
          setMedication("");
          setOtherInfo("");
          toast.success("Record inserted successfully", {
            position: "top-center",
            autoClose: 3000, // Close the toast after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          // You might want to reset the form fields here
        } else {
          console.log("Failed to post data");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  return (
    <div
      style={{
        marginBottom: "30px",
        background: "grey",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div className="flex flex-row">
        <FontAwesomeIcon icon={faPlus} />
        <h1 className="text-lg font-bold">Add Prescription</h1>
      </div>
      <h2>Save Your Data for Long Term Remembrance</h2>
      <Input1
        label="Diagnosis"
        type="text"
        value={Dia}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setDia(e.target.value)}
      />
      {DiaError && <div style={{ color: "red" }}>{DiaError}</div>}{" "}
      {/* Display error message */}
      <Input1
        label="Description"
        type="text"
        value={Description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setDescription(e.target.value)
        }
      />
      {DescriptionError && (
        <div style={{ color: "red" }}>{DescriptionError}</div>
      )}{" "}
      {/* Display error message */}
      <Input1
        label="Medication"
        type="text"
        value={Medication}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMedication(e.target.value)
        }
      />
      {MedicationError && <div style={{ color: "red" }}>{MedicationError}</div>}{" "}
      {/* Display error message */}
      <Input1
        label="Other Info"
        type="text"
        value={OtherInfo}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setOtherInfo(e.target.value)
        }
      />
      {OtherInfoError && <div style={{ color: "red" }}>{OtherInfoError}</div>}{" "}
      {/* Display error message */}
      <Button onClick={submitForm}>Post</Button>
      <ToastContainer />
    </div>
  );
}

export default Health;
