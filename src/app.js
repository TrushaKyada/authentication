const conn = require("./db/conn");
require("dotenv").config()
const mongoose = require("mongoose");
const express = require("express");
const Router = require("./router/auth.router");
const bodyParser = require("body-parser");
const cookieparser = require("cookie-parser");
var cors = require('cors');
const { propfind } = require("./router/auth.router");
const app = express();

const port = process.env.PORT || 8070;

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth",Router);
app.use(cors());

app.listen(port,()=>{
    console.log(`server is connected at ${port}`);
})
