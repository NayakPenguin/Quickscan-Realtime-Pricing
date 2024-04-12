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

    // call sending SMS API

    res.status(200).json({ message: 'OTP generated successfully' });
};

module.exports = { getOTP };