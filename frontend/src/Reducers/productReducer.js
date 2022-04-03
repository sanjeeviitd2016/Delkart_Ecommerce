import {
  ALL_PRODUCTS_FAIL,
  ALL_PRODUCTS_REQUESTS,
  ALL_PRODUCTS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
  NEW_REVIEW_RESET,NEW_REVIEW_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
} from "../Constants/productConstants.js";

export const productReducer = ( state = {
    product: []}, action )=> {
  switch (action.type) {

    case ALL_PRODUCTS_REQUESTS:
      return {
        loading: true,
        product: [],
      };
    case ALL_PRODUCTS_SUCCESS:
      return {
        loading: false,
        product: action.payload.products,
        productsCount:action.payload.productcount,
        resultPerPage: action.payload.resultPerPage,
      };
    case ALL_PRODUCTS_FAIL:{
      return {
        loading: false,
        error: action.payload
        
      };
    }

      case CLEAR_ERRORS:{
          return{
              ...state,
              error:null
          }
      }
      default:
          return state;
  }
};

export const productDetailsReducer = ( state = {
  product: {}}, action )=> {
switch (action.type) {

  case PRODUCT_DETAILS_REQUEST:
    return {
      loading:true,
      ...state,
     
    };
  case PRODUCT_DETAILS_SUCCESS:
    return {
      loading: false,
      product: action.payload,
    };
  case PRODUCT_DETAILS_FAIL:{
    return {
      loading: false,
      error: action.payload
      
    };
  }

    case CLEAR_ERRORS:{
        return{
            ...state,
            error:null
        }
    }
    default:
        return state;
}
};



export const newReviewReducer = ( state = {
  reviews:{}}, action )=> {
switch (action.type) {

  case NEW_REVIEW_REQUEST:
    return {
      loading:true,
      ...state,
     
    };
  case NEW_REVIEW_SUCCESS:
    return {
      loading: false,
      // reviews: action.payload,
      success: action.payload
    };
  case NEW_REVIEW_RESET:
    return{
      ...state,
        loading:false,
        success: false
    }
  case NEW_REVIEW_FAIL:{
    return {
      ...state,
      loading: false,
      error: action.payload
      
    };
  }

    case CLEAR_ERRORS:{
        return{
            ...state,
            error:null
        }
    }
    default:
        return state;
}
};