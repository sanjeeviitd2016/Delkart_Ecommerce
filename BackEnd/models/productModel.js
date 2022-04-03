const mongoose= require('mongoose');
const productSchema= mongoose.Schema({
    // _id: String,
    name: {
        type:String,
        required: [true,"Please enter product name"],
        trim:true

    },
    description:{
        type:String,
        required:[true,"Please enter description"]
    },
    price: {
        type: Number,
        required: [true,"Please enter price"],
        maxLength:[6,"Price cannot exceed 6 digits"]
    },

    ratings:{
        type:Number,
        default:0
    },
    
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
        }],
    category:{
        type:String,
        required: [true,"Please enter catogary"]
    },

    stock:{
        type:Number,
        required:[true,"Plsease Enter stock"],
        maxLength:[3 ,"Stock cannot exceed 3 dogits"],
        default:1
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        
        user:{
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required:true
        },

        name:{
            type:String,
             required:true
        },
        rating:{
            type:Number,
            default:0
        },
        comment:{
            type:String,
            required:true
        }
    }],
    
    createdAt:{
        type:Date,
        default:Date.now

    }
}
);


module.exports= mongoose.model("products",productSchema)
