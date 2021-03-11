import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <div>
      <img
        className="home_image"
        src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2021/X-site/Multititle/Feb/EN/1500x600_Hero-Tall_01_FT._CB659468779_.jpg"
        alt=""
      ></img>
      <div className="home_row">
        <Product 
        id={1}
        title ="All-new Echo Dot (4th Gen) | Next generation smart speaker with improved bass and Alexa (Black)"
        price={3999}
        rating={4}
        image="https://images-na.ssl-images-amazon.com/images/I/41QCtvT3tjL._SY355_.jpg"
      
        />
        <Product
        id={2}
        title="Rich Dad Poor Dad: What the Rich Teach Their Kids About Money That the Poor and Middle Class Do Not! "
        price={294}
        rating={5}
        image="https://images-na.ssl-images-amazon.com/images/I/51wOOMQ+F3L._SX312_BO1,204,203,200_.jpg"
       
        />
      </div>
      <div className="home_row">
          <Product
          id={3}
          title="TIMESPACE Analogue Men's Watch ( Brown & White Dial Brown Colored Strap )"
          price={449}
        rating={3}
        image="https://images-na.ssl-images-amazon.com/images/I/91Yrki%2B5lQL._UL1500_.jpg"
       
          />
          <Product
          id={5}
          title="New Apple iPhone 12 Pro Max (128GB) - Pacific Blue"
          price={124704.00}
          rating={4}
          image="https://images-na.ssl-images-amazon.com/images/I/71MHTD3uL4L._SL1500_.jpg"
         
          />
          <Product
          id={5}
          title="Mi Smart Band 5-1.1” AMOLED Color Display, 2 Weeks Battery Life, 5ATM Water Resistant"
          rating={4}
          price={2499}
          image="https://images-na.ssl-images-amazon.com/images/I/719ZywAmvOL._SL1500_.jpg"
         
          />
      </div>
      <div className="home_row">
         <Product
         id={6}
         title="Samsung 163 cm (65 Inches) Q Series 4K Ultra HD QLED Smart TV QA65Q6FNAK (Black) (2018 model)"
         rating={5}
         price={177499}
         image="https://images-na.ssl-images-amazon.com/images/I/81Lp5qoZmGL._SL1500_.jpg"
         />    
      </div>
      
      </div>  
    </div>
  );
}

export default Home;
