import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(
    "https://projectauthbackend-default-rtdb.firebaseio.com/user.json"
  );
  const data = await response.json();
  return NextResponse.json({ data: data });
}
