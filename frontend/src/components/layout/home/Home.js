import "./home.css";
import Product from "./Product";
import { CgMouse } from "react-icons/cg";
import MetaData from "../../layout/MetaData.js";
import { getProduct } from "../../../Actions/productActions.js";
import { Fragment, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {useAlert} from "react-alert"
import Loader from "../loader/Loader";
import { clearErrors } from "../../../Actions/productActions.js";

const Home = () => {
  const alert= useAlert();
  const dispatch = useDispatch();
  const { product,loading,productsCount,error } = useSelector((state) => state.products);
  // console.log("error",error)
  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    dispatch(getProduct());
  }, [dispatch,alert]);

  
  return (
    <Fragment>
         <MetaData title="DelKart"></MetaData>
      <div className="banner">
        <p>Welcome to Delkart</p>
        <h1> Find Amazing Products below</h1>

        <a href="#conatiner">
          <button>
            {" "}
            Scroll
            <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="home_heading">Featured Products</h2>

      {
        loading ? <Loader></Loader>:
        <Fragment>
   

      <div className="container" id="container">
        {product && product.map((pro) => < Product key={product && product._id} product={pro}> </Product>)}
      </div>
    </Fragment>
      }
    </Fragment>
  );
};

export default Home;
