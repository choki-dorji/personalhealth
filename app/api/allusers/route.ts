import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function GET(){
    const response = await fetch("https://projectauthbackend-default-rtdb.firebaseio.com/user.json")
    const data = await response.json();
    console.log(data);


    const userList = [];

for (const key in data) {
  if (Object.hasOwnProperty.call(data, key)) {
    userList.push(data[key]);
}
}
    // console.log("user list ", userList)
    return NextResponse.json({userList})

}
