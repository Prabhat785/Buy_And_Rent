import React, { useState, useEffect } from "react";
import uuid from "react-uuid";
import CheckoutProduct from "./CheckoutProduct";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import Axios from "axios";
import { db } from "./firebase";
function Payment() {
  const history = useHistory();
  const [{ basket, user,address,name }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeded, setSucceded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  console.log("ADDRESS",address);
  useEffect(() => {
    console.log("ADDRESS",address);
    const getClientSecret = async () => {
      const response = await Axios.post(`http://localhost:3001/payments/create?total=${getBasketTotal(basket) * 100 }`);
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, []);
  console.log("secret", clientSecret);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
       /* db.collection("user")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });*/
          basket.map((val,key)=>{
            Axios.post("http://localhost:3001/orders",{
              username:user?.uid,
              paymentid:paymentIntent.id,
              item:val.title,
              image:val.image,
              price:val.price,
              rating:val.rating,
              date:paymentIntent.created,
            }).then((response)=>{
              if(response.data.registered)
              {history.push("/login");}
            });
          })
         
        setSucceded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });
        history.replace("/orders");
      });
  };
  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment_container">
        <h1>
          Checkout(
          <Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment_address">
            <p>{name}</p>
            <p>{address.Address1}</p>
            <p>{address.Address2}</p>
            <p>{address.Landmark}</p>
            <p><span>{address.City}</span> <span>{address.State}</span></p>
          </div>

          <button onClick={(e) => history.push("/address")}>
            Edit Address{" "}
          </button>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Review items and Delivery</h3>
          </div>
          <div className="payment_items">
              {basket.map((item) => (
                <CheckoutProduct
                  key={uuid()}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                  btn={false}
                />
              ))}
          </div>
        </div>
        <div className="payment_section">
          <div className="payment_title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment_details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment_process">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total : {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparatot={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeded}>
                  <span>{processing ? <p>Processing </p> : "Buy Now "}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
        <section></section>
      </div>
    </div>
  );
}

export default Payment;
