const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")("sk_test_51IRkNyH1q3xMFGpk9iMDxXpVsw7rGbF24YbzKQ8psd0BSRuGLOKGfiva0HhHdLg78Ov63LJ0aTN0kgBOTzArDG0R00iKAio0yJ")

const app = express();

app.use(cors({origin:true}));
app.use(express.json());
app.post('/payments/create',async(req,res)=>{
    const total = req.query.total;
    console.log('Payment Req recieved',total);
    const paymentIntent= await stripe.paymentIntents.create({
        amount : total,
        currency: "inr",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    });
})
app.get('/',(req,res)=>{
    res.status(200).send("hello world");
})
exports.api=functions.https.onRequest(app);