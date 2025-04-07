const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    items: [{  
        productId: {
            type: mongoose.Schema.ObjectId,
            required: true,
            ref: "Product"
        },
        price: Number,
        shippingFee: Number
    }],
    productId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"Product"
    },
    addressId:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"Address"
    },
    amount:{
        type:Number,
        required:true,
    },
    status:{
        type:String,
        enum:["Pending","Approved","Packed","Shipped","Cancelled"],
        default:"Pending"
    },
    paymentDetails: {
        razorpayOrderId: { type: String },
        paymentId: { type: String },
        paymentStatus: { type: String, enum: ["Success", "Failed", "Pending"], default: "Pending" },
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }


});
module.exports = mongoose.model("Order",orderSchema);