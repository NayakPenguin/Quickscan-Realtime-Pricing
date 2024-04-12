const express = require("express");
const router = express.Router();

const otpControlMain = require("../Controllers/otp/otpControlMain");

// Get Routes ------->
router.get('/',(req,res)=>{
    res.status(200).json("API Route OTP in Active and Healthy");
});

router.get('/get-otp',(req,res)=>{
    otpControlMain.getOTP(req,res);
});


// Post Routes ------->
// router.post('/verify-otp',(req,res)=>{
// });

module.exports = router;