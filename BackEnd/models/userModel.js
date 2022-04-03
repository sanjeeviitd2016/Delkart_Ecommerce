const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// const password= bcrypt.hashSync()

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    minLength: [3, "Name must be greater than 3 characters"],
    MaxLength: [30, "password cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter email"],
    unique: [true, "user Already Exits"],
    validate: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter the password"],
    minLength: [8, "Password must be more than 8 characters"],
    select: false, // this will go with find method
  },

  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
  
  createdAt:{
    type:Date,
    default:Date.now

}
});

userSchema.pre("save", async function (next) {
  console.log("pass", this);
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token

userSchema.methods.getJWTToken = async function () {
  const privateKey =
    process.env.PRIVATE_KEY || "hggbgfvnldgbdhgerhgbkhgkfghjeb"; //emv
  const expireTime = process.env.TOKEN_EXPIRE_TIME || "2000h";

  return jwt.sign({ id: this._id }, privateKey, {
    expiresIn: expireTime,
  });
};

//compare password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Grenerating password reset token

userSchema.methods.getResetPasswordToken = function () {
  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire= Date.now() + 15*60*1000;

  return resetToken;
};

module.exports = mongoose.model("users", userSchema);
//hashing and adding resetPasswordToken to userschema
