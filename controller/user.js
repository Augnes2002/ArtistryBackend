// User Registration
const jwt = require('jsonwebtoken');
const bcrypt=require("bcrypt")
const userRegistrationModel = require("../model/userRegistration");


exports.userRegistration = async (req, res, next) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
      return res
        .status(400)
        .json({ status: false, error: "Password incorrect" });
    }
    const newUser = new userRegistrationModel({ name, email, password });
    await newUser.save();
    console.log(newUser);
    res.json({ status: true, success: "User Registered Successful" });
  } catch (err) {
    console.error("Error occurred:","Enter the Data");
    return res.status(500).json({ status: false, error: "Error Ocuured!..." });
  }
};

exports.login = async (req, res, next) => {
  try{
    const {email,password}=req.body;
    if(!email || !password){
       return res.status(400).json({status:false,message:"Enter email and password"})
    }
    const user_details=await userRegistrationModel.findOne({email})
    if(!user_details){
      return res.status(404).json({status:false,message:"User not found"});
    }
    const isPasswordValid= await bcrypt.compare(password,user_details.password);
    if(!isPasswordValid){
      return res.status(401).json({status:false,message:"Invalid email or password"})
    }
    const token = jwt.sign({ id: user_details._id}, 'augnes');
    return res.status(200).json({success:true,message:"Login Successful!",token})
  }
  catch(e){
    console.log("Error :",e);
    return res.status(500).json({message:"Server error"});
  }
}

