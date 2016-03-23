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
var script  = require('./ON_SERVER/scripts/scripts'); // Our own module with our scripts


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
    callback(null, file.fieldname + '-' + Date.now());
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
app.use(express.static(__dirname+"/index"));



// After submission, file is uploaded (return an error if file not well uploaded)
// and execute file conversion. Then launch treemap visualisation from the converted file
app.post('/treemap_vis',function(req,res){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }

        // Convert csv file into JS objet
        var tmp_obj = script.objecting_csv(req.file.path);
        script.write(JSON.stringify(tmp_obj));

        // Transform the JS object containing clusters into a JS objects containing all information
        var final_object = script.make_final_obj(tmp_obj);


        res.end("Good job!");

        // Tranform received file into JSON mixed with MongoDataBase data
        //var content = fs.readFileSync("test.js", "UTF-8");
    });
});


//var content = fs.readFileSync("ON_SERVER/scripts/convert_upload_to_json.js", "UTF-8");
//vm.runInThisContext(content);


// Create server
app.listen(3000, function () {
  console.log('listening on port 3000!');
});
