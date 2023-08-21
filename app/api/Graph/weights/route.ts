import connectMongooDB from "@/LIB/mongo";
import { weightHeight } from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectMongooDB();

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
  }

  const response = await weightHeight.find();
  
  const formattedResponse = response.map(entry => {
    const weight = entry.weight;
    const height = entry.Height / 100; // Convert height to meters
    const bmi = weight / (height * height);
    const formattedDate = formatDate(entry.date);

    return {
      user: entry.user, // Include the user field
      date: formattedDate,
      bmi: bmi,
    };
  });

  return NextResponse.json({ Healthdata: formattedResponse });
}
