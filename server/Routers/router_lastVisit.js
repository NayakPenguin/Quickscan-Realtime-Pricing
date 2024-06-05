const express = require("express");
const router = express.Router();

const lastVisitControl = require("../Controllers/lastVisit/lastVisitControl");

router.get('/',(req,res)=>{
    res.status(200).json("API Route Last Visit in Active and Healthy");
});

router.post('/add-visit',(req,res)=>{
    lastVisitControl.addVisit(req,res);
});

module.exports = router;