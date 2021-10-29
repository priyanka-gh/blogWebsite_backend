const mongoose = require('mongoose')
const express = require('express')
const app = express()
var cors = require('cors')
require('dotenv').config()
var cookieParser=require("cookie-parser")
var bodyParser=require("body-parser")

//myRoutes

const userRoutes=require("./routes/user");
const blogRoutes=require("./routes/Blog");
const categoryRoutes=require("./routes/Category")
const likesRoutes=require("./routes/Likes")

//DB CONNECTION

mongoose.connect(
    process.env.DATABASE,
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    }
)

//middlewares

 app.use(cors());
 app.use(cookieParser());

app.use(express.json())
//my routes

app.use("/api",userRoutes);
app.use("/api",blogRoutes);
app.use("/api",categoryRoutes)
app.use("/api",likesRoutes)

//ports

const port=process.env.PORT || 8000;

//starting a server

app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');