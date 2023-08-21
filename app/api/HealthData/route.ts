import connectMongooDB from "@/LIB/mongo";
import {Healthdata} from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";

const date = new Date();

export async function POST(request: NextRequest) {
    const currentMonthName = date.toLocaleString('default', { month: 'long' });
    const {diagonisis, description, medication, otherinfo, user} = await request.json()
    await connectMongooDB()
    console.log("request", request)
    const data = await Healthdata.create({Diagonisis: diagonisis, description, Medicine: medication, OtherInformation: otherinfo, user:user, date: new Date()})
    return NextResponse.json({message: "topic Created"}, {status: 201})
}

export async function GET(){
    await connectMongooDB()
    
    const topics = await Healthdata.find()
    return NextResponse.json({Healthdata: topics})
}

