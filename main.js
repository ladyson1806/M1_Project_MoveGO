/*
* Title : Annotation dynamic treemap server
* Author : Alexia
* Date : 03/19/2016
*/


// Insert required modules 
var express = require("express");   // to create web server
var path    = require("path");      // to send html file to front-end
var multer  = require('multer');    // to upload file
var fs      = require("fs");        // to read/write in file
var archiver= require("archiver");  // to dowload .zip
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

{ 
  fieldname: 'file_name',
  originalname: 'clusters',
  encoding: '7bit',
  mimetype: 'application/octet-stream',
  destination: './uploads',
  filename: 'file_name-1458738794393',
  path: 'uploads/file_name-1458738794393',
  size: 1075 
}

We can access all these data through "req.files.size" for example

*/


// Routage
app.use('/', express.static(__dirname+"/public/index"));
app.use('/treemap_vis', express.static(__dirname+"/public/visualisation"));
app.use('/runExample', express.static(__dirname+"/public/Example"));
app.get('/export', function(req,res){


    // Helped with https://www.npmjs.com/package/archiver

    var archive = archiver('zip');


    archive.on('error', function(err) {
        res.status(500).send({error: err.message});
    });

    //on stream closed we can end the request
    res.on('close', function() {
        console.log('Archive wrote %d bytes', archive.pointer());
        return res.status(200).send('OK').end();
    });
    
    //set the archive name
    res.attachment('treemap_visualisation.zip');
    
    archive.pipe(res);
    archive.append(fs.createReadStream('public/visualisation/data.js'), {name:'treemap_visualisation/data.js'});
    archive.append(fs.createReadStream('public/visualisation/fatum.data'), {name:'treemap_visualisation/fatum.data'});
    archive.append(fs.createReadStream('public/visualisation/fatum.js'), {name:'treemap_visualisation/fatum.js'});
    archive.append(fs.createReadStream('public/visualisation/fatum.js.mem'), {name:'treemap_visualisation/fatum.js.mem'});
    archive.append(fs.createReadStream('public/visualisation/index.html'), {name:'treemap_visualisation/visualisation.html'});
    archive.append(fs.createReadStream('public/visualisation/tree_visu.js'), {name:'treemap_visualisation/tree_visu.js'});
    archive.append(fs.createReadStream('public/visualisation/index.css'), {name:'treemap_visualisation/index.css'});

    archive.finalize();
});



// After submission, file is uploaded (return an error if file was not well uploaded)
// and execute file conversion. Then launch treemap visualisation with the converted file.
app.post('/',function(req,res,next){
    upload(req,res,function(err) {
        if(err) {
            return res.end("Error uploading file.");
        }
    
      // Convert csv file into JS objet
      var result = script.objecting_csv(req.file.path);
      var tmp_clust_obj = result[0];
      var tmp_gene_obj = result[1];     


      // Transform the JS object containing clusters into a JS objects containing all data
      var data = script.convert_to_treemap_format(tmp_clust_obj,tmp_gene_obj);
      // Write data onto file (to be reused by FATUM library)
      script.write('var data = '+JSON.stringify(data), 'public/visualisation/data.js');

      res.redirect('/treemap_vis');

    }) 

});


app.post('/runExample',function(req,res,next){

  res.redirect('/runExample');
});

// Create server
app.listen(3000, function () {
  console.log('listening on port 3000!');
});
