const Joi=require('joi');
const jwt=require('jsonwebtoken');
const config=require('config');
const mongoose=require('mongoose');
const passwordComplexity = require("joi-password-complexity");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true

    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
        lowerCase: 1,
        upperCase: 1,
        numeric: 1,
        symbol: 1,
        requirementCount: 4,
    },
    isAdmin:Boolean
})
const User=new mongoose.model('Users',userSchema);
userSchema.method.generateAuthToken()=function(){
    const token=jwt.sign({_id:this.id,isAdmin:this.isAdmin},config.get('jwPrivateKey'));
    return token;
}
// function validateUser(user){
//     const schema={
//         name:Joi.String.minlength(5).maxlength(50).required(),
//         email:Joi.String.minlength(5).maxlength(255).required().email(),
//         password:Joi.String.minlength(5).maxlength(1024).required()
//         //password:passwordComplexity().validate();//something is wrong .

//     };
//     return Joi.validate(user,schema);
// }
exports.User=User;
// exports.validate=validateUser;