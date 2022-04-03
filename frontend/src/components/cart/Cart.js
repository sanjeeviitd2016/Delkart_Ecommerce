import React, { Fragment } from "react";
import "./Cart.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItemCart } from "../../Actions/cartAction";

import { Link,useNavigate } from "react-router-dom";
import {Typography} from '@material-ui/core';
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"

const Cart = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const { cartItems } = useSelector((state) => state.cart);


const increaseQuantity=(id,quantity,stock)=>{
    const newQty= quantity+1;
    if(stock <=quantity){
        return
    }
    dispatch(addItemCart(id,newQty))
}

const decreaseQuantity=(id,quantity,stock)=>{
    const newQty= quantity-1;
    if(1 >quantity){
        return
    }
    dispatch(addItemCart(id,newQty))
}

const checkoutHandler=()=>{

  // navigate("/login?redirect=shipping");
  navigate("/shipping")
}


  return (
    <Fragment>
        {cartItems.length===0 ? 
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography className="emptyCart_heading">No Product in Your Cart</Typography>
          <Link to="/products">View Products</Link>
        </div>
        :
        <Fragment>
        <div className="cartPage">
          <div className="cartHeader">
            <p> Product</p>
            <p> Quantity</p>
            <p className="subheading"> Subtotal</p>
          </div>
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.product} className="cartContainer">
                <CartItem item={item} />
                <div className="cartInput">
                  <button onClick={()=>decreaseQuantity(item.product,item.quantity,item.stock)}>-</button>
                  <input type="number" value={item.quantity} readOnly />
                  <button onClick={()=>increaseQuantity(item.product,item.quantity,item.stock)}>+</button>
                </div>
                <div>
                  <p className="cartSubtotal">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
  
          <div className="cartGrossTotal">
            <div className="p1"></div>
            <div className="cartGrossTotalBox">
              <p>Gross Total</p>
              <p>
                ₹{cartItems.reduce((acc,item)=>
                acc+ item.price*item.quantity ,0
                )}
                </p>
            </div>
            <div className="p2"></div>
            <div className="checkoutBtn">
              <button onClick={()=> checkoutHandler()}>Checkout</button>
            </div>
          </div>
        </div>
      </Fragment>
        }
    </Fragment>
  );
};

export default Cart;
