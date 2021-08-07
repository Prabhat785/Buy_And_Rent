import React,{forwardRef} from "react";
import "./CheckoutProduct.css";
import {useStateValue} from './StateProvider';
const CheckoutProduct = forwardRef((props,ref) =>{
    const [{basket,btnstate},dispatch]=useStateValue();
    
    
    const removefrombasket=()=>{
        //dispatch item into basket'REMOVE_FROM_BASKET''ADD_TO_BASKET'
        
        dispatch({
            type:'REMOVE_FROM_BASKET',
            item:{
                title: props.title,
                image: props.image,
                price: props.price,
                rating: props.rating,
            },
        });
    
    }
  return (
    <div className="checkoutproduct" ref={ref}>
      <img className="checkoutproduct_image" src={props.image} />

      <div className="checkoutproduct_info">
        <p className="checkoutproduct_title">{props.title}</p>
        <p className="checkoutproduct_price">
          <small>$</small>
          <strong>{props.price}</strong>
        </p>
        <div className="checkoutproduct_rating">
        {Array(props.rating).fill().map((_,i)=>{
                 return <p>⭐</p> 
               })}
        </div>
        <button onClick={removefrombasket}>Remove from Basket</button>
      </div>
    </div>
  );
});

export default CheckoutProduct;
