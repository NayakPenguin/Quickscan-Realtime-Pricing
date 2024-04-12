const express = require("express");
const router = express.Router();

const otpControlMain = require("../Controllers/otp/otpControlMain");

router.get('/',(req,res)=>{
    res.status(200).json("API Route OTP in Active and Healthy");
});

router.post('/get-otp',(req,res)=>{
    otpControlMain.getOTP(req,res);
});

router.post('/verify-otp',(req,res)=>{
    otpControlMain.verifyOTP(req,res);
});

module.exports = router;