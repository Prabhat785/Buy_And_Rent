import React,{useState,useEffect} from 'react'
import uuid from 'react-uuid';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css';
import {useStateValue} from './StateProvider';
import FlipMove from 'react-flip-move';
import { Link,useHistory } from "react-router-dom";
import {CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import axios from 'axios';
import { db } from './firebase';
function Payment() {
    const history=useHistory();
    const [{basket,user},dispatch]=useStateValue ();
    const stripe=useStripe();
    const elements=useElements();
    const [error,setError]=useState(null);
    const [disabled,setDisabled]=useState(true);
    const [processing,setProcessing]=useState("");
    const [succeded,setSucceded]=useState(false);
    const [clientSecret,setClientSecret]=useState(true);
    useEffect(() => {
       const getClientSecret= async ()=>{
         const response =await axios({
             method : 'post',
             url : `https://us-central1-brdo-9e825.cloudfunctions.net/api/payments/create?total=${getBasketTotal(basket) * 100}`
         });
         setClientSecret(response.data.clientSecret);
       }
       getClientSecret();
    }, [basket])
    console.log("secret",clientSecret);
   const handleSubmit= async (event)=>{
         event.preventDefault();
         setProcessing(true);
         const payload = await stripe.confirmCardPayment(clientSecret,{
             payment_method:{
                 card:elements.getElement(CardElement)
             }
         }).then(({paymentIntent})=>{

            db
            .collection('user')
            .doc(user?.uid)
            .collection('orders')
            .doc(paymentIntent.id)
            .set(
            {
                basket:basket,
                amount:paymentIntent.amount,
                created:paymentIntent.created
            })

             setSucceded(true);
             setError(null);
             setProcessing(false);
            
             dispatch({
                 type:'EMPTY_BASKET'
             })
             history.replace('/orders');
         }) 
   }
   const handleChange= event=>{
    setDisabled(event.empty);
    setError(event.error?event.error.message:"");
}

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout(
                        <Link to ="/checkout">
                        {basket?.length} items
                        </Link> 
                    )
                </h1>
                <div className="payment_section">
                   <div className="payment_title">
                       <h3>Delivery Address</h3>
                   </div>
                   <div className="payment_address">
                       <p>{user?.email}</p>
                       <p>Bari Aliganj </p>
                       <p>Pakur Jharkhand</p>
                   </div>
                </div>
                 <div className="payment_section">
                      <div className="payment_title">
                          <h3>Review items and Delivery</h3>
                      </div>
                      <div className="payment_items">
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
                </div>
                 <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                      <form onSubmit={handleSubmit}>
                          <CardElement onChange={handleChange}/>
                            <div className="payment_process">
                            <CurrencyFormat
                renderText= {(value)=>(
                <h3>Order Total : {value}</h3>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparatot ={true}
                prefix={"$"}
            />
            <button disabled={processing||disabled || succeded }>
                <span>{processing ? <p>Processing </p>:"Buy Now "}</span>
            </button>
                            </div>
                            {error&&<div>{error}</div>}
                      </form>
                    </div>
                </div>
                <section></section>
            </div>
        </div>
    )
}

export default Payment
