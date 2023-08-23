"use client";
import React, { useState } from "react";
import Input1 from "../Input";
import { Button } from "@nextui-org/react";
import { usePostBpMutation } from "@/store/bp";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Form, Field } from "react-final-form";
import styles from "./add.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Add() {
  const user = useSelector((state: any) => state.user);
  const [value, setValue] = useState<Number | null>(null);
  const [value1, setValue1] = useState<Number | null>(null);

  const [postBp, { isSuccess }] = usePostBpMutation();

  const submithandler = async (values: any) => {
    await postBp({
      highPressure: values.higher,
      lowerPressure: values.lower,
      OtherInformation: "",
      description: "",
      user: user.user?.user?.email,
    });

    if (isSuccess) {
      toast.success("Inserted successfully", {
        position: "top-center",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const required = (value: any) =>
    value ? undefined : "This field is required";

  // sgould be less than higher than lower than
  return (
    // <>
    //   <form className="flex justify-center" onSubmit={handleSubmit}>
    //     <Input1
    //       type="number"
    //       label={props.label1}
    //       value={value}
    //       onChange={(e) => setValue(e.target.value)}
    //       className="mr-2 h-[2rem]" // Margin and equal height
    //     />
    //     <Input1
    //       type="number"
    //       label={props.label2}
    //       value={value1}
    //       onChange={(e) => setValue1(e.target.value)}
    //       className="mr-2 h-[2rem]" // Margin and equal height
    //     />
    //     <Button type="submit" className="mt-2 h-[3rem]">
    //       Add
    //     </Button>
    //     <ToastContainer />
    //   </form>
    // </>
    <>
      <Form onSubmit={submithandler}>
        {({ handleSubmit, values, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="higher"
              component="input"
              placeholder="Higher"
              validate={required}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.div}>
                  <label className={styles.label}>{placeholder}</label>
                  <div className={styles.inputContainer}>
                    <input
                      {...input}
                      type="number"
                      placeholder={placeholder}
                      className={
                        meta.error && meta.touched
                          ? styles.inputerror
                          : styles.input
                      }
                    />
                    {meta.touched && !meta.error && (
                      <div className={styles.iconContainer}>
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    )}
                  </div>
                  {meta.error && meta.touched && (
                    <span className={styles.span}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
            <Field
              name="lower"
              component="input"
              placeholder="Lower"
              validate={(value) =>
                parseInt(value) > parseInt(values.higher)
                  ? "Lower value cannot be Higher than high"
                  : !value
                  ? "It is required field"
                  : undefined
              }
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.div}>
                  <label className={styles.label}>{placeholder}</label>
                  <div className={styles.inputContainer}>
                    <input
                      {...input}
                      type="number"
                      placeholder={placeholder}
                      className={
                        meta.error && meta.touched
                          ? styles.inputerror
                          : styles.input
                      }
                    />
                    {meta.touched && !meta.error && (
                      <div className={styles.iconContainer}>
                        <FontAwesomeIcon icon={faCheck} />
                      </div>
                    )}
                  </div>
                  {meta.error && meta.touched && (
                    <span className={styles.span}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>
            <Button
              type="submit"
              className="mt-2 h-[3rem]"
              isDisabled={submitting}
            >
              {submitting ? "Adding" : "Add"}
            </Button>
          </form>
        )}
      </Form>
    </>
  );
}

export default Add;
