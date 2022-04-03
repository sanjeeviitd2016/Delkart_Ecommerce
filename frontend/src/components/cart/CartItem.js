import React, { Fragment } from 'react'
import {Link} from "react-router-dom"
import "./CartItem.css"
import { removeItemCart } from '../../Actions/cartAction';
import { useDispatch } from 'react-redux';

const CartItem = ({item}) => {

    const dispatch=useDispatch()
    const removeFromCart =(id)=>{
      dispatch(removeItemCart(id))
    }
  return (
    <Fragment>
        <div className='CartItem'>
        <Link to={`/product/${item.product}`}><img className="CartItem_image" src={item.image} alt="sanjeev" /></Link>
        <div>
            <Link to={`/product/${item.product}`}>{item.name} </Link>
            <span> {`Price: ₹${item.price}`}</span>
            <p onClick={()=> removeFromCart(item.product)}>Remove</p>
        </div>
        </div>
    </Fragment>
  )
}

export default CartItem