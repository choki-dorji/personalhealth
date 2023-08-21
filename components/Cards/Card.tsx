import React from "react";
import { Card, CardHeader, CardBody, Image, Tooltip } from "@nextui-org/react";
import style from "./Card1.module.css";

interface Props {
  title: string;
  description?: string;
  footer?: string;
  description1?: string;
  content?: string;
  image?: string;
}

export default function Card1(props: Props) {
  const CardDisplay = (
    <Card
      className="py-4"
      style={{
        display: "flex",
        flexDirection: "row",
        height: 130,
      }}
    >
      <div>
        <CardHeader
          className="pb-0 pt-2 px-4 flex-col items-start"
          style={{
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
          }}
        >
          {/* <p className="text-md mr-8 font-bold">{props.title}</p> */}
          <p className="text-md mr-8 font-bold">{props.title}</p>
        </CardHeader>

        <CardBody className="overflow-visible py-2 flex">
          <div className={style.container}>
            <div className={style.text}>
              <small className="text-default-700">{props.description}</small>
              {props.description1 ? (
                <small className="text-default-700">{props.description1}</small>
              ) : null}
              <br></br>
              {props.footer && (
                <small className="text-default-500">
                  Updated on: {props.footer}
                </small>
              )}
            </div>
            {props.image && (
              <div className={style.image__container}>
                <Image src="hero1.png" height={300} width={100} alt="sdvds" />
              </div>
            )}
          </div>
        </CardBody>
      </div>
    </Card>
  );

  return (
    <>
      {props.content ? (
        <Tooltip content={props.content}>{CardDisplay}</Tooltip>
      ) : (
        CardDisplay
      )}
    </>
  );
}
