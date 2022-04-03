import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,MY_ORDERS_SUCCESS,
  ORDERS_DETAILS_FAIL,
  ORDERS_DETAILS_REQUEST,
  ORDERS_DETAILS_SUCCESS,
  CLEAR_ERRORS,
} from "../Constants/orderConstant";

export const orderReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };

    case CREATE_ORDER_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case MY_ORDERS_REQUEST:
        return {
          loading: true,
        };
  
      case MY_ORDERS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };
  
      case MY_ORDERS_FAIL:
        return {
          loading: true,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

export const orderDetailsReducer = (state = { orderDetails: {} }, action) => {
    switch (action.type) {
      case ORDERS_DETAILS_REQUEST:
        return {
          loading: true,
        };
  
      case ORDERS_DETAILS_SUCCESS:
        return {
          loading: false,
          orders: action.payload,
        };
  
      case ORDERS_DETAILS_FAIL:
        return {
          loading: true,
          error: action.payload,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };


