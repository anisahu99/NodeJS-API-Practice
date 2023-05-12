const express=require('express');
const app=express();
const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://demo:animesh@mycluster.ggjh5mw.mongodb.net/MyCourse?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected");
});
const CourseSchema=new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type:Date,default:Date.now},
    is_Published:Boolean
})

const Course=mongoose.model('NewCourse',CourseSchema);
app.use(express.json());
var result;
async function call(object){
    result=await object.save();
    //console.log(result);
}
//call();
app.get('/',(req,res)=>{
    res.send();
})
app.post('/',(req,res)=>{
    const obj=req.body;
    const object=new Course(obj);
    call(object);
    res.send(result);
})
app.listen(8000,()=>{
    console.log("listen on 8000");
});