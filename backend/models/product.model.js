import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name:String,
    comment:String, 
    rating:Number, 
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
});

const productSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required: true, 
        minLength:2,

    },
    image:{
        type:String,
    },
    description:{
        type:String, 
    },
    brand:{
        type:String,
        required: true, 
    },
    category:{
        type: String, 
        required: true, 
        // enum:['Electronics','Clothing']
    }, 
    price:{
        type:Number, 
        required:true, 
    }, 
    countInStock:{
        type:Number,
        default: 0
    
    },
    rating:{
        type:Number,
        defualt:0,
    },
    numReviews:{
        type:Number,
        default:0
    },
    reviews: [reviewSchema],
},

{timestamps:true}
);

const Product = mongoose.model("Product", productSchema);

export default Product;