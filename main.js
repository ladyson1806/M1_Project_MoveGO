/*
* Title : Annotation dynamic treemap 
* Author : Alexia
* Date : 03/19/2016
*/


// Used tutorial from https://codeforgeek.com/2015/01/render-html-file-expressjs/ to insert file.html
// Used tutorial from https://codeforgeek.com/2014/11/file-uploads-using-node-js/ to upload user file
// Used tutorial from https://www.terlici.com/2015/05/16/uploading-files-locally.html

// Insert required modules 
var express = require("express");   // to create web server
var path    = require("path");      // to send html file to front-end
var multer  = require('multer');    // to upload file
var fs      = require("fs");        // to read/write in file
var script  = require('./ON_SERVER/scripts/data_creation.js'); // Our own module with our scripts




// Instanciate an object express named "app"
var app = express(); 



/*
We have made custom middle-ware function to choose the storage engine 
which is Disk because we want files to store in disk 
and appending the file name with current date just to keep the uniqueness of files.
*/

var storage =   multer.diskStorage({
  // Put input file into uploads folder
  destination: function (req, file, callback) {
    callback(null, './ON_SERVER/uploads');
  },
  // Get file name and date of input file 
  filename: function (req, file, callback) {
    callback(null, 'cluster-' + Date.now());
  }
});
var upload = multer({ storage : storage}).single('file_name');

/* Structure we got after upload

{ fieldname: 'file_name',
  originalname: 'clusters',
  encoding: '7bit',
  mimetype: 'application/octet-stream',
  destination: './uploads',
  filename: 'file_name-1458738794393',
  path: 'uploads/file_name-1458738794393',
  size: 1075 }

We can access all these data through "req.files.size" for example

*/


// Root page
app.use(express.static(__dirname+"/public/index"));
app.use('/treemap_vis', express.static(__dirname+"/public/visualisation"));




// After submission, file is uploaded (return an error if file not well uploaded)
// and execute file conversion. Then launch treemap visualisation with the converted file
app.post('/',function(req,res,next){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
    
      // Convert csv file into JS objet
      var tmp_obj = script.objecting_csv(req.file.path);
      script.write(JSON.stringify(tmp_obj), req.file.fieldname+'.json');


      // Transform the JS object containing clusters into a JS objects containing all information
      var data = script.convert_to_treemap_format(tmp_obj);
      //script.write('var data = '+JSON.stringify(data), 'ON_SERVER/data/data.js');

      res.redirect('/treemap_vis');

    }) 

  });


app.use('/treemap_vis', express.static(__dirname+"/public/visualisation"));





// Create server
app.listen(3000, function () {
  console.log('listening on port 3000!');
});
