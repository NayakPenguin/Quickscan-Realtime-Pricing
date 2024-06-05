const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const OTP = require('../../Models/OTP');
const User = require('../../Models/User');
const Visit = require('../../Models/Visit');

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
            { userId }, // Find the document by userId
            { otp: generatedOTP, createdAt: new Date() }, // Set the new OTP and update the timestamp
            { upsert: true, new: true } // Create a new document if none exists, return the updated document
        );

        // Call sending SMS API here (if applicable)

        // Respond with a success message and the generated OTP
        res.status(200).json({ message: 'OTP generated successfully', otp: generatedOTP });
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error generating OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const verifyOTP = async (req, res) => {
    const { userId, userOTP, userName, userPhone, userEmail, creatorShopId } = req.body; // Extract user details and OTP from request body

    try {
        const otpRecord = await OTP.findOne({ userId });

        if (otpRecord && userOTP == otpRecord.otp) {
            
            const userRecord = await User.findOneAndUpdate(
                { userId }, // Find the document by userId
                { userId, userName, userPhone, userEmail }, // Set the new user information
                { upsert: true, new: true } // Create a new document if none exists, return the updated document
            );

            await Visit.findOneAndUpdate(
                { userId, creatorShopId }, // Find the document by userId and creatorShopId
                { lastVisit: new Date() }, // Update the last visit date to the current date
                { upsert: true, new: true } // Create a new document if none exists, return the updated document
            );

            const token = jwt.sign(
                { userId, userName: userRecord.userName, userPhone: userRecord.userPhone, userEmail: userRecord.userEmail },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE }
            );

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