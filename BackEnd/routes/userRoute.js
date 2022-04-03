const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logoutUser,forgotPassword,resetPassword,getUserDetails,updatePassword, updateProfile,SingleUserDetails,getAllUsers, updateUserRole, deleteUser} = require("../controllers/userController")
const {isAuthenticatedUser, isAutherizedRole}=  require("../middlewares/auth");

router.post("/register",registerUser)
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.post("/password/forgot", forgotPassword)
router.put("/password/reset/:resetToken",resetPassword);
router.get("/me", isAuthenticatedUser, getUserDetails);
router.put("/me/password/update",isAuthenticatedUser,updatePassword);
router.put("/me/update/", isAuthenticatedUser,updateProfile);

router.get("/admin/users/",isAuthenticatedUser, isAutherizedRole("admin"),getAllUsers);
router.get("/admin/user/:id",isAuthenticatedUser, isAutherizedRole("admin"), SingleUserDetails)

router.put("/admin/user/:id", isAuthenticatedUser,isAutherizedRole("admin"),updateUserRole);
router.delete("/admin/user/:id",isAuthenticatedUser,isAutherizedRole("admin"),deleteUser);

module.exports= router;  
