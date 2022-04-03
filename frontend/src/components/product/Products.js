import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../Actions/productActions.js";
import Loader from "../layout/loader/Loader.js";
import Product from "../layout/home/Product.js";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData.js"

const Products = () => {



  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "Smartphone",
  ];
  const dispatch = useDispatch();
  const alert= useAlert();
  const { product, loading, productsCount, error, resultPerPage } = useSelector(
    (state) => state.products
  );
  
  const [currentPage, setcurrentPage] = useState(1);
  const [price, setprice]= useState([0,25000])
  const [category, setcategory]= useState("")
  const [ratings,setratings]= useState(0)

  const { keyword } = useParams();
  const setCurrentPage = (e) => {
    setcurrentPage(e);
  };

  const priceHandler =(event,newPrice)=>{
        setprice(newPrice)
  }




  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(getProduct(keyword, currentPage,price,category,ratings));
  }, [dispatch, keyword, currentPage,price,category,ratings,error,alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Products |DelKart" />
          <h2 className="products_heading">Products</h2>
          <div className="Products">
            {product &&
              product.map((prod) => <Product product={prod}></Product>)}
          </div>


          <div className="filterBox">


            <Typography>price</Typography>
            <Slider 
            value={price}
            onChange= {priceHandler}
            valueLabelDisplay="auto"
            aria-labelleebdy="range-slider"
            min ={0}
            max ={25000}
            
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {
              categories.map((category) => (

                <li  className="category_link"  key={category} onClick={()=> setcategory(category)}> {category}</li>
              ))
              }
            </ul>
            <fieldset >
              <legend>
              <Typography> Ratings Above </Typography>
              </legend>
              <Slider
               value={ratings}
               onChange={(e,newRating)=> setratings(newRating)}
               aria-labelledby="continous-slider"
               valueLabelDisplay="auto"
               min={0}
               max={5}
               />
            </fieldset>


          </div>
         { resultPerPage < productsCount &&
            <div className="pagination_box">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPage}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                LastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="PageLinkActive"
              />
            </div>
}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
