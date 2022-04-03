import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import { useSelector, useDispatch} from "react-redux";
import { useAlert } from "react-alert";
import {useNavigate} from 'react-router-dom'
import Loader from "../layout/loader/Loader.js";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from  "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import {clearErrors, loadUser, updatePassword} from "../../Actions/userAction"
import { UPDATE_PASSWORD_RESET } from "../../Constants/userConstant";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate= useNavigate();

  // const {user} = useSelector(state=> state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");



const updatePasswordSubmit =(e)=>{
    e.preventDefault();
    const myform= new FormData();
    myform.set("oldPassword",oldPassword);
    myform.set("newPassword",newPassword)
    myform.set("confirmPassword",confirmPassword)
    dispatch(updatePassword(myform))

}

useEffect(()=>{
    if(error){
        alert.error(error)
        dispatch(clearErrors());
    }
    if(isUpdated){
        alert.success("Password Updated Successfully !")
        // dispatch(loadUser())
        navigate("/account")
        dispatch({type: UPDATE_PASSWORD_RESET});
    }
},[error,dispatch,alert,navigate,isUpdated])



  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Update Password | DelKart" />
          
          <div className="updatePassword_container">
            <div className="updatePassword_box">
            <h1 className="updatePassword_heading">Update Password</h1> 
              <form
                className="updatePassword_form"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="update_oldPassword">
                    <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setoldPassword(e.target.value)}
                  />
                </div>
                <div className="update_newPassword">
                    <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                  />
                </div>

                <div className="update_confirmPassword">
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
                <input type="submit" value="Confirm" className="updatePasswordBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
