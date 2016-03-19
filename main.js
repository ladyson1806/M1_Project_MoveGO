/*
* Title : Annotation dynamic treemap
* Author : Alexia
* Date : 03/19/2016
*/


// Used tutorial from https://codeforgeek.com/2015/01/render-html-file-expressjs/

/*
ExpressJS allows you to develop custom web server according to your need. 
You don’t need to install multiple packages to handle HTML files. 
*/
// Insert modules "express" and "path"
var express = require("express");
var path    = require("path");


// Instanciate an object express named "app"
var app = express(); 



// Insert html page 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});


// Create server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

