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
var result;
var obj;
var name;
async function call(name,obj){
    result=await updateByListingName(client,name,obj);
    console.log(result);
}
//call(name,obj);


async function updateByListingName(client,nameOfListing,updateByListing){
    const result=await client.db(dbn).collection(coll).updateOne({
        name:nameOfListing
    },
    {
        $set:updateByListing
    });
    return {
        Matched_Count:`${result.matchedCount}`,
        Modified_Count:`${result.modifiedCount}`
    }
    console.log(`${result.matchedCount} document(s) match the query criteria`);
    console.log(`${result.modifiedCount} document was were updated`);
}
app.get('/',(req,res)=>{
    res.send();
})
app.put('/',(req,res)=>{
    obj=req.body[0];
    name=req.body[1];
    call(name,obj);
    console.log(req.body);
    res.send(result);
});
app.listen(5000,()=>{
    
console.log("listening on port 5000");
});