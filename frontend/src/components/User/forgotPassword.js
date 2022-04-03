import React, { useState, useEffect, Fragment } from "react";
import "./forgotPassword.css"
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {
  forgotPassword,
  clearErrors,
} from "../../Actions/userAction.js";

import Loader from "../layout/loader/Loader.js";
import MetaData from "../layout/MetaData"




const ForgotPassword = () => {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const alert= useAlert()
    const [email, setemail]= useState("");


    const {error,message,loading}= useSelector(state=> state.forgotPassword)

    const updateSubmit= (e)=>{
        e.preventDefault();
        const myform= new FormData();
        myform.set('email',email)
        dispatch(forgotPassword(myform))
    }

    useEffect(()=>{
      if(message){
        alert.success(message);
        // navigate("/login")
    }
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        
    },[dispatch,error,message,alert,navigate])


  return (
    <Fragment>
    {
      loading ? (<Loader></Loader>) :

      <Fragment>
    <MetaData title="Forgot Password | DelKart"/>
    <div className="ForgotPassword_container">
      <div className="ForgotPassword_box">
        <h1 className="ForgotPassword_heading"> Forgot Password</h1>
      <form
          className="ForgotPassword_form"
          encType="multipart/form-data"
          onSubmit={updateSubmit}
        >
          <div className="ForgotPassword_email">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="email"
              required
              name="email"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
            />
          </div>
          
          <input type="submit" value="send" className="ForgotPasswordBtn" />
        </form>
      </div>
    </div>
  </Fragment>
    }
  </Fragment>
  )
}

export default ForgotPassword