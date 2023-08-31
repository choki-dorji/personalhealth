"use client";
import React from "react";
import { Form, Field } from "react-final-form";
import { Button } from "@nextui-org/react";
import styles from "./health.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { usePostPrescriptionMutation } from "@/store/medicinereducer";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetItemOnSessionChange } from "@/utils/islogin";

function Health() {
  useGetItemOnSessionChange();
  const user = useSelector((state: any) => state.user);

  // rtk call
  const [post, { isLoading: isEditing, isSuccess, isError }] =
    usePostPrescriptionMutation();

  const onsubmit = (values: any, form: any) => {
    post({
      diagonisis: values.diagonisis,
      description: values.description,
      medication: values.medication,
      otherinfo: values.otherinfo,
      user: user.user?.user?.email,
    })
      .then((r) => console.log("updated"))
      .catch((err) => console.log(err));
    // console.log("after yser");
    // form.reset();
  };
  if (isSuccess) {
    toast.success("Record inserted successfully", {
      position: "top-center",
      autoClose: 3000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const required = (value: any) =>
    value ? undefined : "This field is required";
  return (
    <div
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Form
        onSubmit={(values, form) => onsubmit(values, form)}
      >
        {({ handleSubmit, values, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="diagonisis"
              component="input"
              placeholder="Diagonisis"
              validate={required}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.div}>
                  <label className={styles.label}>Diagnosis</label>
                  <div className={styles.inputContainer}>
                    <input
                      {...input}
                      placeholder={placeholder}
                      className={
                        meta.error && meta.touched
                          ? styles.inputerror
                          : styles.input
                      }
                    />
                    {meta.touched && !meta.error && (
                      <div className={styles.iconContainer}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.icon}
                        />
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
              name="description"
              component="input"
              placeholder="Description"
              validate={required}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.div}>
                  <label className={styles.label}>Description</label>
                  <div className={styles.inputContainer}>
                    <input
                      {...input}
                      placeholder={placeholder}
                      className={
                        meta.error && meta.touched
                          ? styles.inputerror
                          : styles.input
                      }
                    />
                    {meta.touched && !meta.error && (
                      <div className={styles.iconContainer}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.icon}
                        />
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
              name="medication"
              component="input"
              placeholder="medication"
              validate={required}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.div}>
                  <label className={styles.label}>Medication</label>
                  <div className={styles.inputContainer}>
                    <input
                      {...input}
                      placeholder={placeholder}
                      className={
                        meta.error && meta.touched
                          ? styles.inputerror
                          : styles.input
                      }
                    />
                    {meta.touched && !meta.error && (
                      <div className={styles.iconContainer}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.icon}
                        />
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
              name="otherinfo"
              component="input"
              placeholder="Doctors Information"
              validate={required}
            >
              {({ input, meta, placeholder }) => (
                <div className={styles.div}>
                  <label className={styles.label}>{placeholder}</label>
                  <div className={styles.inputContainer}>
                    <input
                      {...input}
                      placeholder={placeholder}
                      className={
                        meta.error && meta.touched
                          ? styles.inputerror
                          : styles.input
                      }
                    />
                    {meta.touched && !meta.error && (
                      <div className={styles.iconContainer}>
                        <FontAwesomeIcon
                          icon={faCheck}
                          className={styles.icon}
                        />
                      </div>
                    )}
                  </div>
                  {meta.error && meta.touched && (
                    <span className={styles.span}>{meta.error}</span>
                  )}
                </div>
              )}
            </Field>

            <Button type="submit" disabled={submitting ? true : false}>
              {submitting ? "Submitting" : "Submit"}
            </Button>
          </form>
        )}
      </Form>
      <ToastContainer />
    </div>
  );
}

export default Health;
