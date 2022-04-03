import axios from "axios";
import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  CLEAR_ERRORS,
  ORDERS_DETAILS_REQUEST,
  ORDERS_DETAILS_FAIL,
  ORDERS_DETAILS_SUCCESS
} from "../Constants/orderConstant";

export const orderAction = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post("/order/new", order, config);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await axios.get("/myorders");

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });
  }
};

//order details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_DETAILS_REQUEST });

    const { data } = await axios.get(`/orders/${id}`);

    dispatch({ type: ORDERS_DETAILS_SUCCESS, payload: data.order });

  } catch (error) {
    dispatch({ type: ORDERS_DETAILS_FAIL, payload: error.response.data.message });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
