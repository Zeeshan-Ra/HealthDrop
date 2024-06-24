const { default: mongoose } = require("mongoose");

const deliveryPartnersSchema = new mongoose.Schema({
    name:String,
    mobile:String,
    password:String,
    city:String,
    address:String
})

export const deliveryPartnersModel = mongoose.models.deliverypartners || mongoose.model("deliverypartners", deliveryPartnersSchema)