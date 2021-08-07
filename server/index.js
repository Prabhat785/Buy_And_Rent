const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")("sk_test_51IRkNyH1q3xMFGpk9iMDxXpVsw7rGbF24YbzKQ8psd0BSRuGLOKGfiva0HhHdLg78Ov63LJ0aTN0kgBOTzArDG0R00iKAio0yJ")
const mysql = require("mysql");
const app = express();

app.use(cors({origin:true}));
app.use(express.json());
const db = mysql.createConnection({
    host     : 'b1woqqtguwxbqaga0tqq-mysql.services.clever-cloud.com',
    user     : 'ubzn84mdpgpthf0l',
    password : 'nKNklleNYQ9k8HhqAWY0',
    database : 'b1woqqtguwxbqaga0tqq'
  });  
app.post('/payments/create',async(req,res)=>{
    const total = req.query.total;
    if(total>0)
    {
    console.log('Payment Req recieved',total);
    const paymentIntent= await stripe.paymentIntents.create({
        amount : total,
        currency: "inr",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
}
})
app.post('/orders',(req,res)=>{
    const username=req.body.username;
    const paymentid=req.body.paymentid;
    const item=req.body.item;
    const image=req.body.image;
    const price=req.body.price;
    const rating=req.body.rating;
    const date=req.body.date;
    db.query(
        "INSERT INTO orders (username,paymentid,item,image,price,rating,date) VALUES (?,?,?,?,?,?,?);",
        [username,paymentid,item,image,price,rating,date],
        (err,results)=>{
            if(err) {
            console.log(err);
            }
            else
            {
               // console.log(results);
            }
        }
    )
})
app.get('/orderpay',(req, res)=>{
    const username=req.query.username;
   // console.log(username);
    db.query(
        "SELECT paymentid FROM orders WHERE username=? group by paymentid;",
        [username],(err, results)=>{
            if(err){
                console.log(err);
            }
            else
            {
               // console.log(results);
                res.send(results);
            }
        }
    )
});
app.get('/orderuser',(req, res)=>{
    const paymentid = req.query.paymentid;
    console.log(paymentid);
    db.query(
        "SELECT * FROM orders WHERE paymentid=?;",
        [paymentid],(err, results)=>{
            if(err){
                console.log(err);
            }
            else
            {
                res.send(results);
            }
        }
    )
});
app.get('/',(req,res)=>{
    res.status(200).send("hello world");
})

app.listen(3001, (req, res) => {
    console.log("Server running...");
  });
  