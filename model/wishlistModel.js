const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
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

module.exports=mongoose.model("Wishlist",wishlistSchema);