import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import { useSelector, useDispatch} from "react-redux";
import { useAlert } from "react-alert";
import {useNavigate,useParams} from 'react-router-dom'
import Loader from "../layout/loader/Loader.js";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from  "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import {clearErrors, loadUser, resetPassword} from "../../Actions/userAction"
import { RESET_PASSWORD_RESET } from "../../Constants/userConstant";

const ResetPassword = () => {



    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate= useNavigate();
    const {token} = useParams();
  
    // const {user} = useSelector(state=> state.user);
    const { error, loading, success} = useSelector((state) => state.forgotPassword);
    const [Password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
  
  
  
  const setPasswordSubmit =(e)=>{
      e.preventDefault();
      const myform= new FormData();
      myform.set("Password",Password)
      myform.set("confirmPassword",confirmPassword)
      dispatch(resetPassword(token,myform))
  
  }
  
  useEffect(()=>{

    if(success){
        alert.success("Password Updated Successfully !")
        navigate("/login")
    }
      if(error){
          alert.error(error)
          dispatch(clearErrors());
      }
      
  },[error,dispatch,alert,navigate,success])
  


  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Set Password | DelKart" />
          
          <div className="setPassword_container">
            <div className="setPassword_box">
            <h1 className="setPassword_heading">Update Password</h1> 
              <form
                className="setPassword_form"
                encType="multipart/form-data"
                onSubmit={setPasswordSubmit}
              >
                <div className="set_Password">
                    <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="Password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="set_confirmPassword">
                    <LockIcon />
                  <input
                    type="text"
                    placeholder="confirm password"
                    required
                    name="ConfirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Update" className="setPasswordBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default ResetPassword