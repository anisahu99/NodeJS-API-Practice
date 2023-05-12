const express=require('express');
const path=require('path');
const app=express();

app.set('view engine','ejs');

//console.log(app);
app.get('/',(req,res)=>{
    res.render('index.ejs');
});
app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname, '/page.html'));
});
app.listen(3000,()=>{
console.log("listening on port 3000");
});