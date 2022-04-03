import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
// import Carousel from "react-material-ui-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {Carousel } from 'react-responsive-carousel'
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  newProductReview,
} from "../../Actions/productActions";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import { clearErrors } from "../../Actions/productActions.js";
import Loader from "../layout/loader/Loader.js";
import MetaData from "../layout/MetaData";
import { addItemCart } from "../../Actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import {Rating} from "@material-ui/lab"
import { NEW_REVIEW_RESET } from "../../Constants/productConstants";


const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const {success,error:reviewError}= useSelector(state=> state.newReview)
  const { id } = useParams();
  // console.log("id", id);
  // console.log("error", error);

  const [open,setopen]= useState(false);
  const [rating,setrating]= useState(0);
  const [comment,setcomment]= useState("")

  

  const options = {
   
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision:0.5
  };

  const [quantity, setqunatity] = useState(1);

  const increase = () => {
    if (product.stock <= quantity) {
      return;
    }
    const qty = quantity + 1;
    setqunatity(qty);
  };

  const decrease = () => {
    if (quantity <= 0) {
      return;
    }
    const qty = quantity - 1;
    setqunatity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemCart(id, quantity));
    alert.success("item added to cart");
  };

  const submitReviewToggle=()=>{
    open ? setopen(false): setopen(true)
  }
const reviewSubmitHandler =()=>{
  const myform= new FormData();
  myform.set("rating",rating);
  myform.set('comment',comment)
  myform.set('productId',id)
  dispatch(newProductReview(myform));
  setopen(false)
}
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(reviewError){
      alert.error(error);
      dispatch(clearErrors());
    }
    if(success){
      alert.success("Review submitted Successfully!")
      dispatch({type:NEW_REVIEW_RESET})
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, loading, alert,reviewError,success]);

  return (
    <Fragment>
      <MetaData title={`${product.name} | DelKart`} />
      {loading ? (
        <Loader> </Loader>
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <Carousel showArrows={true} showThumbs={false} showIndicators={true} useKeyboardArrows={true} infiniteLoop={true}>
                
                {product.images &&
                  product.images.map((item, i) => (
                    <div >
                    <img
                      className="CarouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                  
                    />
                    </div>
                  ))}
                  
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numberOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decrease}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={increase}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setrating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setcomment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">Cancle</Button>
              <Button color="primary" onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={ review && review._id} review={review}></ReviewCard>
                ))}
            </div>
          ) : (
            <p className="noReviews"> No reviews yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
