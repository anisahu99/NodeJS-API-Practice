const http=require('http');
const obj=require('./data.js');
const host='localhost';
const port=5500;
const requestListner=function (req,res){
    res.writeHead(200,{'Content-Type':'application\json'});//200 code means 'ok'
    res.write(JSON.stringify(obj));
    res.end();
}
const server=http.createServer(requestListner);
server.listen(port,host,()=>{
    console.log(`Server is running on http://${host}:${port}`);
});