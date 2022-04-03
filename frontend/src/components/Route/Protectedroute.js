import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import {Route,Navigate,useNavigate} from "react-router-dom"

const Protectedroute = ({element}) => {
    const {loading,isAuthenticated,user}= useSelector(state=>state.user)
    const navigate= useNavigate();
  return (
    <Fragment>
        {
          isAuthenticated ? {element} : <h1> No route found</h1>
        }
    </Fragment>
  )
}

export default Protectedroute