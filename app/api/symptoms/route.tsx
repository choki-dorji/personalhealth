import connectMongooDB from "@/LIB/mongo";
import { symptom } from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { mainpain, otherinfo } = await request.json();
  await connectMongooDB();
  console.log("request", request);
  const data = await symptom.create({
    mainpain: mainpain,
    OtherInformation: otherinfo,
    user: "choki",
    date: new Date(),
  });
  return NextResponse.json({ message: "Posted Successfully" }, { status: 201 });
}

export async function GET() {
  await connectMongooDB();
  const topics = await symptom.find();
  return NextResponse.json({ symptoms: topics });
}
