const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    //lowercase: true,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Paintings",
      "Sculpture",
      "Digital Art",
      "Photography",
      "Collage",
      "Poster",
      "Abstract",
      "Sketches",
    ],
  },
  medium: {
    type: String,
    required: true,
    enum: [
      "Oil",
      "Watercolor",
      "Poster Color",
      "Gouache",
      "Acrylic",
      "Pencil",
      "Digital",
      "Chalk",
      "Charcol",
      "Pencil & Charcol",
      "Pastel",
      "Ink",
      "Others"

    ],
  },
  material: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  h_measure:{
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  w_measure:{
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  artistName: {
    type: String,
    required: true,
  },
  artistDescription: {
    type: String,
    required: true,
  },
  artistImage: {
    type: String,
   
  },
  shippingFee:{
    type:String,
  },
  quantity: {
    type: Number,
    default: 1,
    immutable: true, // Prevent modifications
  },
});

module.exports = mongoose.model("Product", productSchema);
