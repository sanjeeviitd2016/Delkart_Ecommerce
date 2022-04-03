import React, { Fragment,useEffect } from "react";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import "./Profile.css";



const Profile = () => {
 
  const navigate= useNavigate();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);


  useEffect(()=>{
    if(isAuthenticated==false){
      navigate("/login")
    }
  },[isAuthenticated,navigate,user])

  

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title={`${user.name} | DelKart`}> </MetaData>
          <div className="profileContainer">
            <div>
              {/* <h1 className="Name"> My profile</h1> */}
              <img className="profilePic" src={user.avatar && user.avatar.url} alt={user.name} />
              <Link to="/me/update"> Edit Profile </Link>
            </div>
            <div className="profileDetails">
              <div>
                <h4>Full Name</h4>
                <p> {user.name}</p>
              </div>

              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined on</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div className="profilelinks">
                <Link to="/orders">My Orders</Link>
                <Link to="/password/update"> Change Password </Link>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
