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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  console.log(id);
  const  feedback = await Healthdata.find({user: id});

  

  let groupeddata : any = [];
  feedback.map((feed) => {
    const date = new Date(feed.date);
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const monthyesr = `${month}-${year}`
  console.log(year, month)
  groupeddata.push({month: month, year: year})   
  })

  console.log(groupeddata)

  const result: any = {};

for (let i = 0; i < groupeddata.length; i++) {
  const dateString = groupeddata[i].month + '-' + groupeddata[i].year; // create the string "month-year"
  
  if (result.hasOwnProperty(dateString)) {
    result[dateString]++; // increment value if it already exists
  } else {
    result[dateString] = 1; // add new key-value pair if it doesn't exist
  }
}

// console.log(result)
  return NextResponse.json(result);
}


// export async function GET() {
//   await connectMongooDB();

//   const response = await Healthdata.find(); // Retrieve latest 10 documents
  

//   // let groupedData: any = [];

//   // if (response && response.length > 0) {
//   //   groupedData = response.map(data => {
//   //     const date = new Date(data.date);
//   //     const year = date.getFullYear();
//   //     const month = date.toLocaleString('default', { month: 'long' }); // Get the full month name

//   //     return { user: data.user, month: `${year}-${month}`, count: 1, date: `${date.getDate()} ${month}` };
//   //   });

//   //   // Sort the groupedData array by month in ascending order
//   //   groupedData.sort((a :any, b :any) => a.month.localeCompare(b.month));
//   // }

//   // const user = response.length > 0 ? response[0].user : "No user data available";

//   // return NextResponse.json({ Healthdata: groupedData, user: user });
// }
