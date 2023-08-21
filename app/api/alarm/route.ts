import connectMongooDB from "@/LIB/mongo";
import {Notification} from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {time, medicine, notification, user} = await request.json()
    await connectMongooDB()
    await Notification.create({time: time, medicine: medicine, notification: notification, user: user})
    return NextResponse.json({message: "topic Created"}, {status: 201})
}
export async function GET(){
    await connectMongooDB()
    const alarm = await Notification.find()
    return NextResponse.json({alarm})
}
