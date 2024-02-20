const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/" , function(req,res){
    
const query = req.body.country;
const apiKey = "4e6e0f33bcae5c9422c8b723760e9367";
var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&appid=" + apiKey +"&units=metric";
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData = JSON.parse(data) ;
        const temp = weatherData.main.temp ;
        const des = weatherData.weather[0].description ;
        const icon = weatherData.weather[0].icon;
        const imgurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png" ;
        res.write("<h1>this is " + query +" temp" + " " + temp + "yolo </h1>" + "<h1>this is description" + " " + des + "</h1>");
        res.write("<img src=" + imgurl + ">");
        res.send();
    })
});

});




app.listen(3000,function() {
    console.log("this server run in port 3000");
})