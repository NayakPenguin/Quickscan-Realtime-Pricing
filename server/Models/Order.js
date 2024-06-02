const mongoose = require('mongoose');

const orderDetailsSchema = new mongoose.Schema({
    count: { type: Number, required: true },
    encodedValue: { type: String, required: true },
    extraWithItem: { type: String, required: true },
    itemName: { type: String, required: true },
    price: { type: Number, required: true }
});

const userDetailsSchema = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    orderId: { type: String, required: true, unique: true },
    creatorShopId: { type: String, required: true },
    canceledOrder: { type: Boolean, default: false },
    paymentCompleted: { type: Boolean, default: false },
    tableName: { type: String, required: true },
    timeOfOrder: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    userDetails: { type: userDetailsSchema, required: true },
    orderDetails: { type: [orderDetailsSchema], required: true }
}, { collection: 'Order' });

module.exports = mongoose.model('Order', orderSchema);