const express = require('express');
const {MongoClient}=require('mongodb');
const path=require('path');
const app=express();
app.use(express.json());
const dbn="sample_airbnb";
const coll="listingsAndReviews";
const url = "mongodb+srv://demo:animesh@mycluster.ggjh5mw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const connect=client.connect();
async function createListing(client,obj){
    const re=await client.db(dbn).collection(coll).insertOne(obj);
    return re;
}
var result;
var obj;
async function call(obj){
    result=await createListing(client,obj);
}
app.get('/',(req,res)=>{
    res.send();
})
app.post('/',(req,res)=>{
    obj=req.body;
    call(obj);
    res.send(result);
})
app.listen(5000,()=>{
    
    console.log("listening on port 5000");
    });