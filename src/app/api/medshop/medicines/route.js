import { connectionStr } from "@/app/lib/db";
import { medicineModel } from "@/app/lib/medItemModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const medicine = new medicineModel(payload);
    const result = await medicine.save();
    if(result){
        success = true
    }
    return NextResponse.json({ result, success })
}