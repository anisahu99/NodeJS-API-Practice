//const MongoClient = require('mongodb').MongoClient; //Tradition Syntax
const express = require('express');
const {MongoClient}=require('mongodb');
const dbn="sample_airbnb";
const coll="listingsAndReviews";
const url = "mongodb+srv://demo:animesh@mycluster.ggjh5mw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
async function main(){
    
    try{
        let res=await client.connect();
        /*await createListing(client,{
            name:"Lovely Loft",
            summary:"A charming loft in paris",
            bedrooms:1,
            bathroom:1
        })*/
        //await deleteListingScrapedBeforeDate(client,new Date("2019-02-15"));
        //await deleteListingByName(client,"Cozy Cottage");
        //await updateAllListingsToHavePropertyType(client);
        //await upsertByListingName(client, "Cozy Cottage", { name: "Cozy Cottage", bedrooms: 2, bathrooms: 1 });

        // await updateByListingName(client,"Infinite Views",{
        //     bedrooms:6,
        //     bed:8
        // });

        // await findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
        //     minimumNumberOfBedrooms: 4,
        //     minimumNumberOfBathrooms: 2,
        //     maximumNumberOfResults: 5
        // });
        //await findOneListingByName(client,"Infinite Views")
        
        /*await MultipleCreateListing(client,[
            {
                name:"Infinite Views",
                Summary:"Modern Home with infinte views",
                property_type:"House",
                bedrooms:5,
                bathroom:3,
                beds:5

            },
            {
                name:"Beautiful Beach House",
                summary:"Enjoy Relaxed beach living",
                bedrooms:4,
                bathroom:2,
                beds:6,
                last_review:new Date()   
            },
            {
                name:"Private room in London",
                property_type:"Apartment",
                bedrooms:1,
                bathroom:1
            }
        ])*/
        //await list(client);//List of database
       console.log("Database is Connected");
    }catch(err){
        console.log(err);
    }finally{
        await client.close();
    }
}
main();
async function list(client){
const data=await client.db().admin().listDatabases();
console.log("Databases");
data.databases.forEach(db => {
    console.log(`-${db.name}`);
    
});
}
async function createListing(client,newListing){
    const result=await client.db(dbn).collection(coll).insertOne(newListing);
    console.log(`New Listing Created with following id:${result.insertedId}`);
}
async function MultipleCreateListing(client,newListing){
    const result=await client.db(dbn).collection(coll).insertMany(newListing);
    console.log(`${result.insertedCount} new Listing with following id(s):`);
    console.log(result.insertedIds);
}
async function findOneListingByName(client,nameOfListing){
    const result=await client.db(dbn).collection(coll).findOne({
        name:nameOfListing
    });
    if(result){
        console.log(`Found a listing in the collection with the name ${nameOfListing}`);
        console.log(result);
    } else{
        console.log(`No listing found with name ${nameOfListing}`);
    }
}
async function findListingsWithMinimumBedroomsBathroomsAndMostRecentReviews(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathrooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER
} = {}) {
    const cursor = client.db(dbn).collection(coll).find(
                            {
                                bedrooms: { $gte: minimumNumberOfBedrooms },
                                bathrooms: { $gte: minimumNumberOfBathrooms }
                            }
                            ).sort({ last_review: -1 })
                            .limit(maximumNumberOfResults);

    const results = await cursor.toArray();

    if (results.length > 0) {
        console.log(`Found listing(s) with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms:`);
        results.forEach((result, i) => {
            date = new Date(result.last_review).toDateString();

            console.log();
            console.log(`${i + 1}. name: ${result.name}`);
            console.log(`   _id: ${result._id}`);
            console.log(`   bedrooms: ${result.bedrooms}`);
            console.log(`   bathrooms: ${result.bathrooms}`);
            console.log(`   most recent review date: ${new Date(result.last_review).toDateString()}`);
        });
    } else {
        console.log(`No listings found with at least ${minimumNumberOfBedrooms} bedrooms and ${minimumNumberOfBathrooms} bathrooms`);
    }
}

async function updateByListingName(client,nameOfListing,updateByListing){
    const result=await client.db(dbn).collection(coll).updateOne({
        name:nameOfListing
    },
    {
        $set:updateByListing
    });
    console.log(`${result.matchedCount} document(s) match the query criteria`);
    console.log(`${result.modifiedCount} document was were updated`);
}

async function upsertByListingName(client,nameOfListing,updateByListing){
    const result=await client.db(dbn).collection(coll).updateOne({
        name:nameOfListing
    },
    {
        $set:updateByListing
    },{upsert:true});
    if (result.upsertedCount > 0) {
        console.log(`One document was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
}

async function updateAllListingsToHavePropertyType(client){
    const result=await client.db(dbn).collection(coll).updateMany({
        property_type:{$exists:false}
    },
    {
        $set:{property_type:"Unknown"}
    }
    )
    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);

}

async function deleteListingByName(client,nameOfListing){
    const result=await client.db(dbn).collection(coll).deleteOne({
        name:nameOfListing
    })
    console.log(`${result.deletedCount} document(s) was/were deleted`);
}

async function deleteListingScrapedBeforeDate(client,date){
    const result=await client.db(dbn).collection(coll).deleteMany({
        "last_scraped":{$lt:date}
    });
    console.log(`${result.deletedCount} document(s) was/were deleted`);

}