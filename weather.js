var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
var mysql = require('mysql');
var session = require('express-session');
var path = require('path');






var modules = require('./lib/modules.js');
var get_weather = require('./framework/get_weather.js');
var articles = require('./framework/ny_times.js');


var app = express();



app.use(express.static(__dirname + '/style'));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/public')); 




app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3001);


app.get('/', function(req, res) {
 res.render('home', {
    // pictures: modules.getunopics()
 });
});
app.get('/about', function(req, res) {
    res.render('about', {
        aboutme: modules.getabout(),
        skills: modules.getskills()
    });
});
app.get('/support', function(req, res) {
    res.render('support', {
    });
});

app.get('/nytimes', function(req, res) {
    articles.GetArticles(function(data){
        res.render('nytimes', {
            title1 : data[0],
            title2 : data[1],
            title3 : data[2],
    });
        
    });
});

app.post('/getweather', function(req, res) {
    var address = req.body.city;
    get_weather.get_loc(address, function(err, data){
        //console.log(err);
        if(err === "error"){
           //console.log("Error");
            res.redirect('505');
        }else{ 
            //console.log("Hello");
            res.render('home', {
                summary : data[0],
                temp : data[1],
                chance : data[2]
            });
        }
     })
});


app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
app.use(function(err, req, res, next){
   console.log(err.stack);
    res.status(500);
    res.render('505');
});

app.listen(app.get('port'), function(){
 console.log('Weather App is Running on Port 3001')   
});

