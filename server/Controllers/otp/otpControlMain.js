const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const OTP = require('./models/OTP');

const otpStorage = {};

function generateOTP() {
    const min = 100000; // (inclusive)
    const max = 999999; // (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getOTP = async (req, res) => {
    const { userId } = req.body;
    const generatedOTP = generateOTP();

    try {
        await OTP.findOneAndUpdate(
            { userId },
            { otp: generatedOTP, createdAt: new Date() },
            { upsert: true, new: true }
        );

        // Call sending SMS API here

        res.status(200).json({ message: 'OTP generated successfully', otp: generatedOTP });
    } catch (error) {
        console.error('Error generating OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const verifyOTP = async (req, res) => {
    const { userId, userOTP } = req.body;

    try {
        const otpRecord = await OTP.findOne({ userId });

        if (otpRecord && userOTP == otpRecord.otp) {
            const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE,
            });
            res.status(200).json({ success: true, message: 'OTP verification successful', token });
        } else {
            res.status(200).json({ success: false, message: 'OTP verification failed' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getOTP, verifyOTP };