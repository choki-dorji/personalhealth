import connectMongooDB from "@/LIB/mongo";
import {Topic} from "@/LIB/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const {title, description} = await request.json()
    await connectMongooDB()
    await Topic.create({title, description})
    return NextResponse.json({message: "topic Created"}, {status: 201})
}

export async function GET(){
    await connectMongooDB()
    const topics = await Topic.find()
    return NextResponse.json({topics})
}