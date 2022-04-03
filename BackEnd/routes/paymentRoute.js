const express= require('express');
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');
const router= express.Router();
const {isAuthenticatedUser, isAutherizedRole}=  require("../middlewares/auth");

router.post("/payment/process",isAuthenticatedUser,processPayment);
router.get("/stripeApiKey",isAuthenticatedUser, sendStripeApiKey)

module.exports= router;