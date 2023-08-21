import connectMongooDB from "@/LIB/mongo";
import { weightHeight } from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { weight, Height, user } = await request.json();
  await connectMongooDB();
  console.log("request", request);

  const height = Height / 100;

  const BMI = weight / (height * height);
  let comment = "";
  if (BMI > 24) {
    comment = "You are OverWeight";
  }
  if (BMI < 18) {
    comment = "You are UnderWeight";
  }
  if (BMI > 18 && BMI < 24) {
    comment = "You are Normal";
  }

  const data = await weightHeight.create({
    weight: weight,
    Height: Height,
    OtherInformation: comment,
    user: user,
    BMI: BMI,
    date: new Date(),
  });
  return NextResponse.json({ message: "Posted Successfully" }, { status: 201 });
}

export async function GET() {
  await connectMongooDB();
  const topics = await weightHeight.find();
  return NextResponse.json({ data: topics });
}
