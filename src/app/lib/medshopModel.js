const { default: mongoose } = require("mongoose");

const medShopSchema = new mongoose.Schema({
    email:String,
    password:String,
    name:String,
    city:String,
    address:String,
    contact:String
});

export const medShopModel = mongoose.models.medshops || mongoose.model("medshops",medShopSchema);
