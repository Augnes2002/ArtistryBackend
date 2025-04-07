const Cart = require("../model/cartModel");
const Product = require("../model/productModel");

//add to cart page for app

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Product Id not recieved" });
    }
    const product = await Product.findById(productId).lean();
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not find" });
    }

    let cartItem = await Cart.findOne({ productId });
    if (cartItem) {
      return res.status(400).json({success:false,message:"Product is already in the cart"})
    }

    const newCart = new Cart({
      productId,
      userId,
      quantity: 1,
      productName: product.name,
      artistName: product.artistName,
      price: product.price,
      image: product.productImage,
      shippingFee: product.shippingFee,
    });

    await newCart.save();

    return res.status(200).json({
      success: true,
      message: "Product added to Cart",
      cart: newCart,
    });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Error Occured", e });
  }
};

//get Cart details

exports.getCartDetails = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.find({userId: userId});
    console.log(cart);
    return res.status(200).json({ success: true, message: "Detail recieved",cart });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Error Occured" });
  }
};

//remove Cart Products


exports.removeCart = async(req,res,next) =>{
  try{
    const{productId} = req.body;
    const userId=req.user._id;
    console.log("The ids ar :",productId,userId)

    if(!productId){
      return res.status(404).json({success:false,message:"product id required"});
    }
    const cartItem = await Cart.findOneAndDelete({userId:userId,productId:productId});
    if(!cartItem){
      return res.status(404).json({success:false,message:"product not in cart"});
    }
    return res.status(200).json({ success: true, message: "Cart Item removed" });
  }
  catch (e) {
    return res.status(500).json({ success: false, message: "Error Occured" });
  }
}
