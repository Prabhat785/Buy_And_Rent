import React,{useState,useEffect,useRef} from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import {useStateValue} from './StateProvider';
import { auth,db } from "./firebase";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MenuIcon from '@material-ui/icons/Menu';
import catg from './MOCK_DATA.json';
function Header() {
  const [{basket,user,name},dispatch]=useStateValue ();
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
console.log("header");

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
        <img
          className="header_logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt="BRD"
        ></img>
      </Link>
       <div className="header_loc">
      <LocationOnIcon/>
     
      <div className="header_option">
          <span className="header_option1">Deliver to {user?name:'Guest'} </span>
          <span className="header_option2">Pakur, Jharkhand</span>
        </div>
        </div>
      <div className="header_search">
      
      <input className="header_searchinput" onChange={(event)=>{
        setSearchin(event.target.value)
      }} type ="text" ></input>
      
      <div className="headsearchbt">
       {
         catg.filter((val)=>{
           if(searchin!=""&&val.cateogries.toLowerCase().includes(searchin.toString().toLowerCase()))
           return val;

         }).map((val,key)=>{
          return <div className="options" key={key}>{val.cateogries}</div>
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
          <span className="header_option2">Pakur, Jharkhand</span>
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
    </div>
  );
}

export default Header;
