const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
async function connection(){
    await mongoose.connect("mongodb+srv://demo:animesh@mycluster.ggjh5mw.mongodb.net/Courses?retryWrites=true&w=majority")
    console.log("conected");
}
connection();
const authorSchema=new mongoose.Schema({
    name:String,
    bio:String,
    website:String
})
const Author=mongoose.model('Author',authorSchema);

const Course=mongoose.model('Course',new mongoose.Schema({
    name: String,
    author:authorSchema
}));
let courses;
let author;
let result;
async function createCourse(obj){
    const courses=new Course(obj);
    result=await courses.save();
}
async function createAuthor(Author_Object){
    author=new Author(Author_Object);
}
async function updateAuthor(courseId,name){
    const course=await Course.findById(courseId);
    course.author.name=name;
    await course.save();

}
app.get('/',(req,res)=>{
    res.send();
})
app.put('/',(req,res)=>{
    const id=req.body[0];
    const name=req.body[1];
    console.log(id + name);
    updateAuthor(id,name);
    res.send();
})

app.listen(9000,()=>{
    console.log("listen on 9000");
});