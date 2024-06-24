import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersModel } from "@/app/lib/deliveryPartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(request) {
    const payload = await request.json()
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    let result = await deliveryPartnersModel.findOne({ mobile: payload.mobile, password: payload.password });
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}