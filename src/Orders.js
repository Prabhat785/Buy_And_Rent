import React,{ useState,useEffect} from 'react'
import {db} from './firebase'
import Order from './Order';
import './Orders.css'
import {useStateValue} from './StateProvider';
function Orders() {
    const [{basket,user},dispatch]=useStateValue();
    const[orders,setOrders]=useState([]);
   // console.log(user?.uid);
   console.log("flag 1");
    useEffect(() => {
        if(user){
            db
           .collection('user')
           .doc(user?.uid)
           .collection('orders')
           .orderBy('created','desc')
           .onSnapshot(snapshot=>(
               setOrders(snapshot.docs.map(doc=>(
                   {
                       id: doc.id,
                       data: doc.data()
                   }
               )))
           ))
                }
                else
                {
                    setOrders([])
                }
    }, [user])
    console.log("flag 3");
    console.log(orders);
    return (
        <div className="orders">
            <h1>Your Orders are</h1>
            <div className="orders_order">
                {orders?.map(order=>(
                    <Order or={order}/>
                ))}
            </div>
        </div>
    )
}

export default Orders
