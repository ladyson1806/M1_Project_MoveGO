// Module for files handling
var fs = require("fs");



/* Convert our CSV file to Javascript object

Convert a csv file stuctured like this:

title1;element1;element2
title2;element1
title3;element1;element2;element3

To a json object structured like this:

{ 
  "title1": [ "element1" , "element2" ],
  "title2": [ "element1" ],
  "title3": [ "element1" , "element2" , "element3"]
}
*/
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


// Parse a JSON file and make a JS object of it
var parser = function(file_path)
{
  var file_content = fs.readFileSync(file_path, "UTF-8");
  return JSON.parse(file_content);
}



var final_json_object = function(cluster_obj)
{

  var final_obj = {};

/*
  var ancestor_obj = parser("./ON_SERVER/JSON_files/ancestor.json");
  var children_obj = parser("./ON_SERVER/JSON_files/children.json");
  var descendant_obj = parser("./ON_SERVER/JSON_files/descendants.json");
  var parent_obj = parser("./ON_SERVER/JSON_files/parents.json");
  var info_obj = parser("./ON_SERVER/JSON_files/info_sur_term_.json");
*/


  var ancestor_obj = parser("./ON_SERVER/JSON_simple_samples/ancestor_bis.json");
  var children_obj = parser("./ON_SERVER/JSON_simple_samples/children_bis.json");
  var descendant_obj = parser("./ON_SERVER/JSON_simple_samples/descendants_bis.json");
  var parent_obj = parser("./ON_SERVER/JSON_simple_samples/parents_bis.json");
  var info_obj = parser("./ON_SERVER/JSON_simple_samples/info_sur_term_bis.json");

  for(var cluster_nb in cluster_obj) // cluster_nb contains "cluster_1", "cluster_2"...
  {

    if(cluster_nb != "")
    {
      var tmp_obj = {}

      for(var i= 0; i < cluster_obj[cluster_nb].length; i++)
      {

        var term = cluster_obj[cluster_nb][i];  // term contains terms names
        if(term != "")
        {
      console.log(info_obj[term]);

          tmp_obj[ info_obj[term].ID ]  =  { 
                                                "name " : cluster_obj[cluster_nb][i],
                                                "ICnuno" : info_obj[term].ICNuno,
                                                "ICzhou" : info_obj[term].ICZhou,
                                                "depth" : info_obj[term].depth
                                           }

        // RAJOUTER PARENT/DESCENDANT !!!

        }
      }
    
    final_obj[cluster_nb] = tmp_obj;
    }
  }

  //console.log(final_obj);

  return final_obj;
}

exports.objecting_csv = objecting_csv;
exports.write = write_JSON_on_file;
exports.make_final_obj = final_json_object;
