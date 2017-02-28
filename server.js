var express=require('express');
var path =require('path');
var bodyParser= require('body-parser');

var app=express();

var index=require('./routes/index.js');
var todos=require('./routes/todos.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

//view Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'client')));

app.use(function(req, res, next) { 
    res.setHeader('Access-Control-Allow-Origin', '*');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');    
    next();
});

app.use('/',index);
app.use('/api/v1/',todos);

app.listen(2112,function(){
console.log("server started on port 2112");
});
