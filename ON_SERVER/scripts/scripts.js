/* Convert our CSV file to JSON file

Convert a csv file stuctured like this:

title1;element1;element2
title2;element1
title3;element1;element2;element3

To a json file structured like this:

{ 
  "title1": [ "element1" , "element2" ],
  "title2": [ "element1" ],
  "title3": [ "element1" , "element2" , "element3"]
}
*/


// Module for files handling
var fs = require("fs");



// Convert .csv file into a Javascript object
var objecting_csv = function (file_path) 
{

  var file_content = fs.readFileSync(file_path, "UTF-8");

  var lines = file_content.split("\n"); // Obtaining lines = [line1 , line2 , ... , linen]
  var result = {};


  for (var i = 0 ; i < lines.length ; i++)
  {
    var currentline = lines[i].split(";"); // Obtaining currentline = [GO1 , GO2 , ... , GOn ]
    var associated_GO = [] ;

    for (var j = 1 ; j < currentline.length ; j++ )
    {
      associated_GO.push(currentline[j]) ;
    }

    result[ [currentline[0]] ] = associated_GO ;

  }
return result // Return the object obtain from the csv file 
}


var stringify_obj = function(obj)
{
  return JSON.stringify(obj); //Return a string of the object
}


// Write JSON string into a file.json
var write_JSON_on_file = function (JSON_string)
{ 
  fs.writeFile('./ok.json', JSON_string,  function(err) {
     if (err) {
         return console.error(err);
     }
     console.log("Data written successfully!");
  });
}


exports.objecting_csv = objecting_csv;
exports.stringify_obj = stringify_obj;
exports.write = write_JSON_on_file;



// Read JSON file
/*
fs.readFile('../../Fichiers_JSON/descendants.json', function (err, data) {
        if (err) {
           return console.error(err);
        }
        console.log("Asynchronous read: " + data.toString());
     });
*/

