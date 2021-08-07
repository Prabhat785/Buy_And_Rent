import React,{ useState,useEffect} from 'react'
import {db} from './firebase'
import Order from './Order';
import './Orders.css'
import Axios from 'axios';
import {useStateValue} from './StateProvider';
function Orders() {
    const [{basket,user},dispatch]=useStateValue();
    const[pay,setPay]=useState([]);
    const [orders,setOrders]=useState([]);
    var f1=false;
   // console.log(user?.uid);
   console.log("flag 1");
    useEffect(() => {
        if(user){
            /*db
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
           ))*/
          Axios.get(`http://localhost:3001/orderpay?username=${user.uid}`
    ).then((response)=>{
        console.log(response);
                 setPay(response.data);
                console.log(pay);
                f1=true;
               })
        }   
                
    }, [user])
    console.log(pay);
    useEffect(()=>{
        if(pay.length>0)
        {
        pay.map((value)=>{
            Axios.get(`http://localhost:3001/orderuser?paymentid=${value.paymentid}`).then((response)=>{
                setOrders(
                    orders=>[...orders,response.data]
                )
                console.log(orders);
            })
        })  
    }
    },[pay])
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
