const User = require("../model/userRegistration");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error occured", error);
    return res.status(500).json({ success: false, message: "Error Occured" });
  }
};
