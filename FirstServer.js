const a=require('./a.js');//import
const http=require('http');
const path=require('path');
const host='localhost';
const port=8000;
var res=a.add(3,5);
console.log(`${res}`);
console.log(__dirname);
const dirPath=path.join(__dirname,'files');
console.log(dirPath);

const requestListner=function (req,res){
    res.writeHead(200);//200 code means 'ok'
    res.write("Hi");
    res.end();
}
const server=http.createServer(requestListner);
server.listen(port,host,()=>{
    console.log(`Server is running on http://${host}:${port}`);
});