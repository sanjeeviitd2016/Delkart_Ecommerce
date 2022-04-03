import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Loader from "../layout/loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors, getOrderDetails } from "../../Actions/orderActions";
import { ORDERS_DETAILS_FAIL } from "../../Constants/orderConstant";
import "./OrderDetails.css"

const OrderDetails = () => {
  const { orders, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  console.log("id", id);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: clearErrors() });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Order Details |Delkart" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                {" "}
                Order #{orders && orders._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span> {orders && orders.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span> {orders && orders.shippingInfo.phoneNo}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {" "}
                    {orders &&
                      `${orders.shippingInfo.address}
                            ${orders.shippingInfo.city}
                            ${orders.shippingInfo.state}
                            ${orders.shippingInfo.pinCode}
                      `}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      orders && orders.paymentInfo.state === "succeeded"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {orders && orders.paymentInfo.status === "succeeded"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>
                <div>
                    <p>Amount:</p>
                    <span>₹{orders && orders.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                  <div>
                      <p className={orders && orders.orderStatus ==='delevered' ?"greenColor" :"redColor"}>
                      {orders && orders.orderStatus}
                      </p>
                  </div>

              </div>
            </div>
            <div className="orderDetailsCartItems">
                <Typography> OrderItems:</Typography>
                <div className="orderDetailsCartItemsContainer">
              {orders &&
                orders.orderItems.map((item) => (
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
