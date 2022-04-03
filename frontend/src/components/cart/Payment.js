import React,{useEffect,useState,useRef,Fragment} from 'react';
import "./Payment.css"
import checkoutSteps from "./checkoutSteps";
import {useNavigate} from "react-router-dom"
import{useSelector,useDispatch} from "react-redux";
import MetaData from "../layout/MetaData"
import { Typography } from '@material-ui/core';
import {useAlert} from "react-alert";
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements,PaymentElement,CardElement} from "@stripe/react-stripe-js";
import {loadStripe,Stripe} from "@stripe/stripe-js"
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import CheckoutSteps from './checkoutSteps';
import axios from 'axios'
import { clearErrors,orderAction } from '../../Actions/orderActions';


const Payment = () => {
    const navigate= useNavigate();
    const orderInfo= JSON.parse(sessionStorage.getItem("orderInfo"));
    const payBtn= useRef(null)
    const alert= useAlert();
    const dispatch= useDispatch();
    const stripe= useStripe();
    const elements= useElements();

    const {shippingInfo,cartItems}= useSelector(state=> state.cart)
    const {user}= useSelector(state=> state.user);
    const {error}= useSelector(state=> state.order)

    const paymentData= {
        amount:Math.round(orderInfo.totalPrice*100)
    }

    const order= {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice:orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingCharges:orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice

    }

    const submitHandler=async (e)=>{
        e.preventDefault();
        payBtn.current.disabled=true;
        try{
            const config= {
                Headers:{ "Content-Type":"application/json"}

                };
                const {data}= await axios.post("/payment/process",paymentData,config)
                const client_secret= data.client_secret;
                if(!stripe || !elements) { return}
                const result= await stripe.confirmCardPayment(client_secret,{
                    payment_method:{
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            name: user.name,
                            email: user.email,
                            address:{
                                line1: shippingInfo.address,
                                city:shippingInfo.city,
                                state: shippingInfo.state,
                                postal_code: shippingInfo.pinCode,
                                country: shippingInfo.country
                            }
                        }
                    }
                })

                if (result.error){
                    payBtn.current.disabled=false;
                    alert.error(result.error.message)
                }
                else{
                    if (result.paymentIntent.status==="succeeded"){
                        order. paymentInfo={
                            id: result.paymentIntent.id,
                            status:result.paymentIntent.status,

                        }
                        dispatch(orderAction(order));
                        navigate("/success")
                    }
                    else{
                        alert.error("There is Some issue while proccessing payment")
                    }
                }

        }
        catch(error){
            payBtn.current.disabled=false;
            alert.error(error.response.data.message)
        }
    }
    const [stripeApiKey,setstripeApiKey]= useState("");
    async function getStripeApiKey(){
    const {data}= await axios.get("/stripeApiKey")
    setstripeApiKey(data.stripeApiKey)
    }

    useEffect(()=>{
        getStripeApiKey();
        if (error){
            alert.error(error)
            dispatch(clearErrors())
        }
       


    },[dispatch,alert,error])
    console.log("apikey",stripeApiKey)

  return (
    <Fragment>
        <MetaData title="Payment | DelKart" />
        <CheckoutSteps activestep={2} /> 
        <div className='paymentContainer'>
            <form className='paymentForm' onSubmit={(e)=>submitHandler(e)}>
                <Typography>Card Information</Typography>
                <div>
                    <CreditCardIcon />
                    <CardNumberElement className='paymentInput' />
                </div>
                <div>
                    <EventIcon />
                    <CardExpiryElement className='paymentInput' />
                </div>
                <div>
                    <VpnKeyIcon />
                    <CardCvcElement className='paymentInput' />
                </div>

                <input type="submit" value={`Pay- ₹${orderInfo && orderInfo.totalPrice}`}
                ref={payBtn}
                className='paymentFormBtn' />


            </form>
        </div>

    </Fragment>
  )
}

export default Payment