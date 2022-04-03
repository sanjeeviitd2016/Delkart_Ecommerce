import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUESTS,
  ALL_PRODUCTS_SUCCESS,

  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/productConstants.js";
import axios from "axios";

export const getProduct = (keyword="",currentPage=1, price=[0,20000],category,ratings=0) => async (dispatch) => {

  try {
    await dispatch({ type: ALL_PRODUCTS_REQUESTS });
    let link= `/products?keyword= ${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`
    if(category){
      link=  `/products?keyword= ${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    }
    const {data}  =  await axios.get(link);

    await dispatch({
      type: ALL_PRODUCTS_SUCCESS,
      payload: data,
     
    });
  } catch (error) {
    await dispatch({
      type: ALL_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};


export const getProductDetails = (id) => async (dispatch) => {
  try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const {data}  =  await axios.get(`/product/${id}`)
    // console.log("det",data)
    await dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type:  PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const newProductReview = (review) => async (dispatch) => {
    try{
        dispatch({type:NEW_REVIEW_REQUEST})
        const config= {
          headers:{"Content-Type" : "application/json"}
        }
        const {data}= await axios.put("/review",review,config)

        dispatch({type:NEW_REVIEW_SUCCESS,payload:data.success})
    }
    catch(error){
      dispatch({type:NEW_REVIEW_FAIL,payload: error.response.data.message})
    }
}

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};