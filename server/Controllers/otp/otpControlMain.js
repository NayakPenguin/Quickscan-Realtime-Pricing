const jwt = require("jsonwebtoken");
const otpStorage = {};

function generateOTP() {
    const min = 100000; // (inclusive)
    const max = 999999; // (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getOTP = (req, res) => {
    const { userId } = req.body;

    const generatedOTP = generateOTP();
    otpStorage[userId] = generatedOTP;
    console.log(otpStorage);

    // call sending SMS API

    res.status(200).json({ message: 'OTP generated successfully', otp : generatedOTP});
};

const verifyOTP = (req, res) => {
    const { userId, userOTP } = req.body;
    const storedOTP = otpStorage[userId];

    if (userOTP == storedOTP) {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });
        res.status(200).json({ success: true, message: 'OTP verification successful', token });
    } else {
        res.status(200).json({ success: false, message: 'OTP verification failed' });
    }
};

module.exports = { getOTP, verifyOTP };