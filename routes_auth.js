const config=require('config');
const _=require('lodash');
const Joi=require('joi');
const bcrypt=require('bcrypt');
const {User}=require('./Users.js');//here we make new validate function for email and password;
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken');

router.post('/',async(req,res)=>{
    // const {error}=validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or passworD.');
   const validPassword= await bcrypt.compare(req.body.password,user.password);//to compare saved password and request password.
   if(!validPassword) return res.status(400).send('Invalid email or password.');
   const token=user.generateAuthToken();
   //const token=jwt.sign({_id:user.id},config.get('jwPrivateKey'));//this private we will import from environment variable:
//                                               pass- the name of application setting
   res.send(token);
    
});


function validate(req){
    const schema={
        email:Joi.string.min(5).max(255).required().email(),
        password:Joi.string().min(5).max(255).required()
    }
    return Joi.validate(req,schema);
}



module.exports=router;
//  /api/users

/*
const users=require('./routes_auth');
const app=express();
app.use(express.json());
app.use('/api/auth',auth);
*/