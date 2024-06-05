const express = require("express");
const router = express.Router();

const verifyLogin = require("../Controllers/creators/verifyLogin");
const userLastVisit = require("../Controllers/creators/userLastVisit");

router.get('/',(req,res)=>{
    res.status(200).json("API Route Verify Creator is Active and Healthy");
});

router.post('/verify-login',(req,res)=>{
    verifyLogin.loginCreator(req,res);
});

router.get('/user-visit/:creatorShopId', (req, res) => {
    userLastVisit.getUsersByCreatorShopId(req,res);
});

module.exports = router;