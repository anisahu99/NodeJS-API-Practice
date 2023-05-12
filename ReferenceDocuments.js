const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
async function connection(){
    await mongoose.connect("mongodb+srv://demo:animesh@mycluster.ggjh5mw.mongodb.net/Courses?retryWrites=true&w=majority")
    console.log("conected");
}
connection();
const Author=mongoose.model('Author',new mongoose.Schema({
    name:String,
    bio:String,
    website:String
}));

const Course=mongoose.model('Course',new mongoose.Schema({
    name: String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author'
    }
}));
var result;
async function createCourse(obj){
    const course=new Course(obj);
    result=await course.save();
}
async function createAuthor(obj){
    const author=new Author(obj);
    result=await author.save();
    console.log(result);
}
app.get('/',(req,res)=>{
    res.send();
})
app.post('/',(req,res)=>{
    const name=req.body[0];
    const obj=req.body[1];
    console.log(name);
    console.log(obj);
    if(name=='Course'){
        createCourse(obj);
    }
    else{
        createAuthor(obj);
    }
    
    console.log(result);
    res.send(result);
})
app.listen(9000,()=>{
    console.log("listen on 9000");
});