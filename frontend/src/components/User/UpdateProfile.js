import React, { useState, useEffect, Fragment } from "react";
import "./UpdateProfile.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import profile from "../../images/profile.jpeg";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import {
  updateProfile,
  clearErrors,
  loadUser,
} from "../../Actions/userAction.js";
import { UPDATE_PROFILE_RESET } from "../../Constants/userConstant";
import Loader from "../layout/loader/Loader.js";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [avatar, setavatar] = useState();
  const [avatarPreview, setavatarPreview] = useState();

  const updateSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);

    dispatch(updateProfile(myForm));
  };

  const updateDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setavatarPreview(reader.result);
        setavatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log("url", e.target.files[0]);
  };

  useEffect(() => {
    
    if (isUpdated) {
      alert.success("Profile is updated successfully");
      dispatch(loadUser());
      navigate("/account");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }

    // if (user) {
    //   setname(user.name);
    //   setemail(user.email);
    //   setavatarPreview(user.avatar && user.avatar.url);
    // }
    if (error) {
      console.log("Error");
      alert.error(error);
      dispatch(clearErrors());
    }
    
  }, [dispatch, error, alert, isUpdated, user, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Update Profile | DelKart" />
          <div className="update_container">
            <div className="update_box">
              <h1 className="update_heading"> Update Profile</h1>
              <form
                className="update_form"
                encType="multipart/form-data"
                onSubmit={updateSubmit}
              >
                <div className="update_name">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                  />
                </div>
                <div className="update_email">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                </div>

                <div className="update_image">
                  <img src={avatarPreview} alt="avatar" />
                  <input
                    type="file"
                    name="avatar"
                    accept="/image"
                    onChange={updateDataChange}
                  />
                </div>
                <input type="submit" value="Update" className="updateBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdateProfile;
