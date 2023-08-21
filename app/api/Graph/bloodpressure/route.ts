import connectMongooDB from "@/LIB/mongo";
import { BloodPressure } from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectMongooDB();

  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'long' });

    return `${day} ${month}`;
  }

  // let allHighData : number[];
  // let allLowData : number[];
  // let allData: string [];
  const response = await BloodPressure.find();

  const groupedData = {}; // Object to hold grouped data

  response.forEach(data => {
    const user = data.user;
    const date = new Date(data.date);
    const formattedDate = formatDate(date);

    if (!groupedData[user]) {
      groupedData[user] = {
        user: user,
        data: [],
      };
    }



// groupedData.forEach(userEntry => {
//   userEntry.data.forEach(dataEntry => {
//     allData.push(dataEntry);
//     allHighData = allHighData.concat(dataEntry.high);
//     allLowData = allLowData.concat(dataEntry.low);
//   });
// });

    groupedData[user].data.push({
      month: `${date.getFullYear()}-${date.getMonth() + 1}`,
      high: [{ value: data.highPressure, date: formattedDate }],
      low: [{ value: data.lowerPressure, date: formattedDate }],
    });
  });

  const formattedData = Object.values(groupedData);

  return NextResponse.json({ Healthdata: formattedData });
}
