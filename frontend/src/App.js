import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/footer/Footer";
import Home from "./components/layout/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import WebFont from "webfontloader";
import ProductDetails from "./components/product/ProductDetails.js";
import Products from "./components/product/Products";
import Search from "./components/product/Search.js";
import LoginSignup from "./components/User/LoginSignup"
import store from "./Store";
import {loadUser} from "./Actions/userAction"
import UserOption from "./components/layout/Header/UserOption";
import Profile from "./components/User/Profile"
import {useSelector} from 'react-redux';
import UpdateProfile from "./components/User/UpdateProfile.js"
// import Protectedroute from "./components/Route/Protectedroute";
import UpdatePassword from "./components/User/UpdatePassword.js"
import ForgotPassword from "./components/User/forgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/cart/Cart.js"
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess"
import axios from "axios";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import MyOrders from "./components/order/MyOrders";
import OrderDetails from "./components/order/OrderDetails";

function App() {

  const {isAuthenticated,user}= useSelector(state=>state.user)
  const [stripeApiKey,setstripeApiKey]= useState("");

  async function getStripeApiKey(){
    const {data}= await axios.get("/stripeApiKey")
    setstripeApiKey(data.stripeApiKey)
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser())
    getStripeApiKey();
    console.log("api",stripeApiKey)
  }, [stripeApiKey]);

  

  return (
    <Router>
       
      <Header />
      {
        isAuthenticated && <UserOption user={user} />
      }
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route  path="/product/:id" element={ <ProductDetails/>} />
        <Route  path="/products" element={ <Products/>} />
        <Route  path="/products/:keyword" element={ <Products/>} />
        <Route exact path="/search" element={ <Search/>} />
        <Route exact path="/login" element={ <LoginSignup/>} />
        <Route exact path="/account" element={<Profile />} />
        <Route exact path="/me/update" element= {<UpdateProfile />} />
        <Route path= "/password/update" element={<UpdatePassword />} />
        <Route path= "/password/forgot" element={<ForgotPassword />} />
        <Route path= "/password/reset/:token" element= {<ResetPassword />} />
        <Route path="/cart" element= {<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route exact path="/order/confirm" element={<ConfirmOrder />} />
        <Route path="/process/payment" element={stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements>} />  

        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="*" element= {<h1> No route found</h1>} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
