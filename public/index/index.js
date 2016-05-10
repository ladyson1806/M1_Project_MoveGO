/***
* JAVASCRIPT CODE FOR ANNOT_GENES INDEX
* Author : Savandara BESSE
* Created : 2014/04/05
***/

/*Add other buttons to run a visualization -not used-*/
var res;
function add_Browse(id) {
	var element = document.getElementById(id); 
	var html = "<br>"
	html += "<form 	id = 'uploadForm'"
	html += "enctype = 'multipart/form-data'"
    html += "action = '/treemap_vis'"
    html += "method = 'post'>"
			
	html += "<p align =\"center\">" 
	html += "<br>"
	html += "ADD YOUR FILE .CSV HERE :<br><br>"
	html += "<input type=\"file\" value=\"Browse...\" name=\"file_name\">"
	html += "</p>"	

	element.innerHTML = html;
}

function howMany_Files() {

	var res = parseInt(prompt("How many files would add ? Max 3."))
	
	switch (res) {
		case 1 : 
			var id_1 = "upload_plus_one";
			add_Browse(id_1);
			break;
		case 2 :
			var id_1 = "upload_plus_one"
			add_Browse(id_1);
			var id_2 = "upload_plus_two";
			add_Browse(id_2);
			break;
		case 3 : 
			var id_1 = "upload_plus_one"
			add_Browse(id_1);
			var id_2 = "upload_plus_two";
			add_Browse(id_2);
			var id_3 = "upload_plus_three";
			add_Browse(id_3);
			break;
		case 4 :
			alert("You can't add more files ! ")
		default :
			console.log("Don't write any number.")
		}
}

/*Mail display*/

function Mail_display() {
	var element = document.getElementById("Mail"); 
	var html = "<ul>";
	html += '<li><a href="mailto:baba.baro@etu.u-bordeaux.fr">baba.baro@etu.u-bordeaux.fr</a></li>';
	html += '<li><a href="mailto:savandara.besse@etu.u-bordeaux.fr">savandara.besse@etu.u-bordeaux.fr</a></li>';
	html += '<li><a href="mailto:kristina.kastano@etu.u-bordeaux.fr">kristina.kastano@etu.u-bordeaux.fr</a></li>';
	html += '<li><a href="mailto:alexia.souvane@etu.u-bordeaux.fr">alexia.souvane@etu.u-bordeaux.fr</a></li>';
	html += "</ul>";
	element.innerHTML = html;
}
	
