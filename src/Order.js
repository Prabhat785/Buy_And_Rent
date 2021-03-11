import React from 'react'
import moment from "moment"
import CheckoutProduct from './CheckoutProduct'
import './Order.css'
import uuid from 'react-uuid'
function Order({or}) {
    return (
        <div className='order'>
            <h2>Order</h2>
           <p>{moment.unix(or.data.created).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order_id">
                <small>{or.id}</small>
            </p>
            {or.data.basket.map(item=>(
                 <CheckoutProduct
                 key={uuid()}
                  title ={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  btnvis= {true}
                  />
            ))}
           <h3>Order Total ${(or.data.amount)/100}</h3> 
        </div>
    )
}

export default Order
