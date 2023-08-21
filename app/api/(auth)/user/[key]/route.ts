import axios from "axios";
import { NextResponse } from "next/server";


  // ////edit
  export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {

      const id = params.id;
      console.log(id);
      const {image,name,address} = await request.json();
      const response = await axios.get(`https://projectauthbackend-default-rtdb.firebaseio.com/user/${id}.json`)

      return NextResponse.json({response})  
  }