const Order = require('../model/orderModel');
const Product = require('../model/productModel');
const User = require('../model/userRegistration');

exports.totalUsers = async(req,res,next)=>{
    try{
        const userCount= await User.countDocuments();
        return res.status(200).json({success: true,message :"Total Users",userCount});
    }
    catch(e){
        return res.status(500).json({success:false,message:"Error Occured"});
    }
}

exports.totalProducts=async(req,res,next)=>{
    try{
        const productCount = await Product.countDocuments();
        return res.status(200).json({success:true,message:"Total Products",productCount});
    }
    catch(e){
        return res.status(500).json({success:false,message:"Error Occured"});

    }
}

exports.newJoinees = async(req,res,next)=>{
    try{
        const fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 7);
        const newJoinees = await User.countDocuments({
            createdAt:{$exists:true,$gte:fromDate},
        });
        return res.status(200).json({success:true,message:"New Joinees Count :",newJoinees});
    }
    catch(e){
        return res.status(500).json({success:false,message:"Error occured"})
    }
}