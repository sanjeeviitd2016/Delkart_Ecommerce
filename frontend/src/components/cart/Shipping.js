import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../Actions/cartAction";
import MetaData from "../layout/MetaData";
import HomeIcon from "@material-ui/icons/Home";
import PinDropIcon from "@material-ui/icons/PinDrop";
import PhoneIcon from "@material-ui/icons/Phone";
import PublicIcon from "@material-ui/icons/Public";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import CheckoutSteps from "./checkoutSteps.js";
import {useNavigate} from "react-router-dom"

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setaddress] = useState(shippingInfo.address);
  const [city, setcity] = useState(shippingInfo.city);
  const [district, setdistrict] = useState(shippingInfo.district);
  const [state, setstate] = useState(shippingInfo.state);
  const [country, setcountry] = useState(shippingInfo.country);
  const [pinCode, setpinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setphoneNo] = useState(shippingInfo.phoneNo);
  

  const shippingSubmit = (e) => {
    e.preventDefault();
    if(phoneNo.length <10 || phoneNo.length>10){
      alert.error("Phone number should be 10 digits long")
      return 
    }
    dispatch(saveShippingInfo({address,city,district,country,state,phoneNo,pinCode}));
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="shipping details | DelKart"></MetaData>
      <CheckoutSteps activestep={1}/>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <HomeIcon />
              <input
                type="text"
                placeholder="address"
                required
                value={address}
                onChange={(e) => setaddress(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="city"
                required
                value={city}
                onChange={(e) => setcity(e.target.value)}
              />
            </div>
            <div>
              <LocationCityIcon />
              <input
                type="text"
                placeholder="district"
                required
                value={district}
                onChange={(e) => setdistrict(e.target.value)}
              />
            </div>
            <div>
              <PinDropIcon />
              <input
                type="text"
                placeholder="pinCode"
                required
                value={pinCode}
                onChange={(e) => setpinCode(e.target.value)}
              />
            </div>
            <div>
              <PublicIcon />
              <select
                required
                // onInvalid="setCustomValidity()"
                value={country}
                onChange={(e) => setcountry(e.target.value)}
                
              >
                <option value="">Select Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {" "}
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon />
                <select
                  required
                  value={state}
                  onChange={(e) => setstate(e.target.value)}
                >
                  <option vlaue=""> Select State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((state) => (
                      <option key={state.isoCode} value={state.isoCode}>
                        {state.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
           
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="phoneNo"
                required
                value={phoneNo}
                onChange={(e) => setphoneNo(e.target.value)}
              />
            </div>

            <div>
                {/* <input  type="submit" value="Continue" className="shippingBtn"
                disabled={state?false:true} /> */}
                <button className="shippingBtn">Continue</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
