var requests = require("requests");
const http = require('http');
const fs = require('fs');
const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal=(tempVal,orgVal)=>{
    let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature=temperature.replace("{%tempmax%}",orgVal.main.max);
    temperature=temperature.replace("{%location%}",orgVal.name);
    temperature=temperature.replace("{%country%}",orgVal.sys.country);
    temperature=temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
    //console.log(temperature);
    return temperature;
}
const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("https://api.openweathermap.org/data/2.5/weather?q=Bhopal&appid=39f2ab3561e2a145c91d0b2c62eb43fc")//
            .on('data', function (chunk) {
                const objdata=JSON.parse(chunk);
                const arrData=[objdata];
                // const result=arrData[0].main.temp;
                // console.log(arrData);//array of object
                // console.log(result);
                const realTimeData=arrData
                .map((val)=>replaceVal(homeFile,val))
                .join("");
                 res.write(realTimeData);
            }) 
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);

                //console.log('end');
                res.end();
            });
    }else{
        res.end("File Not Found.");
    }
});
server.listen(8000);
