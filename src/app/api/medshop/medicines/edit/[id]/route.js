import { connectionStr } from "@/app/lib/db";
import { medicineModel } from "@/app/lib/medItemModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const id = content.params.id
    let success = false
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result = await medicineModel.findOne({ _id: id });
    if (result) {
        success = true
    }
    return NextResponse.json({ result, success })
}


export async function PUT(request, content){
    const id = content.params.id
    const payload = await request.json()
    let success = false
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    let result = await medicineModel.updateOne({_id:id}, payload);
    if(result){
        success = true
    }
    return NextResponse.json({result, success})
}