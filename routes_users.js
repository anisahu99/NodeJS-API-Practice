const config=require('config');
const auth=require('./middleware/auth');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt=require('bcrypt');
const {User}=require('./Users.js');
// const {User,validate}=require('./Users.js');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get('/me',auth,async(req,res)=>{
 const user=await User.findById(req.user._id).select('-password');//for exclude the password
 res.send(user);
})

router.post('/',async(req,res)=>{
    // const {error}=validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registered.');
    user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const salt=await bcrypt.genSalt(10);
    const hashed_password=await bcrypt.hash(user.password,salt);
    user.password=hashed_password;
    //user =new User(_.pick(req.body,['name','email','password']));
    await user.save();
    const token=jwt.sign({_id:user.id},config.get('jwPrivateKey'));
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
});

module.exports=router;
//  /api/users

/*
const users=require('./routes_users');
const app=express();
app.use('/api/users',users);
*/