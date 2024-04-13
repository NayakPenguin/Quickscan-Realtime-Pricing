const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authenticateJWT = require("./Middleware/auth");

const dotenv = require("dotenv");

dotenv.config();
const fs = require("fs");

const morgan = require("morgan");

require("dotenv").config({
  path: "./config.env",
});
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.set("trust proxy", 1);

app.use(express.static("uploads"));
//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.get("/", (req, res) => {
  console.log("Hello");
  res.send("API Healthy!");
});

app.use("/otp", require("./Routers/router_otp"));

app.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

const port = process.env.PORT || 8000;

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log("Error in setting up server!");
    return;
  }
  console.log(`App Listening at http://localhost:${port}...`);
  mongoose
    .connect(process.env.DATABASE ?? "mongodb://localhost:27017", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB Connection Successful !!!");
    })
    .catch((err) => console.log(err));
});
