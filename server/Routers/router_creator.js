const express = require("express");
const router = express.Router();

const verifyLogin = require("../Controllers/creators/verifyLogin");

router.get('/',(req,res)=>{
    res.status(200).json("API Route Verify Creator is Active and Healthy");
});

router.post('/verify-login',(req,res)=>{
    verifyLogin.loginCreator(req,res);
});

module.exports = router;