const ErrorHandler = require("../utils/errorHandler.js");

const errorMiddleware=(err, req, res, next) => {
    const statusCode= err.statusCode|| 500;
    const message= err.message || "Internal server code"

    console.log("my err",err.name, "and" , err.path)
    //wrong Mongodb id error--> cast error
    if (err.name==='CastError'){
        const message= `Resouces not found, Invalid: ${err.path}`
        err=new ErrorHandler(message,400);
    }

    //mongoose duplicate key error-->
    if(err.code===11000){
        const message= `User Already exits because of Duplicate ${Object.keys(err.keyValue)} Entered`
        err= new ErrorHandler(message,400)
    }


    // jsonweb token error
    if (err.name==='JsonWebTokenError'){
        const message= "Json web Toekn is invalid . try again"
        err= new ErrorHandler(message,400)
    }

    if(err.name ==='TokenExpiredError'){
        err= new ErrorHandler('Json web Token is expired,Plsease try again');
        
    }


    res.status(statusCode).json({
        success:false,
        message: message,
        // error:err
    })
    

};

module.exports= errorMiddleware;


