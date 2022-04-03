const express = require('express');
const {getProducts, createProduct,updateProduct,deleteProduct,getProductDetail,addReviewRating, getProductReviews, deleteReview} = require("../controllers/productController.js")

const {isAuthenticatedUser,isAutherizedRole}= require("../middlewares/auth.js");

const router = express.Router();


router.get("/products", getProducts); // router.route("/products").get(getProducts)
router.post("/admin/product/new",isAuthenticatedUser,isAutherizedRole('admin'),createProduct);
router.put("/admin/product/:id",isAuthenticatedUser,isAutherizedRole('admin'),updateProduct);
router.delete("/admin/product/:id",isAuthenticatedUser,isAutherizedRole('admin'),deleteProduct);

router.get("/product/:id",getProductDetail);
router.put("/review", isAuthenticatedUser, addReviewRating)
router.get("/reviews/:id",getProductReviews);
router.delete("/review/delete",isAuthenticatedUser, deleteReview);

//base route is same for these 3 so use router.route
// router.route("/product/:id").get(getProductDetail).put(updateProduct).delete(deleteProduct)


module.exports=router; 

