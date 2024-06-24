const { default: mongoose } = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_Id: mongoose.Schema.Types.ObjectId,
    medItemsIds: String,
    medShop_id: mongoose.Schema.Types.ObjectId,
    deliveryBoy_id: mongoose.Schema.Types.ObjectId,
    status: String,
    amount: String
})

export const orderModel = mongoose.models.orders || mongoose.model('orders', orderSchema)