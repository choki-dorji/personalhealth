import connectMongooDB from "@/LIB/mongo";
import { Healthdata } from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";

interface resultType {
  month: string;
  count: number;
}

interface resulttypee {
  result: resultType[];
}

interface grouptype {
  Healthdata:[
    {user:string,month: string,count:number,date:string}
  ]
}


export async function GET() {
  await connectMongooDB();

  const response = await Healthdata.find().sort({ date: -1 }).limit(10); // Retrieve latest 10 documents

  let groupedData: any = [];

  if (response && response.length > 0) {
    groupedData = response.map(data => {
      const date = new Date(data.date);
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' }); // Get the full month name

      return { user: data.user, month: `${year}-${month}`, count: 1, date: `${date.getDate()} ${month}` };
    });

    // Sort the groupedData array by month in ascending order
    groupedData.sort((a, b) => a.month.localeCompare(b.month));
  }

  const user = response.length > 0 ? response[0].user : "No user data available";

  return NextResponse.json({ Healthdata: groupedData, user: user });
}
