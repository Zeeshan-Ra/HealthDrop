import { connectionStr } from "@/app/lib/db";
import { medicineModel } from "@/app/lib/medItemModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, {useNewUrlParser:true});
    const result = await medicineModel.find({medshop_id: id});
    if(result){
        success = true
    }
    return NextResponse.json({ result, success })
}

export async function DELETE(request,content){
    const id = content.params.id;
    let success = false;
    await mongoose.connect(connectionStr, {useNewUrlParser:true});
    const result = await medicineModel.deleteOne({_id:id});
    if(result){
        success = true
    }
    return NextResponse.json({result, success})
}