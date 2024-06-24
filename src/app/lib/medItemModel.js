const { default: mongoose } = require("mongoose");

const medicineSchema = new mongoose.Schema({
    name:String,
    price:String,
    img_path:String,
    description:String,
    medshop_id:mongoose.Schema.Types.ObjectId
})

export const medicineModel = mongoose.models.medicines || mongoose.model("medicines",medicineSchema);