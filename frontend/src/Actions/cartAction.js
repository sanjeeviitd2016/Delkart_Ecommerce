import { ADD_TO_CART,REMOVE_TO_CART, SAVE_SHIPPING_INFO } from "../Constants/cartConstant";
import axios from "axios";


export const addItemCart = (id,quantity) => async(dispatch,getState) =>{

    try{
    const {data}= await axios.get(`/product/${id}`)
    console.log(data,quantity)
    console.log("id",data.product._id)
    dispatch({type: ADD_TO_CART,
                payload: {
                    product: data.product._id,
                    name: data.product.name,
                    price: data.product.price,
                    image: data.product.images[0].url,
                    stock: data.product.stock,
                    quantity : quantity
                }})
    
                localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
            }
    catch(error){
        console.log(error)
    }
}

// remove from cart
export const removeItemCart = (id) => async(dispatch,getState) =>{

        try{
            dispatch({type:REMOVE_TO_CART,payload:id })
        }
        catch(error){
            console.log(error)
        }
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))


}

export const saveShippingInfo = (data) => async(dispatch) =>{

    dispatch({type:SAVE_SHIPPING_INFO,
              payload:data  })

    localStorage.setItem("shippingInfo",JSON.stringify(data));

}