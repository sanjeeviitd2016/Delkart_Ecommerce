const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      requied: true,
    
    },
    city: {
      type: String,
      requied: true,
      
    },
    district: {
      type: String,
      required: true,
     
    },
    state: {
      type: String,
      requied: true,
  
    },
    country: {
      type: String,
      requied: true,
      
    },
    pinCode: {
      type: Number,
      required: true,
   
    },
    phoneNo: {
      type: Number,
      required: true,
  
    },
  },

  orderItems: [
    {
      name: { type: String, required: true },
      price: {
        type: Number,
        required: true,
        
      },
      quantity: {
        type: Number,
        requied: true,
        default:0
      },
      image: {
        type: String,
        requied: true,
     
      },

      product:{
        type: mongoose.Schema.ObjectId,
        ref:"products",
        required: true,
        default:"61fc9ddd6f284790b36f430d"
      }
      
      
    }],
  

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
     
    },
    status: {
      type: String,
      required: true,
     
    },
    
  },
  paidAt: {
    type: Date,
    required: true,
    default:0

  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  shippingCharges: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },

  orderStatus: {
    type: String,
    required: true,
    default: "processing...",
  },
  deliveredDate: Date,

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("orders", orderSchema);


