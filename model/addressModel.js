const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
 userId:{
    type:mongoose.Schema.ObjectId,
    ref:"User",
    required:true,
 },
 name:{
    type:String,
    required:true
 },
 phone:{
    type:String,
    required:true
 },
 pinCode:{
    type:String,
    required:true,
 },
 houseName:{
    type:String,
    required:true
 },
 locality:{
    type:String,
    required:true
 },
 district:{
    type:String,
    required:true,
 },
 state:{
    type:String,
    required:true,
 },
});

module.exports = mongoose.model("Address",addressSchema);