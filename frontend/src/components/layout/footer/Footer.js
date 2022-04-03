import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"
const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <h4>Download App</h4>
        <p> Download App for Android and IOS </p>
        <img src={playStore} alt="PlayStore" />
        <img src={appStore} alt="AppStore" />
      </div>
      <div className="footer_mid">
        <h1> DelKart</h1>
        <p>High Quality is our Priority</p>
        <p>Copyrights 2022 &copy; Sanjeev</p>
      </div>
      <div className="footer_right">
      <h4> Follow me</h4>
      <a  href="#facebook"  style={{color:"blue"}}>facebook</a>
      <a href="#insta"  style={{color:"crimson"}}>Instagram</a>
      <a href="#Youtube" style={{color:"red"}}>Youtube</a>
      </div>
      
    </div>
  );
};

export default Footer;
