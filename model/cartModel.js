const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    productId:{
        type: mongoose.Schema.ObjectId,
        ref:"Product",
        required:true,
    },
    quantity:{
        type: Number,
        default:1,
    },
    productName:{
        type:String,
    },
    artistName:{
        type:String,
    },
    image:{
        type:String,
    },
    price:{
        type:Number,
    },
    shippingFee:{
        type:String,
    },
});

module.exports = mongoose.model("Cart",cartSchema);