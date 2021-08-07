import React from 'react'
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from './StateProvider';
import { getBasketTotal } from './reducer';
import { useHistory } from 'react-router';
function Subtotal() {
    const [{basket},dispatch]=useStateValue();
    const histroy=useHistory();
    return (
        <div className="subtotal">
            <CurrencyFormat
                renderText= {(value)=>(
                 <>
                 <p>
                     Subtotal ({basket.length} items):<strong>{value}</strong>
                 </p>
                  <small className="subtotal_gift">
                      <input type="Checkbox"/>
                      This Order Contains gift
                  </small>
                </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparatot ={true}
                prefix={"$"}
            />
            <button onClick={e=>histroy.push('/payment')}>Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
