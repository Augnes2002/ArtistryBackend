const Category = require("../model/categoryModel");
const Catproduct = require("../model/productModel");
const { findById } = require("../model/userRegistration");

//To Add Categories via web

exports.addCategory = async (req, res, next) => {
  try {
    console.log("Adding...");
    const { name, image } = req.body;
    const category = new Category({ name, image });
    await category.save();
    console.log(category);
    return res
      .status(201)
      .json({ success: true, message: "Category added successfully" });
  } catch (e) {
    console.log("Error : ", e);
    return res
      .status(500)
      .json({ success: false, message: "Error occured ..Product not added" });
  }
};

//To fetch all the categories for both app and web

exports.getCategories = async (req, res, next) => {
  try {
    console.log("Fetching all..");
    const category = await Category.find();
    console.log(category);
    return res.status(201).json(category);
    console.log(category);
  } catch (e) {
    console.log("Error Occured..");
    return res.status(500).json({ success: false, message: "Error Occured.." });
  }
};

//To delete the ctegories (Web)

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).json({ succee: false, message: "Id not found" });
    }
    const product = await Category.findById(id);
    if (!product) {
      return res
        .status(500)
        .json({ succee: false, message: "Product not found" });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "category deleted" });
  } catch (e) {
    return res
      .status(500)
      .json({ success: true, message: "Error Occurred.. ", e });
  }
};

// Fetch Each Category products

exports.getProductsByCategory = async (req, res, next) => {
  console.log("fetching....");
  try {
    const { category } = req.params;
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Error Occured!.." });
    }
    const products = await Catproduct.find({ category: category });
    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found in this category",
      });
    }
    return res.status(200).json({ success: true, products });
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Error occured...", error: e.message });
  }
};

//To fetch the data of each Product

exports.getEachProduct = async (req, res, next) => {
  try {
    const { prodId } = req.params;
    console.log(prodId)
    if (!prodId) {
      return res
        .status(400)
        .json({ success: false, message: "No id recieved" });
    }
    const product = await Catproduct.findById(prodId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res.status(200).json({success:true,message:"Product found",product});
  } catch (e) {
    return res
      .status(500)
      .json({ success: false, message: "Error occured...", error: e.message });
  }
};
