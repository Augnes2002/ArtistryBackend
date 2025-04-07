const { error } = require("console");
const Product = require("../model/productModel");
const multer = require("multer");
const path = require("path");


exports.addProduct = async (req, res, next) => {
  console.log("Adding product...");
  try {
    // Extract fields from the request body
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);
    const {
      name,
      price,
      productDescription,
      category,
      medium,
      material,
      height,
      h_measure,
      width,
      w_measure,
      artistName,
      artistDescription,
      shippingFee
    } = req.body;
    console.log(
      "enter..........",name,
      price,
      productDescription,
      category,
      medium,
      material,
      height,
      h_measure,
      width,
      w_measure,
      artistName,
      artistDescription,
      shippingFee);
    // Extract file paths from the uploaded files
    const productImage = req.files["productImage"]
      ? req.files["productImage"][0].path
      : "";
   
    const artistImage = req.files["artistImage"]
      ? req.files["artistImage"][0].path
      : "";

    const productIm=productImage.slice(8, productImage.length);
    const artistIm = artistImage.slice(8, artistImage.length);
    console.log(artistIm);

    // Create a new product instance
    const newProduct = new Product({
      name,
      price,
      productDescription,
      category,
      medium,
      material,
      height,
      h_measure,
      width,
      w_measure,
      artistName,
      artistDescription,
      productImage : productIm,
      artistImage : artistIm,
      shippingFee,
    });
    await newProduct.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred",
      error: error.message,
    });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    console.log("Error occured", error);
    res.status(500).json({ success: false, message: "Error Occured" });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      console.log("No id found");
      return res.status(404).json({ success: false, message: "No id found" });
    }

    const product = await Product.findById(id);

    if (!product) {
      console.log("No such product found");
      return res
        .status(404)
        .json({ success: false, message: "No such product found" });
    }

    console.log("Your product is :", product);
    res.status(200).json({ success: true, message: "Your product",product });
  } catch (error) {
    console.log("Error!..", error);
    res.status(500).json({ success: false, message: "Error Occured",error });
  }
};

exports.postUpdateProduct = async (req, res, next) => {
  console.log("Received request:", req.body);
  console.log("Got Signal");
  try{
      const { id } = req.params;
      if(!id){
          return res.status(400).json({ success: false, message: "Product ID not found!.." });
      }
      let product = await Product.findById(id);
      if(!product){
          return res.status(400).json({ success: false, message: "Product  not found!.." });
      }
      console.log(req.files)
      const {
        name,
        price,
        productDescription,
        category,
        medium,
        material,
        height,
        h_measure,
        width,
        w_measure,
        artistName,
        artistDescription,
        shippingFee
      } = req.body;
      let productImage = req.file?.["productImage"]?.[0].path||product.productImage;
      let artistImage = req.file?.["artistImage"]?.[0].path||product.artistImage;
      productImage = productImage ? productImage.replace(/^uploads\//, "") : "";
      artistImage = artistImage ? artistImage.replace(/^uploads\//, "") : "";
      product.name = name||product.name;
      product.price = price||product.price;
      product.productDescription = productDescription||product.productDescription;
      product.category = category||product.category;
      product.medium = medium||product.medium;
      product.material = material||product.material;
      product.height = height||product.height;
      product.h_measure = h_measure||product.h_measure;
      product.width = width||product.width;
      product.w_measure = w_measure||product.w_measure;
      product.artistName = artistName||product.artistName;
      product.artistDescription = artistDescription||product.artistDescription;
      product.productImage = productImage||product.productImage;
      product.artistImage = artistImage||product.artistImage;
      product.shippingFee = shippingFee||product.shippingFee;
      let updatedProduct = await product.save();
      console.log("Product updated", updatedProduct);
      
      return res.status(200).json({ success: true, message: "Product updated", updatedProduct });
  }
  catch(e){
    return res.status(500).json({ success: false, message: "Error Occured" ,error:e});
  }

  
};

exports.deleteProduct = async (req, res, next) => {
  try {
    console.log("Received request:", req.method, req.url);
    console.log("Params:", req.params);
    console.log("Body:", req.body);

    const { id } = req.params;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID not found!.." });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product  not found!.." });
    }
    await Product.findByIdAndDelete(id);
    console.log("Product removed", product);
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error occured : ", error);
    return res
      .status(500)
      .json({ success: false, message: "Product not removed.." });
  }
};
