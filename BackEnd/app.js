const express= require('express');
const app= express();

const bodyparser = require("body-parser");
const errorMiddleware= require("./middlewares/error.js")
const cookieParser= require('cookie-parser')
const fileupload= require('express-fileupload')



require('dotenv').config({path:__dirname+ '/config/.env'});
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

app.use(errorMiddleware)






module.exports= app;
