import { connectionStr } from "@/app/lib/db";
import { medShopModel } from "@/app/lib/medshopModel";
import { orderModel } from "@/app/lib/orderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    const payload = await request.json();
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    const orderObj = new orderModel(payload)
    let result = await orderObj.save();
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}

export async function GET(request) {
    const userId = request.nextUrl.searchParams.get('id')
    let success = false
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    let result = await orderModel.find({ user_Id: userId })
    if (result) {
        let medshopData = await Promise.all(
            result.map(async (item) => {
                let medshopInfo = {};
                medshopInfo.data = await medShopModel.findOne({ _id: item.medShop_id });
                medshopInfo.amount = item.amount;
                medshopInfo.status = item.status;
                return medshopInfo
            })
        )
        result = medshopData
        success = true
    }
    return NextResponse.json({ result, success })
}