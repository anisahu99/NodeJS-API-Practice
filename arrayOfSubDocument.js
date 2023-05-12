const express=require('express');
const app=express();
const mongoose=require('mongoose');
app.use(express.json());
async function connection(){
    await mongoose.connect("mongodb+srv://demo:animesh@mycluster.ggjh5mw.mongodb.net/Courses?retryWrites=true&w=majority");
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
    authors:[authorSchema]
}));
//  let courses;
// let author;
// let result;
async function createCourse(name,authors){
    const courses=new Course({
        name,
        authors
    });
    result=await courses.save();
}
async function createAuthor(Author_Object){
    author=new Author(Author_Object);
}

async function addAuthor(courseId,author){
    const course=await Course.findById(courseId);
    course.authors.push(author);
    course.save();


}

async function removeAuthor(courseId,authorId){
    const course=await Course.findById(courseId);
    const author=course.authors.id(authorId);
    author.remove();
    course.save();
}

// createCourse('Backend Course',[
//     new Author({name:'Gosh'}),
//     new Author({name:'Rahul'})
// ])
// addAuthor('63dac111e84e46298a7abd70',new Author({name:'Amy'}));
removeAuthor('63dac111e84e46298a7abd70','63dac43a887586a9e7d6257b');

