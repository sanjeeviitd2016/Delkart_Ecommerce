const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt= require('jsonwebtoken')
const users= require("../models/userModel.js")





const isAuthenticatedUser= catchAsyncError( async(req,res,next)=>{
    const {token}= req.cookies;
    console.log("cookie",token);

    if(!token){
        return  next( new ErrorHandler("Please Login to access",400))
    }
    const privateKey= process.env.PRIVATE_KEY_TOKEN 
    const decodedData= jwt.verify(token,privateKey);
     req.user= await users.findById(decodedData.id)
    // console.log(decodedData)
    console.log("user",req.user)
    next()
})




const isAutherizedRole = (...roles)=>{

    return (req,res,next)=>{

         if(! roles.includes(req.user.role)){
             return next(new ErrorHandler(
                 `Role : ${req.user.role}  is not allowed to access , only ${roles} can acces.`,403
             ))
         }
        next()
         
    }
}

 


module.exports= {isAuthenticatedUser,
                isAutherizedRole}
    ;