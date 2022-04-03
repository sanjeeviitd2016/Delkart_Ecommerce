import React from "react";
import { Link } from "react-router-dom";
// import ReactStars from "react-rating-stars-component";
import {Rating} from "@material-ui/lab";
import "./home.css";

const Product = ({product}) => {

  const options = {
   
    // size: "large",
    value: product.ratings,
    readOnly: true,
    precision:0.5
  };
  return (
    
      <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p> {product.name} </p>
        <div>
          <Rating classNames="star" {...options} /> <span className="productcardSpan">({product.numberOfReviews} reviews)</span>
        </div>
        <span > ₹{product.price}</span>
      </Link>
  );
};

export default Product;
