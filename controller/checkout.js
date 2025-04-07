const Address = require("../model/addressModel");


//Adding address

exports.addAddress=async(req,res,next)=>{
    console.log("adding..");
    console.log("request body :",req.body);
    console.log("User id from token",req.user);
    try{

         const userId = req.user._id;
        const {name,phone,pinCode,houseName,locality,district,state}=req.body;
        console.log({name,phone,pinCode,houseName,locality,district,state});
        if(!userId){
            return res.status(400).json({success:false,message:"userId is required"})
        }
        const newAddress = new Address({userId,name,phone,pinCode,houseName,locality,district,state});
        await newAddress.save();
        return res.status(200).json({success:true,message:"Address Saved"});

    }
    catch(e){
        console.log("Error saving address :",e);
        return res.status(500).json({success:false,message:"Address not added"});
    }
};

//To fetch the address of a particularId

exports.getAddress=async(req,res,next)=>{
    console.log("Fetching address details...");
    try{
        const userId=req.user._id;
        if(!userId){
            return res.status(400).json({success:false,message:"User Id not found"});
        }
        const address = await Address.findOne({userId});
        console.log(address);
        return res.status(200).json({success:true,message:"Address found",address});

    }
    catch(e){
        return res.status(500).json({success:false,message:"Error Occured"});
    }

}

