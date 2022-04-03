import React, { useState,useEffect } from "react";
import "./LoginSignup.css";
import Loader from "../layout/loader/Loader";
import { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {useNavigate, useSearchParams, useLocation} from "react-router-dom"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from '@material-ui/icons/Face'

import {useDispatch,useSelector} from "react-redux";
import {login,signup, clearErrors} from "../../Actions/userAction.js";

import {useAlert} from 'react-alert';

const LoginSignup = () => {
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const [user,setuser]= useState({
      name:"",
      email:"",
      password:""
  });
  const {name, email,password}= user;

  const [avatar,setavatar]= useState("/profile.jpeg");
  const [avatarPreview,setavatarPreview]= useState("/profile.jpeg")


const dispatch=useDispatch();
const navigate= useNavigate()
const location= useLocation();
const {error,loading,isAuthenticated} = useSelector((state)=>state.user)

  const loginSubmit = (e) => {
        e.preventDefault()
        dispatch(login(loginEmail,loginPassword));

        setLoginEmail("")
        setloginPassword("")

  };


  const registerSubmit=(e)=>{
    e.preventDefault();
    const myForm= new FormData();
    myForm.set("name",name)
    myForm.set("email",email)
    myForm.set("password",password)
    myForm.set("avatar",avatar);
   dispatch(signup(myForm))
  }


  const registerDataChange=(e)=>{
      if(e.target.name ==='avatar'){
        const reader= new FileReader();
        reader.onload= ()=>{
            if(reader.readyState===2){
                setavatarPreview(reader.result)
                setavatar(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
      }
      else{
          setuser({...user,[e.target.name]:e.target.value})
      }
  }

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToNeutral");
    }
    if (tab === "signup") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToNeutral");
    }
  };



const alert= useAlert();
// console.log("end",location)
const redirect= location.search ? location.search.split("=")[1] :"/account";
//loctaion .search is used for query string in endpoint
useEffect(()=>{
    if(error){
        console.log("Error")
        alert.error(error);
        dispatch(clearErrors())
    }
    if(isAuthenticated){
     
        navigate(redirect)
    }

},[dispatch,error,alert,isAuthenticated])




  return (
    <Fragment>
      <div className="LoginSignup_container">
        <div className="LoginSignup_box">
          <div>
            <div className="LoginSignup_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "signup")}>SIGNUP</p>
            </div>
            <button className="switchBtn" ref={switcherTab}></button>
          </div>
          <form className="Login_form" ref={loginTab} onSubmit={loginSubmit}>
            <div className="login_email">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Enter Username or Email"
                required
                name="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="login_password">
              <LockOpenIcon />
              <input
                type="password"
                className="login_password"
                placeholder="Enter Password"
                required
                value={loginPassword}
                onChange={(e) => setloginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forget Password</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>










          <form
            className="Signup_form"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="Signup_name">
              <FaceIcon />
              <input
                type="text"
                placeholder="name"
                required
                name ="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="Signup_email">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="Signup_password">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div className="Signup_image">
              <img src={avatarPreview} alt="avatarPreview" />
              <input
                type="file"
                name="avatar"
                accept="/image"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Signup" className="signupBtn" />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginSignup;
