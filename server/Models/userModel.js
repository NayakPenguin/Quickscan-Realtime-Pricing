const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true // Assuming each phone number corresponds to a unique user
    },
    previousOrders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order' // Assuming you have an Order model/schema
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);