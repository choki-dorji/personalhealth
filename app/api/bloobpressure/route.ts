import connectMongooDB from "@/LIB/mongo";
import {BloodPressure} from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { description,
        highPressure,
        lowerPressure,
        OtherInformation,
        user
    } = await request.json()
    await connectMongooDB()
    // if(lowerPressure >= highPressure) {
    //     return NextResponse.json({message: "Cannot have lower pressure greater that higher"}, {status: 422})
    // }
    console.log("request", request)
    const data = await BloodPressure.create({
        description,
        highPressure,
        lowerPressure,
        OtherInformation, 
        user:user, 
        date: new Date()})
    return NextResponse.json({message: "topic Created"}, {status: 201})
}

export async function GET(){
    await connectMongooDB()
    
    const topics = await BloodPressure.find()
    return NextResponse.json({Healthdata: topics})
}