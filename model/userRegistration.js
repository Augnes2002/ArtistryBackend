const mongoose = require("mongoose");

// const db = require("../util/database");

const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },  
},{
  timestamps: true,
},);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
