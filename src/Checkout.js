import React,{forwardRef} from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import {useStateValue} from './StateProvider';
import Product from "./Product";
import CheckoutProduct from "./CheckoutProduct";
import FlipMove from 'react-flip-move';
import uuid from 'react-uuid'
function Checkout() {
  const [{basket,user,name},dispatch]=useStateValue();
  
  return (
    <div className="checkout">
      <div className="checkout_left">
        <img
          className="checkout_ad"
          src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/CEPC/Wearables/OPPO_Watch/Band/GW/AvailableNow/oppo_wearable_Live_DesktopHero_1500x600._CB657736990_.jpg"
          alt=""
        />
        <h3>Hello {user?name:'Guest'}</h3>
        <h2 className="checkout_title">Your Shopping Basket</h2>
       
        <FlipMove>
         { basket.map(item=>(
          <CheckoutProduct
          key={uuid()}
           title ={item.title}
           image={item.image}
           price={item.price}
           rating={item.rating}
           btn= {false}
           />
         ))
         }
         </FlipMove>
      </div>
      <div className="checkout_right">
       <Subtotal/>
      </div>
    </div>
  );
}

export default Checkout;
