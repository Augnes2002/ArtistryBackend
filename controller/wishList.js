const Product = require("../model/productModel");
const Wishlist = require("../model/wishlistModel");

// add to wishList table

exports.addToWishlist = async(req,res,next) =>{
    try{
        console.log("Adding to wishlist");
        const userId = req.user._id;
        const productId = req.body.productId;
        console.log(userId);
        console.log(productId);
        if(!userId){
            res.status(400).json({success:false,message:"User Id not recieved"});
        }
        const product = await Product.findById(productId).lean();
        if(!product){
            res.status(404).json({success:false,message:"Product not found"});
        }
        
        const newWishlist = new Wishlist({
            userId,
            productId,
            productName:product.name,
            artistName:product.artistName,
            image:product.productImage,
            price:product.price,
            shippingFee:product.shippingFee,
        })

        await newWishlist.save();

        return res.status(200).json({success:true,message:"Product added to the wishlist"});
    } 
    catch(e){
        return res.status(400).json({success:false, message:"Product not added to wishlist"})
    }
};

// WishList details

exports.getWishlistDetails = async(req,res,next)=>{
   try{ 
    const userId= req.user._id;
    const wishlist = await Wishlist.find({userId:userId});
    console.log(wishlist);
    return res.status(200).json({success:true, message : "Details recieved :",wishlist});
    }
    catch(e){
        return res.status(500).json({success:false,message:"Error Occured"});
    }
};


//To remove item from wishlist

exports.removeFromWishList = async(req,res,next)=>{
    try{
        const userId = req.user._id;
        const productId = req.body.productId;
        console.log(userId,productId)
        if(!userId){
            res.status(400).json({success:false,message:"User Id not recieved"});
        }
        if(!productId){
            res.status(400).json({success:false,message:"Product Id not recieved"});
        }

        const product = await Wishlist.findOneAndDelete({userId:userId,productId:productId});

        return res.status(200).json({success:true,message:"Wishlist item removed"});
    }
    catch(e){
        return res.status(500).json({success:false,message:"Error occured"})
    }

}