const config=require('config');
const jwt=require('jsonwebtoken');
const Joi=require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const users=require('./routes_users.js');
const auth=require('./routes_auth.js');
const express=require('express');
const app=express();
mongoose.connect('mongodb+srv://demo:animesh@mycluster.ggjh5mw.mongodb.net/Users?retryWrites=true&w=majority')
.then(()=> console.log("Connected To MongoDB"))
.catch(err=>console.log('Could not Connect'));

if(!config.get('jwtPrivateKey')){
console.error('Fatal Error:jwtPrivateKey is not defined.')
process.exit(1);//
}

app.use(express.json());
app.use('/api/auth',auth);
app.use('/api/users',users);
app.listen(7000);

// const auth=require('./middleware');
// const router = require('./routes_users.js');
// router.post('/',auth,async(req,res)=>{
//     const {error} =validate(req.body);
//     if(error) return res.status(400).send(error.details[0].message);

//     let genre=new Genre({name:req.body.name});
//     genre=await genre.save();


//     res.send(genre);
// })