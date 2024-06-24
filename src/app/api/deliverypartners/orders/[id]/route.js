import { connectionStr } from "@/app/lib/db";
import { medShopModel } from "@/app/lib/medshopModel";
import { orderModel } from "@/app/lib/orderModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const id = content.params.id
    let success = false
    await mongoose.connect(connectionStr, { useNewUrlParser: true })
    let result = await orderModel.find({ deliveryBoy_id: id })
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