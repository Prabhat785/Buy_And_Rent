import React from 'react';
import './Product.css';
import {useStateValue} from './StateProvider';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
function Product(props) {
    const [{basket,btnstate},dispatch]=useStateValue();
    const addtobasket=()=>{
        //dispatch item into basket'REMOVE_FROM_BASKET''ADD_TO_BASKET'
        
        dispatch({
            type:'ADD_TO_BASKET',
            item:{
                title: props.title,
                image: props.image,
                price: props.price,
                rating: props.rating,
            },
        });
        alert(`${props.title}aaded to basket`);
    }
     
    return (
        <div className="product">
             
            <div className="product_info">
            <p>{props.title}</p>
            <p className="product_price">
            <small>₹ </small>
            <strong>{props.price}</strong>
            </p>
            <div className="product_rating">
               {Array(props.rating).fill().map((_,i)=>{
                 return <p>⭐</p> 
               })}
              
            </div>
            </div>
            <img src={props.image} alt =""/>
            
           <button onClick={addtobasket}>Add to Basket</button>
        </div>
    )
}

export default Product
