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
var write_on_file = function (JSON_string,name)
{ 
  fs.writeFile('./'+name, JSON_string,  function(err) {
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



var convert_to_treemap_format = function(clusters_obj)
{

  /*

  Example of clusters_obj structure:

  { 

    "Cluster_1":

          [  
             "cyanuric acid metabolic process",
             "nylon metabolic process",
             "aerobic gallate catabolic process",
          ],
    
    "Cluster_2":
          [
              "quinate biosynthetic process",
              "methylmercury catabolic process",
          ]
  }

  */

  var final_obj = { 
                      'name' : 'data',
                  };

  var children_list = [];  // Children is employed for treemap construction
                           // and does not refer to children of terms 
                  



  var ancestor_obj = parser("./ON_SERVER/JSON_files/ancestor.json");
  var children_obj = parser("./ON_SERVER/JSON_files/children.json");
  var descendant_obj = parser("./ON_SERVER/JSON_files/descendants.json");
  var parent_obj = parser("./ON_SERVER/JSON_files/parents.json");
  var gene_obj = parser("./ON_SERVER/JSON_files/gene.json");
  var info_obj = parser("./ON_SERVER/JSON_files/info_sur_term_.json");


/*
  var ancestor_obj = parser("./ON_SERVER/JSON_simple_samples/ancestor_bis.json");
  var children_obj = parser("./ON_SERVER/JSON_simple_samples/children_bis.json");
  var descendant_obj = parser("./ON_SERVER/JSON_simple_samples/descendants_bis.json");
  var parent_obj = parser("./ON_SERVER/JSON_simple_samples/parents_bis.json");
  var gene_obj = parser("./ON_SERVER/JSON_simple_samples/gene_bis.json");
  var info_obj = parser("./ON_SERVER/JSON_simple_samples/info_sur_term_bis.json");
*/

  for(var cluster_nb in clusters_obj) // cluster_nb contains "cluster_1", "cluster_2"...
  {

    if(cluster_nb != "")
    {

      var tmp_cluster = {
                            'name': cluster_nb
                        };

      var tmp_terms_list = [];


      for(var i= 0; i < clusters_obj[cluster_nb].length; i++) // variable i is a number representating index of each term name of one cluster
      {

        var term = clusters_obj[cluster_nb][i];  // term contains term name with the index i (ex: 'phosphorylation'...)
       
        if(term != "")
        {
          
          var id = info_obj[term].ID;

          var child_list = children_obj[id];
          var parents_list = parent_obj[id];
          var gene_list = gene_obj[id];
          if (gene_list == undefined ) { gene_list = []; }

          var tmp_info_obj  =  { 
                                      "name" : term,
                                      "size" : gene_list.length,
                                      "term" : id,
                                      "ICnuno" : info_obj[term].ICNuno,
                                      "ICzhou" : info_obj[term].ICZhou,
                                      "depth" : info_obj[term].depth,
                                      "parents" : parents_list,
                                      "term_children" : child_list,
                                      "gene" : gene_list
                                };

          tmp_terms_list.push(tmp_info_obj);

        } // end if

      } // end for (term name)

    tmp_cluster['children'] = tmp_terms_list;
    
    children_list.push(tmp_cluster);
      
    } // end if
  
  } // end for (nb cluster)

  final_obj['children'] = children_list;
  //console.log(final_obj);


  return final_obj;
}




// Export to be used by server
exports.objecting_csv = objecting_csv;
exports.write = write_on_file;
exports.convert_to_treemap_format = convert_to_treemap_format;

