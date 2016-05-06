/***********************************************************
* Treemap visualisation - modified part
* Original source : 
* http://www.labri.fr/perso/aperrot/fatum/treedemo/index.html
* Original author : David Auber
* Modifications by : Kristina Kastano
* Last version : 08/04/2016
*********************************************************/

var labelList= new Array;
var T_SIZE = 0.28; //taille du texte des labels

var tmap = function (elem, depth, x0, y0, x1, y1, s, m) {
    if (elem.markt == undefined) {
	elem.markt = window.fatum.addMark();
	markRev[elem.markt.id()] = elem;
	elem.markt.clippingStart(0).clippingStop(0);
	elem.markt.internalClipping(0);
	elem.markt.shape(Fatum.Shape.SQUARE);
	elem.markt.borderColor(0, 0, 0, 255);
	elem.markt.borderWidth(1);
    }
    if (m != undefined && elem.name == 'data'){
	//détection du terme choisi
	findChosenTerm(elem, m);
	document.getElementById("info_array").innerHTML = "";
    }
    
    else if (m != undefined && m.id() == elem.markt.id() && elem.children != undefined) {
	showInfoChosenElement(elem);
    
    }
    var w = (x1 - x0);
    var h = (y1 - y0);
    elem.markt.x((x0 + x1) / 2).y((y0 + y1) / 2);
    elem.markt.width(w).height(h);
    if (w < 0.1 || h < 0.1) {
	elem.markt.borderWidth(1);
	elem.markt.alpha(0);
    }
    else {
	x0 += 0.1;
	x1 -= 0.1;
	y0 += 0.1;
	y1 -= 0.1;
	elem.markt.borderWidth(1);
	elem.markt.alpha(255);
    }
    var dalpha = 0;
    if (s)
	dalpha = (y1 - y0) / elem.size;
    else
	dalpha = (x1 - x0) / elem.size;

    //Presence d'enfants, appel recursif à la fonction
    if (elem.children != undefined){
	for (var i in elem.children) {
	    if (s)
		y1 = y0 + elem.children[i].size * dalpha;
	    else
		x1 = x0 + elem.children[i].size * dalpha;
	   
	    tmap(elem.children[i], depth + 1, x0, y0, x1, y1, !s, m); 
	    if (s)
		y0 = y1;
	    else
		x0 = x1;
	}
    }
    //Pas d'enfants, affichage du label et coloration enfants/parents
    else {
	createLabel(elem, m, y0, y1, w, h);
	colorRelatives(elem, m);
    }
}

function findChosenTerm(elem, m){
    /* Ajoute comme attribut de m le code du terme choisi */
    /* Si on a cliqué sur un cluster ou data, il ajoute rien */
    if (elem.children != undefined && m.id() != elem.markt.id())
	for (var i in elem.children){
	    findChosenTerm(elem.children[i], m);
	}
    else
	if ( elem.markt.id() == m.id() ){
	    m.term = elem.term; 
	}
}

function colorRelatives(elem, m){
    //Colore le terme elem si il est fils ou père du terme représenté par le mark choisi m
    if (m != undefined && m.term != undefined){
	//m.chosenElem est undefined quand on a cliqué sur un cluster ou data
	for (var i in elem.term_children){
	    if ( elem.term_children[i] == m.term ){
		elem.markt.color(51, 153, 255); //bleue, parent
	    }
	}
	for (var j in elem.parents){
	    if ( elem.parents[j] == m.term ){ 
		elem.markt.color(255, 51, 51, 255); //rouge, enfant
	    }
	}
    }
}

