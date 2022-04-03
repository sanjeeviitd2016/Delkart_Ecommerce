import React, { Fragment } from "react";
import CheckoutSteps from "./checkoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { Link,useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";
import "./ConfirmOrder.css";

const ConfirmOrder = () => {

    const navigate= useNavigate();
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  //   console.log("user",user && user.name)
  const name = user && user.name;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subtotal > 400 ? 0 : 40;
  const tax = (subtotal * 18) / 100;
  const totalPrice = subtotal + shippingCharges + tax;
  const address = `${shippingInfo.address}, ${shippingInfo.city},${shippingInfo.state},${shippingInfo.country} ${shippingInfo.pinCode} `;


  const proceedToPayment =(e)=>{
    e.preventDefault()
    const data= {
        subtotal,
        shippingCharges,
        tax,
        totalPrice
    }
    sessionStorage.setItem("orderInfo",JSON.stringify(data))
    navigate("/process/payment")
  }
  return (
    <Fragment>
      <MetaData title="Confirm Order | DelKart" />
      <CheckoutSteps activestep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name:</p> <span>{name}</span>
              </div>
              <div>
          
                <p>Phone:</p> <span>{shippingInfo.phoneNo}</span>{" "}
              </div>
              <div>
                <p>Address:</p> <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} x {item.price}={" "}
                      <b>₹{item.quantity * item.price}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>SubTotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span> ₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total</b>
              </p>
              <span> ₹{totalPrice} </span>
            </div>
            <button onClick={proceedToPayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
