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
 async function findOneListingByName(client,nameOfListing){
    const result=await client.db(dbn).collection(coll).findOne({
        name:nameOfListing
    });
    if(result){
        return await result;
    } else{
        console.log(`No listing found with name ${nameOfListing}`);
    }
}
var result;
async function call(){
    result=await findOneListingByName(client,"Infinite Views");
    console.log(result);
}
call();
 app.get('/',(req,res)=>{
    res.send(result);
});
app.listen(5000,()=>{
console.log("listening on port 5000");
});

