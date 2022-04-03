import React from 'react';
// import ReactStars from 'react-rating-stars-component'; //no use now , material ui rating is best
import profile from "../../images/profile.jpeg";
import "./ProductDetails.css"
import {Rating} from "@material-ui/lab"
// import {useSelector}  from "react-redux"
const ReviewCard = ({review}) => {

  const options = {
   
    // size: "large",
    value: review.rating,
    readOnly: true,
    precision:0.5
  };
  // const {user}= useSelector(state=>state.user)

  // console.log("rating",review.ratings)

  return(
   <div className='reviewCard'>
       <img src={profile} alt="user"/>
       <p> {review.name}</p>
       <Rating {...options}/>
       <span className='reviewCardComment'>{review.comment}</span>
    </div>
  ) 
};

export default ReviewCard;
