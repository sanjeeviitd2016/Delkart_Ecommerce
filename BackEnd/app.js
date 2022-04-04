const express= require('express');
const app= express();

const bodyparser = require("body-parser");
const errorMiddleware= require("./middlewares/error.js")
const cookieParser= require('cookie-parser')
const fileupload= require('express-fileupload')
const path= require('path')



// require('dotenv').config({path:__dirname+ '/config/.env'});

if(process.env.NODE_ENV !=='PRODUCTION') {
    require("dotenv").config({ path: __dirname + "/config/.env" });
    
    }
//middlewares

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileupload())

const productRouter= require("./routes/productRoute")
const userRouter= require("./routes/userRoute");
const orderRouter= require("./routes/orderRoute");
const paymentRouter= require("./routes/paymentRoute")

app.use("/",userRouter);

app.use("/",productRouter);
app.use("/",orderRouter);
app.use("/",paymentRouter);

app.use(express.static(path.join(__dirname,"../frontend/build")))

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

app.use(errorMiddleware)






module.exports= app;
