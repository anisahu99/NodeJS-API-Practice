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
let courses;
async function createCourse(obj){
    const course=new Course(obj);
    result=await course.save();
}
async function createAuthor(obj){
    const author=new Author(obj);
    result=await author.save();
    console.log(result);
}

async function listCourses(){
    courses=await Course
    .find()
    .populate('author','name -_id')// -_id is for exclude the id 
    .select('name author');
    //console.log(result);

}
app.get('/',(req,res)=>{
    listCourses();
    res.send(courses);
})
app.listen(9000,()=>{
    console.log("listen on 9000");
});