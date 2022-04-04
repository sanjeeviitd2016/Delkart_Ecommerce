const productModel = require("../models/productModel.js");
const errorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../middlewares/catchAsyncError.js");
const ApiFeature = require('../utils/apifeatures.js')





const getProducts =  catchAsyncError(async (req, res,next) => {
  // return next(new errorHandler("product not found", 404));
  // console.log("cookies",res.cookies)
  const resultPerPage=9;
  const productcount= await productModel.countDocuments();
  const apiFeature= new ApiFeature(productModel.find(),req.query)
  apiFeature.search();
  apiFeature.filter();

  // let products= await apiFeature.query;
  // let filteredProducts= products.length;
  // console.log(filteredProducts,"fli")

  apiFeature.pagination(resultPerPage);
 const products = await apiFeature.query;
  res.status(200).json({ message: "Sucesess",productcount,resultPerPage, products});
});





const getProductDetail = catchAsyncError(async (req, res, next) => {
  // const id= new ObjectId(req.params.id)
  const id = req.params.id;
  const product = await productModel.findById(id);
  if (!product) {
    return next(new errorHandler("product not found", 404));
    // res.status(500).json({success:false, message:"product not found"})
  }

  res.status(200).json({ success: true, product });
});



// create products---Admin route

const createProduct = catchAsyncError(async (req, res, next) => {

  req.body.createdBy= req.user.id;
  // req.body.numberOfReviews= req.body.reviews.length
  let product = await productModel.create(req.body);
  res.status(201).json({ success: true, product });
});

// const createProduct = catchAsyncError((req, res, next) => {
//   console.log("produxt",res.cookies)
//   productModel.create(req.body).then(data => {
//     res.status(201).json({ success: true, data })
//   }).catch(err => {
//     res.status(404).json({ success: false, message: err.message })
//   })
// });









//admin -->update
const updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    // res.status(500).json({ success: false, message: "Product not found" });
    return next(new errorHandler("product not found", 404));
  }
  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({ success: true, product });
});




//admin --> delete
const deleteProduct = catchAsyncError((req, res, next) => {
  product = productModel
    .findByIdAndDelete(req.params.id)
    .then((data) => {
      res
        .status(400)
        .json({ success: true, message: "Product deleted successfully", data });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: "product not found" });
    });
});



// update and add reviews --->

const addReviewRating = catchAsyncError(async(req,res,next)=>{
   const {rating,comment,productId}= req.body;

   const review= {
     user: req.user._id,
     name:req.user.name,
     rating: Number(rating),
     comment
   }
   const product= await productModel.findById(productId);

   const isReviewed= product.reviews.find(rev=> rev.user.toString()===req.user.id)
   if(isReviewed){
      product.reviews.forEach((rev)=>{
        if(rev.user.toString() === req.user.id.toString()){
          rev.rating=rating;
          rev.comment= comment;
        }
      })
   }
   else{
     product.reviews.push(review)
   }
   let ratingSum=0;
   await product.reviews.forEach(rev=>{
      ratingSum= ratingSum+ rev.rating
   }) 
   product.numberOfReviews= product.reviews.length;
   product.ratings= ratingSum/ product.reviews.length
  


   await product.save({
     validateBeforeSave:false
   })

   res.status(200).json({success:true,message:" Reviews has been added succesfully", product})
})

// get all reviews of a product

const getProductReviews = catchAsyncError(async(req,res,next)=>{

  const product= await productModel.findById(req.params.id);

  if(!product){
    return next(new errorHandler(`product with ${req.params.id} not found`,400))
  }
  const reviews= product.reviews;
  res.status(200).json({success:true,reviews})
})


// delete a review

const deleteReview= catchAsyncError(async(req,res,next)=>{
  const product = await productModel.findById(req.query.productId);

 if(!product){ 
   return next(new errorHandler(`user with ${req.query.productId} not found`,400))
 }
 const reviews= product.reviews.filter(rev=> {rev.id.toString() !== req.query.reviewId.toString()});

 let ratingSum=0;
  reviews.forEach(rev=>{
      ratingSum= ratingSum+ rev.rating
   }) 
  //  product.numberOfReviews= reviews.length;
  //  const ratings= ratingSum/ reviews.length;
  //  console.log(ratings) // if NaN then 0 else ratings
  //  product.reviews= reviews;
  //  await (product.save())

  const ratings= ratingSum/ reviews.length;
  const numberOfReviews= reviews.length;

  await product.findByIdAndUpdate(req.params.productId,{
    reviews,
    ratings,
    numberOfReviews
  },
  {
    new :true,
    runValidators:true,
    useFindAndModify:false
  })

   res.status(200).json({sucess:true, message:'Review deleted successfully'})
})


module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  addReviewRating,
  getProductReviews,
  deleteReview
};
