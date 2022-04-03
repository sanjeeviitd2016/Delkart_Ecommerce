const errorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");
const users = require("../models/userModel");
const sendToken = require("../utils/jwtToken.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require('cloudinary')

//register a user-->

const registerUser = catchAsyncError(async (req, res, next) => {
  // console.log("register", req.cookies);
  const mycloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
    folder:"avatars",
    width:150,
    crop: "scale"
  })
  const { name, email, password } = req.body;

  const user = await users.create({
    name,
    email,
    password,
    avatar: {
      public_id: mycloud.public_id,
      url:mycloud.secure_url,
    },
  });

  //   const token= await user.getJWTToken();
  //   res.status(201).json({ success: true, token: token });
  sendToken(user, 200, res);
});

const loginUser = catchAsyncError(async (req, res, next) => {
  // console.log("login", req.cookies);
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new errorHandler("Please enter credential", 400));
  }
  const user = await users.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorHandler("Enter correct Credentials", 401));
  }
  // console.log(user);
  const isPasswordMatched = await user.comparePassword(password);
  // console.log(isPasswordMatched);

  if (!isPasswordMatched) {
    return next(new errorHandler("Invalid Credentials", 401));
  }

  // const token= await user.getJWTToken();
  // res.status(200).json({sucess:true, token:token})
  sendToken(user, 200, res);
});

//logout
const logoutUser = catchAsyncError((req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ sucess: true, message: "logged Out" });
});

//forgot password
const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await users.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    return next(new errorHandler("user not recognised", 404));
  }
  //reset password token --->
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/password/reset/${resetToken}`;
  const HostUrl= process.env.FRONTEND_URL; 
  const resetPasswordUrl= `${HostUrl}/password/reset/${resetToken}` 
  const message = `Your password  reset token is :- \n\n ${resetPasswordUrl}\n\n if you have not requested this email, please ignore`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Delkart password recovery email",
      message: message,
    });
    res.status(200).json({
      sucess: true,
      message: `email sent to ${req.body.email} successfully!`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new errorHandler(error.message, 500));
  }
});

// reset password ---->

const resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  const user = await users.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new errorHandler(
        "Reset Pasword Token is invalid or has been expired",
        400
      )
    );
  }



  if (req.body.Password !== req.body.confirmPassword) {
    // console.log("chalo",req.body.Password,req.body.confirmPassword)
    return next(new errorHandler("Password doesn't match", 400));
  }
  user.password = req.body.Password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});
// get user details--->

const getUserDetails = async (req, res, next) => {
  const user = await users.findById(req.user.id);
  res.status(200).json({ sucess: true, user });
};

//update Password --->
const updatePassword = async (req, res, next) => {
  const user = await users.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new errorHandler("old password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new errorHandler("Password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
  // res.status(200).json({success:true, message:"Password updated successfully"})
};

//update Profile --->
const updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserDetails = {
    name: req.body.name,
    email: req.body.email,
    // avatar
  };
  // will add cloudinary later
  // console.log("avatars",req.body.avatar) // undefined not "" this of no input
  if (req.body.avatar !== "undefined"){
    const user= await users.findById(req.user.id)
    const imageId= user.avatar.public_id
    await cloudinary.v2.uploader.destroy(imageId);
    const mycloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
      folder:"avatars",
      width:150,
      crop: "scale"
    });
    newUserDetails.avatar= {
      public_id: mycloud.public_id, 
      url: mycloud.secure_url
    }
  }

  const user = await users.findByIdAndUpdate(req.user.id, newUserDetails, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Profile updated successfuly",user });
});

// admin wants to access all users
const getAllUsers = catchAsyncError(async (req, res, next) => {
  const Users = await users.find();

  res.status(200).json({ success: true, Users });
});

// admin wants deatils of his user
const SingleUserDetails = catchAsyncError(async (req, res, next) => {
  const user =await users.findById(req.params.id);

  if (!user) {
    return next(new errorHandler(`user doesnt exist with id:${req.params.id}`));
  }

  res.status(200).json({ success: true, user });
});

// role update ---Admin
const updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserDeta = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
    //avatar
  };
  // will add cloudinary later
  const user = await users.findByIdAndUpdate(req.params.id, newUserDeta, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  await user.save();
  res
    .status(200)
    .json({ success: true, message: "Profile updated successfuly",user });
});


// delete any user ---admin

const deleteUser = catchAsyncError(async (req, res, next) => {
  
  const user= await users.findById(req.params.id)
  if(!user){
    return next(new errorHandler(`User not found with id: ${req.params.id}`,400))
  }
  await user.remove();
  res
    .status(200)
    .json({ success: true, message: "user deleted successfuly" });
});



module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  logoutUser,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  SingleUserDetails,
  updateUserRole,
  deleteUser

};
