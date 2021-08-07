import React, { useEffect, useState } from 'react'
import moment from "moment"
import CheckoutProduct from './CheckoutProduct'
import './Order.css'
import uuid from 'react-uuid'
function Order({or}) {
  const[sum,setSum]=useState(0);
  var x=0;
    useEffect(()=>{
        or.map((val)=>{
            x+=val.price;
            setSum(x);
                
        })
    },[])
    console.log(sum);
    return (
        <div className='order'>
            <h2>Order</h2>
           <p>{moment.unix(or.date).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order_id">
                <small>{or[0].paymentid}</small>
            </p>
            {or.map(val=>(
                
                 <CheckoutProduct
                 key={uuid()}
                  title ={val.item}
                  image={val.image}
                  price={val.price}
                  rating={val.rating}
                  btnvis= {false}
                  />
            ))}
           <h3>Order Total ${sum}</h3> 
        </div>
    )
}

export default Order
