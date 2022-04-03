import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Backdrop from "@material-ui/core/Backdrop";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Actions/userAction.js";

const UserOption = ({ user }) => {
  const [open, setopen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const options = [
    { icon: <PersonIcon />, name: "profile", func: account },
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    {
      icon: <ShoppingCartIcon  style={{color: cartItems.length >0 ?"tomato" : "unset"}} />,
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    // navigate("/login");

    dispatch(logout());
    alert.success("logout Successfully");
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDial tooltrip example"
        style={{ zIndex: "11" }}
        onClose={() => setopen(false)}
        onOpen={() => setopen(true)}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "profile.jpeg"}
            alt={user.name}
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen= {window.innerWidth <600 ?true :false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOption;