function createLabel(elem, m, y0, y1, w, h){
    //creation d'un label (texte) pour chaque terme
    var name = elem.name;
    var label;
    var r = 0; //rotation du label, par defaut la disposition est horizontale
    var rectCenterX = elem.markt.x()
    var rectCenterY = elem.markt.y();	
    
    //si un rectangle a été cliqué
    if ((m != undefined ) && ( elem.markt.id() == m.id())){
    		if ((m != undefined ) && ( elem.markt.id() == m.id())){
	    if (w >= (name.length*T_SIZE/2)){ //si le nom entre horizontalement
		label = window.fatum.addText().textColor(0,0,200,200).size(T_SIZE)
		    .text(name).x(rectCenterX).y(rectCenterY).rotation(r); 
		labelList.push(label);
	    }
	    else { //autrement séparation en mots
		var tmp = name.split(" ");
		for (var i=0; i<tmp.length; i++){
		    var word = tmp[i];
		    label = window.fatum.addText().textColor(0,0,200,200).size(T_SIZE)
			.text(word).x(rectCenterX).y(y1-0.5-i*T_SIZE).rotation(r);
		    labelList.push(label);
		}
	    }

	showInfoChosenElement(elem);
    }
    }
    
    //Affichage du nom de chaque terme
    //Si la chaine entière peut entrer horizontalement ou verticalement dans le rectangle
    else if ((w >= (name.length*T_SIZE/2) ||  h >= (name.length*T_SIZE/2)) && (w>T_SIZE && h>T_SIZE) ){
	//Si la chaine peut entrer verticalement seulement
	if (w < (name.length*T_SIZE/2) && h >= (name.length*T_SIZE/2))
	    r = 1.57; //rotation de 90° (en radians)
		
	label = window.fatum.addText().textColor(0,0,200,200).size(T_SIZE).text(name)
	    .x(rectCenterX).y(rectCenterY).rotation(r); 
	labelList.push(label);
    }	
    
    //Autrement : separation du nom en plusieurs mots
    else {
	var tmp = name.split(" ");
	for (var i=0; i<tmp.length; i++)
	    if (tmp[i].length*T_SIZE/2 > w || tmp[i].length*T_SIZE > h)
		//Si la chaine separée n'entre pas, on ne mets pas le label
		return;
	for (var i=0; i<tmp.length; i++){
	    var word = tmp[i];
	    
	    label = window.fatum.addText().textColor(0,0,200,200).size(T_SIZE).text(word).
		x(rectCenterX).y(y1-0.5-i*T_SIZE).rotation(r);
	    labelList.push(label);
	}
	
    }
}

function clearLabels(){
    for (var i in labelList)
	fatum.deleteText(labelList[i]);
}

function updateMarks(m) {
    clearLabels();
    //elem, depth, x0, y0, x1, y1, s
    tmap(data, 1, - 20, -10, 13, 8, false, m);
}


function showInfoChosenElement(elem) {
	var element = document.getElementById("info_array");
	var html = "<br><br>";
	var table_header = "";
	table_header += '<table align="center">';
	table_header += '<tr>';
	table_header += '<th>Term Name</th>';
	table_header += '<th>GO term</th>';
	table_header += '<th>ICnuno</th>';
	table_header += '<th>ICzhou</th>';
	table_header += '<th>Genes</th>';
	table_header += '</tr>';
	
	
	if (elem.children != undefined) {
		html += '<h3 align="center">'+elem.name+'</h3>';
		html += table_header;
		for ( var i in elem.children) {		
    		html += '<tr>';
			html += '<td>'+elem.children[i].name+'</td>';
			html += '<td>'+elem.children[i].term+'</td>';
			html += '<td>'+Math.round(elem.children[i].ICnuno*100)/100+'</td>';
			html += '<td>'+Math.round(elem.children[i].ICzhou*100)/100+'</td>';
			html += '<td>';
			for (var j in elem.children[i].gene) {
				html += elem.children[i].gene[j];
				if (j != elem.children[i].gene.length - 1)
					html += ", ";
			}
			html += '</td>';
			html += '</tr>';
    	}
    }
	
	else {	
	    html += table_header;
	    html += '<tr>';
	    html += '<td>'+elem.name+'</td>';
	    html += '<td>'+elem.term+'</td>';
	    html += '<td>'+Math.round(elem.ICnuno*100)/100+'</td>';
	    html += '<td>'+Math.round(elem.ICzhou*100)/100+'</td>';
	    html += '<td>';
	    for (var i in elem.gene) {
		html += elem.gene[i];
		if (i != elem.gene.length - 1)
		    html += ", ";
	    }
	    html += '</td>';
	    html += '</tr>';
	}
	
	html += '</table>';
		
	element.innerHTML = html;
}
	

var treeInteractor = function (e) {
    var rect = canvas.getBoundingClientRect();  
    var pickX = e.clientX - rect.left;
    var pickY = e.clientY - rect.top; //modifié
    var m = window.fatum.pick(pickX, pickY);  
    if(!m) return;
    changeSize(data, 1); // s * k = G / 2
    recSum(data);
    changeColor(data, true);
    changeColor(markRev[m.id()], false);
    changeSize(markRev[m.id()], data.size / (markRev[m.id()].size * 7));
    recSum(data);
    updateMarks(m);
    window.fatum.animate(500);
}



var initVis = function () {
  window.fatum = Fatum.createFatumContext(canvas);
  Fatum.setRenderingObserver(fatum);
  canvas.onclick = treeInteractor;
  fatum.layerOn(Fatum.MARKS | Fatum.TEXT);
  recSum(data);
  updateMarks();
  changeColor(data, false);
  fatum.swap();
  fatum.center();
  fatum.camera().swap();
};

Fatum.addInitListener(initVis);
