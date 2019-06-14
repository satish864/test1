var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/phoneDetails');

var mobileSchema = new mongoose.Schema({
    mobile_name: String,
    weight: String,
    battery_capacity: Number,
    screen_size: Number,
    ram: Number,
    internal_storage: Number
 });
 var phone = mongoose.model('phone', mobileSchema);

//  // root
 app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/public/phone.html'));
 });

 app.post('/phone', function(req, res){
     var myData = new phone(req.body);
     myData.save();
     res.send("model_uploaded");

 });

 app.get('/show', function(req, res){
    res.sendFile(path.join(__dirname, '/public/modelsearch.html'));
    
 });

 app.post('/details',function(req, res){
   console.log(req.body.Mobile_name);
    phone.find({mobile_name: req.body.Mobile_name}, function(err, response){
       if(err) throw err;
       res.json(response);
       
    });
});

 app.listen(3000);

