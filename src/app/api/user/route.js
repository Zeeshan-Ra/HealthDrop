import { connectionStr } from "@/app/lib/db";
import { userModel } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    let payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const user = new userModel(payload);
    const result = await user.save();
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}