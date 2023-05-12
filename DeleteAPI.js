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
async function deleteListingByName(client,nameOfListing){
    const result=await client.db(dbn).collection(coll).deleteOne({
        name:nameOfListing
    })
    console.log(`${result.deletedCount} document(s) was/were deleted`);
    return `${result.deletedCount}`;
}
var result;
var nameOfListing;
async function call(nameOfListing){
    result=await deleteListingByName(client,nameOfListing);
}
app.get('/',(req,res)=>{
    res.send();
})
app.delete('/',(req,res)=>{
    nameOfListing=req.body;
    console.log(nameOfListing.name);
    call(nameOfListing.name);
    res.send(result);
})
app.listen(5000,()=>{
    
    console.log("listening on port 5000");
    });