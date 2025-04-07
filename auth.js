const jwt=require('jsonwebtoken');
const User = require("./model/userRegistration");



const authMiddleware=async(req,res,next)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1];
        if(!token){
            res.status(400).json({success:false,message:"No token,authorization denied"})
            }
        const decoded = jwt.verify(token, 'augnes');
        req.user = await User.findById(decoded.id).select("-password");
        if (!req.user) {
            return res.status(401).json({ success: false, message: "User not found" });
          }
      
        console.log(decoded.id);
        next();
    }
    catch(error){
        return res.status(401).json({success:false,message:"Invalid Token"})
    }
};

module.exports={ authMiddleware };