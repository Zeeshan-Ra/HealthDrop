import { connectionStr } from "@/app/lib/db";
import { medicineModel } from "@/app/lib/medItemModel";
import { medShopModel } from "@/app/lib/medshopModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;

    try {
        if (!mongoose.connections[0].readyState) {
            await mongoose.connect(connectionStr, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
        const result = await medShopModel.findOne({ _id: id });
        if (!result) {
            return NextResponse.json({ message: "MedShop not found", success: false }, { status: 404 });
        }
        const medicines = await medicineModel.find({ medshop_id: id });
        return NextResponse.json({ result, medicines, success: true });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ message: "Internal Server Error", success: false }, { status: 500 });
    }
}
