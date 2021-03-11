import './App.css';
import React,{useEffect} from 'react';
import Header from './Header'
import Home from './Home';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login';
import {auth} from './firebase'
import {useStateValue} from './StateProvider';
import Footer from './Footer';
import Payment from './Payment';
import Register from './Register';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders';
const promise=loadStripe(
  "pk_test_51IRkNyH1q3xMFGpkymMiqOlKrw1nMwyFOHrYx4vn9Ef9nZLvtg03Ild2iA4Fgx6S3XKwfZxncyPAXbhopIgtOVix00ytx0eNgF"
);
function App() {
  const [{},dispatch]=useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged(authUser=>{
      console.log( "user is :",authUser);
      if(authUser){
          dispatch({
            type:'SET_USER',
            user:authUser
          })
      }
      else
      {
        dispatch({
          type:'SET_USER',
          user:null
        })
      }
    })
  }, [])
  return (
    <Router>
    <div className="App">
    
      <Switch>
      <Route path="/login">
       <Login/>
       <Footer/>
      </Route>
      <Route path="/checkout">
      <Header/>
       <Checkout/>
       <Footer/>
      </Route>
      <Route path="/register">
      <Header/>
       <Register/>
       <Footer/>
      </Route>
      <Route path="/payment">
      <Header/>
      <Elements stripe={promise}>
       <Payment />
       </Elements>
      </Route>
      <Route path="/orders">
        <Header/>
      <Orders/>
      <Footer/>
      </Route>
        <Route path="/">
        <Header/>
      <Home />
      <Footer/>
      </Route>
      </Switch>
      
    </div>
    </Router>
  );
}

export default App;
