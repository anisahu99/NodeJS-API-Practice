var http = require('http');
const requests = require('requests');
http.createServer(function (req, res) {
    let data=requests('https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=39f2ab3561e2a145c91d0b2c62eb43fc', null,null, function (err, data, result) {
       if (err) {
         console.log(err);
       } else {
         console.log(data)
         res.write(data);
         return data;
       }
     });
res.writeHead(200, {'Content-Type': 'text/html'});
res.write(data);
res.end();
}).listen(3000);
