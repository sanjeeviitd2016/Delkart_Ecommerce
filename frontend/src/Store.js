import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./Reducers/cartReducer";
import { myOrdersReducer, orderReducer,orderDetailsReducer } from "./Reducers/orderReducer";
import {
  productReducer,
  productDetailsReducer,
  newReviewReducer,
} from "./Reducers/productReducer";
import {
  loginReducer,
  profileReducer,
  forgotPasswordReducer,
} from "./Reducers/userReducer.js";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: loginReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  order:orderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo:localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
