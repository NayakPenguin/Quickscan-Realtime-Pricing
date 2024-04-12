// The entry point of the server file


var express = require("express")
var jwt = require("jsonwebtoken")
var app = express() ;
//var dotenv = require('dotenv') ;
const mongoose = require('mongoose')
const cors = require('cors');
const Restaurant = require("./Models/Restaurant")
const User = require("./Models/User")
//const nodemailer=require("./Utils/nodemailer");

//Starting middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()) ;
app.use(cors()) ;

app.get('/',(req,res)=>{
    res.status(200).json('Hi')
})

app.post('/login',async(req,res)=>{
    const { restaurant_id , access } = req.body
    const result = await Restaurant.find({'restaurant_id': restaurant_id , 'owner_access_key':access})
    if(result.length==0)  return res.status(200).json("Invalid Credentials !") ;
    const secretKey = 'achak47'
    const payload = result[0]
    const {owner_access_key,man_access_key,allowed_email_ids,is2FA} = payload
    const token = jwt.sign ({restaurant_id,owner_access_key,man_access_key,allowed_email_ids,is2FA}, secretKey, {expiresIn : '1200m'});
    res.status(200).json({"token":token})
})

app.post('/login-user',async(req,res)=>{
    const {name,mobile,email} = req.body
    const user = new User({'name':name,'mobile':mobile,'email':email})
    await user.save()
    return res.status(200).json("Login Successful")
})
//app.use('/',require('./Routers/router_user'));
//app.use('/admin',require('./Routers/router_admin')) ;
//End of middlewares

const port = process.env.PORT || 8000;

app.listen(port, (err) => {
    console.log(`App Listening at http://localhost:${port}...`);

    if(err){
        console.log("Error in setting up server!");
        return;
    }
    mongoose.connect("mongodb+srv://seriousanurag123:anurag18@cluster0.edegawp.mongodb.net/?retryWrites=true&w=majority",
    {  //connecting the database
        useNewUrlParser: true ,
        useUnifiedTopology: true
    }).then(()=>{
        console.log('Database Connection Succesful !!!');
    }).catch((err)=> console.log(err,"Error in establishing Database."));
})    