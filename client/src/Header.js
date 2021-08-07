import React,{useState,useEffect,useRef} from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import {useStateValue} from './StateProvider';
import { auth,db } from "./firebase";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuIcon from '@material-ui/icons/Menu';
import catg from './Products.json';
function Header() {
  const [{basket,user,name,address},dispatch]=useStateValue ();
  const [searchin,setSearchin]=useState("");
  useEffect(() => {
    console.log("I am flag1",user?.uid);   
    db.collection('users')
    .doc(user?.uid)
    .collection('details')
    .doc('Basic')
    .get().then((doc)=>{
      if(doc.exists)
      {
        dispatch({
          type:'SET_NAME',
          name:doc.data().Fullname
        })
      }
    })
    .catch((error)=>{
      console.log("error",error);
    })
    db.collection('users')
    .doc(user?.uid)
    .collection('details')
    .doc('Address')
    .get().then((doc)=>{
      if(doc.exists)
      {
        dispatch({
          type:'SET_ADDRESS',
          address:doc.data()
        })
      }
    })
    .catch((error)=>{
      console.log("error",error);
    })
console.log("KDKN",address);

  }, [user]);
  
  const handleauth=()=>{
    if(user){
      auth.signOut();
    }
  }
  console.log("Name :",name)
  return (
    <div className="head">
    <div className="header">
      <Link to="/">
      <h1 className="header_logo">
            B&R
          </h1>
      </Link>
       <div className="header_loc">
      <LocationOnIcon/>
     
      <div className="header_option">
          <span className="header_option1">Deliver to {user?name:'Guest'} </span>
          <span className="header_option2">{address.City},{address.State}</span>
        </div>
        </div>
      <div className="header_search">
      
      <input className="header_searchinput" onChange={(event)=>{
        setSearchin(event.target.value)
      }} type ="text" ></input>
      
      <div className="headsearchbt">
       {
         catg.filter((val)=>{
           if(searchin!=""&&val.title.toLowerCase().includes(searchin.toString().toLowerCase()))
           return val;

         }).map((val,key)=>{
          return <div className="options" key={key}>{val.title}</div>
         })
       }
        </div>
      </div>
      <SearchIcon className="header_searchicon" />
      <div className="header_menu">
        <input type="checkbox" id="click"></input>
        <label for="click">
      <MenuIcon />
      </label>
      </div>
      <div className="header_nav">
        <Link to ={!user&&"/login"}>
        <div className="header_option">
          <span className="header_option1">Hello {user?name:'Guest'}</span>
          <span className="header_option2" onClick={handleauth}>{user ? 'Sign Out':'Sign In'}</span>
        </div>
        </Link>
        <Link to ={"/orders"}>
        <div className="header_option">
          <span className="header_option1">Return</span>
          <span className="header_option2">Orders</span>
        </div>
        </Link>
        <div className="header_option">
          <span className="header_option1">Your</span>
          <span className="header_option2">Account</span>
        </div>
        <Link to="/checkout">
          <div className="header_optionbasket">
            <ShoppingBasketIcon />
            <span className="header_option2 header_basketcount">{basket.length}</span>
          </div>
        </Link>
      </div>
      </div>
      <div className="header_bottom">
      <div className="header_loc">
      <LocationOnIcon/>
      
      <div className="header_option">
          <span className="header_option1">Deliver to {user?name:'Guest'} </span>
          <span className="header_option2">{address.City},{address.State}</span>
        </div>
        </div>
      <div className="header_nav">
        <Link to ={!user&&"/login"}>
        <div className="header_option">
          <span className="header_option1">Hello {user?name:'Guest'}</span>
          <span className="header_option2" onClick={handleauth}>{user ? 'Sign Out':'Sign In'}</span>
        </div>
        </Link>
        <Link to ={"/orders"}>
        <div className="header_option">
          <span className="header_option1">Return</span>
          <span className="header_option2">Orders</span>
        </div>
        </Link>
        <div className="header_acnt">
          <span className="header_option1">Your</span>
          <span className="header_option2">Account</span>
          <div class="dropdown-content">
             <ul>
             <li href="#">Link 1</li>
             <li href="#">Link 2</li>
             <li href="#">Link 3</li>
             </ul>
          </div>
        </div>
        <Link to="/checkout">
          <div className="header_optionbasket">
            <ShoppingBasketIcon />
            <span className="header_option2 header_basketcount">{basket.length}</span>
          </div>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default Header;
