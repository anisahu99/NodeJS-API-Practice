const express=require('express');
const path=require('path');
const app=express();
//console.log(app);
app.get('/',(req,res)=>{
    let data=req.params;
    res.sendFile(path.join(__dirname, '/page.html'));
});
app.listen(5000,()=>{
console.log("listening on port 5000");
});