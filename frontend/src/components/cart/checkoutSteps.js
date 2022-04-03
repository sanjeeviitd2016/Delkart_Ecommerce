import React, { Fragment } from "react";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import "./checkoutSteps.css";

const CheckoutSteps = ({ activestep }) => {
  const steps = [
    {
      lable: <Typography className="a">Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      lable: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    { lable: <Typography>Payment</Typography>, icon: <AccountBalanceIcon /> },
  ];
  const stepStyles = { boxSizing: "border-box" };
  return (
    <Fragment>
      <Stepper className="Stepper" alternativeLabel activeStep={activestep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activestep === index ? true : false}
            completed={activestep >= index ? true : false}
          >
            <StepLabel className="steplable"
              icon={item.icon}
              style={{
                color: activestep >= index ? "tomato" : "rgba(0, 0, 0, 0.643)",
              }}
            >
              {" "}
              {item.lable}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
