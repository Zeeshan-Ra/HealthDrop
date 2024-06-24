import { connectionStr } from "@/app/lib/db";
import { medShopModel } from "@/app/lib/medshopModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
    let queryParams = request.nextUrl.searchParams;
    console.log(queryParams.get('location'));
    let filter = {}
    if (queryParams.get('location')) {
        let city = queryParams.get('location')
        filter = {city:{$regex: new RegExp(city, 'i')}}
    } else if(queryParams.get('medshop')){
        let name = queryParams.get('medshop')
        filter = {name:{$regex: new RegExp(name, 'i')}}
    }
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result = await medShopModel.find(filter)
    return NextResponse.json({ result, success: true })
}