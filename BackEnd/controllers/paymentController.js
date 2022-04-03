

const catchAsyncError = require("../middlewares/catchAsyncError.js");
const stripe_secret_key=  process.env.STRIPE_SECRET_KEY;
const stripeApiKey=process.env.STRIPE_API_KEY
const stripe= require("stripe")(stripe_secret_key) //env

exports.processPayment= catchAsyncError(async(req,res,next)=>{
    const myPayment= await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata: {
            company:"DelKart",
        }
    })
    res.status(200).json({success:true,client_secret: myPayment.client_secret})
})

exports.sendStripeApiKey= catchAsyncError(async(req,res,next)=>{ 
    
    res.status(200).json({stripeApiKey:stripeApiKey});
    
})