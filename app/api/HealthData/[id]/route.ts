// pages/api/health/[id].js
import connectMongooDB from "@/LIB/mongo";
import { Healthdata } from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    const id = params.id;
    const  feedback = await Healthdata.findById(id);
  
    if (!feedback) {
      let error_response = {
        status: "fail",
        message: "No Feedback with the Provided ID Found",
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    let json_response = {
      status: "success",
      data: {
        feedback,
      },
    };
    return NextResponse.json(json_response);
  }



  // ////edit
  export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const id = params.id;
      console.log(id);
      const {diagonisis, description, Medicine, OtherInformation} = await request.json();
      console.log("bdjchbjdhs", diagonisis, description, Medicine, OtherInformation);

  
      const updated_feedback = await Healthdata.findByIdAndUpdate(id, {
        Diagonisis: diagonisis, 
        description: description,
        Medicine: Medicine,
        OtherInformation: OtherInformation
      });
  
      let json_response = {
        status: "success",
        data: {
          feedback: updated_feedback,
        },
      };
      return NextResponse.json(json_response);
    } catch (error: any) {
      if (error.code === "P2025") {
        let error_response = {
          status: "fail",
          message: "No Feedback with the Provided ID Found",
        };
        return new NextResponse(JSON.stringify(error_response), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      let error_response = {
        status: "error",
        message: error.message,
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }

  // Delete
  export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const id = params.id;
      await Healthdata.findByIdAndDelete(id)
  
      return new NextResponse(null, { status: 204 });
    } catch (error: any) {
      if (error.code === "P2025") {
        let error_response = {
          status: "fail",
          message: "No Feedback with the Provided ID Found",
        };
        return new NextResponse(JSON.stringify(error_response), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      let error_response = {
        status: "error",
        message: error.message,
      };
      return new NextResponse(JSON.stringify(error_response), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  