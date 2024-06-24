import { connectionStr } from "@/app/lib/db";
import { medShopModel } from "@/app/lib/medshopModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let data = await medShopModel.find();
    return NextResponse.json({ result: data })
}

export async function POST(request) {
    let payload = await request.json();
    let result;
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    if (payload.login) {
        //use it for login
        result = await medShopModel.findOne({ email: payload.email, password: payload.password })
        if(result){
            success = true
        }
    }
    else {
        //use it for signup
        let medshop = new medShopModel(payload);
        result = await medshop.save()
        if(result){
            success = true
        }
    }
    return NextResponse.json({ result, success })
}