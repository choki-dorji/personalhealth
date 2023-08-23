"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Input1 from "../Input";
import { Button } from "@nextui-org/button";
import { usePostBMIMutation } from "@/store/bp";
import { useSession } from "next-auth/react";
import { Form, Field } from "react-final-form";
import styles from "./add.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

interface values {
  height: string | number | readonly string[] | undefined;
  weight: string | number | readonly string[] | undefined;
}

function AddWeight() {
  const { data: session, status } = useSession({
    required: true,
  });

  const [postBMi] = usePostBMIMutation();

  const required = (value: any): string | undefined =>
    value ? undefined : "It is required fields";

  const submithandler = async (values: any) => {
    await postBMi({
      Height: values.height,
      weight: values.weight,
      user: session?.user?.email,
    });
  };

  return (
    <>
      <Form onSubmit={submithandler}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="height"
              component="input"
              placeholder="Height"
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
              name="weight"
              component="input"
              placeholder="Weight"
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

export default AddWeight;
