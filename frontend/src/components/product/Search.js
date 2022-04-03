import { Fragment, useState } from 'react';
import React from 'react';
import {useNavigate} from "react-router-dom"
import "./search.css"
import MetaData from "../layout/MetaData"


const Search = () => {
const[ keyword,setkeyword]= useState("");
const navigate= useNavigate()
const searchSubmitHandeler =(e)=>{
    e.preventDefault();
    if(keyword.trim()){
        navigate(`/products/${keyword}`)
    }
    else{
        navigate("/products")
    }

}
  return (
      <Fragment>
           <MetaData title={`Search product | DelKart`}  />
          <form className="search_box" onSubmit={searchSubmitHandeler}>
                <input className='input' type= 'search' placeholder='Search a Product...' 
                onChange={(e)=>setkeyword(e.target.value)}
                />
                <button  className='search_button'  value='submit'>submit</button> 
          </form>
      </Fragment>
  );
};

export default Search;
