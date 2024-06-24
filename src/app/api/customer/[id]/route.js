import { connectionStr } from "@/app/lib/db";
import { medicineModel } from "@/app/lib/medItemModel";
import { medShopModel } from "@/app/lib/medshopModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content){
    const id = content.params.id;
    await mongoose.connect(connectionStr, {useNewUrlParser:true})
    let result = await medShopModel.findOne({_id:id})
    let medicines = await medicineModel.find({medshop_id:id})
    return NextResponse.json({result,medicines, success:true})
}