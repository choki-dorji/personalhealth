// pages/api/health/[id].js
import { NextRequest, NextResponse } from "next/server";
export async function GET(
    request: Request,
    { params }: { params: { user: string } }
  ) {
    const id = params.user;
    const  feedback = await await fetch(
        `https://projectauthbackend-default-rtdb.firebaseio.com/user/${id}.json`
      );
      const data = await feedback.json();
  
    if (!data) {
      let error_response = {
        status: "fail",
        message: "No users found",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    let json_response = {
      status: "success",
      data
    };
    return NextResponse.json(json_response);
  }


