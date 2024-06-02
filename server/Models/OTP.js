const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300 // OTP will automatically delete after 5 minutes
    }
});

module.exports = mongoose.model('OTP', otpSchema);
