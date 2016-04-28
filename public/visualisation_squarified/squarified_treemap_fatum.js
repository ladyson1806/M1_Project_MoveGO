/*
 * Treemap Squared 0.5 - Treemap Charting library 
 *
 * https://github.com/imranghory/treemap-squared/
 *
 * Copyright (c) 2012 Imran Ghory (imranghory@gmail.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */

 /* Hints for JSHint */ 
 /*global Raphael, Treemap */ 

var marks = [];
var T_SIZE = 10; //taille du texte des labels
var labelList = [];
var colors = [[255, 102, 102],[255, 178, 102], [153, 255, 255], [153, 153, 255], [153, 255, 102], [255, 153, 204], [255, 255, 102]];
var colorIndex = 0;

// some utility functions 
function isArray(arr) {
    return arr && arr.constructor === Array; 
}

// drawTreemap - recursively iterate through the nested array of boxes
//               and call the styles['draw'] method on them
function drawTreemap(boxes, labels, index) {
    var i,j;
    var newindex; // the index to the next box to draw
    var label; // label of current box
    
    if(isArray(boxes[0][0])) {	
        for(i=0; i<boxes.length; i++) {
	    if (index != undefined )
		newindex = index.slice();
	    else
		newindex = [];
            newindex.push(i);
            drawTreemap(boxes[i],labels, newindex);	    
	    colorIndex++;
	    if (colorIndex == 7)
		colorIndex = 0;
	}
	
    } else {
        for(i=0; i<boxes.length; i++) {
	    if (index != undefined )
		newindex = index.slice();
	    else
		newindex = [];
            newindex.push(i);
	    
            // figure out the matching label using the index 
            label = labels;
            for(j=0; j<newindex.length; j++){
                label = label[newindex[j]];
            }
                    
            // draw box & label
	    drawBox(boxes[i], label);
	   
        }
    }
}

function drawBox(coordinates, label) {
    var x0=coordinates[0], y0=coordinates[1], x1=coordinates[2], y1=coordinates[3];
    var mark = window.fatum.addMark();
    marks[mark.id()] = mark;
    mark.clippingStart(0).clippingStop(0);
    mark.internalClipping(0);
    mark.shape(Fatum.Shape.SQUARE);
    mark.borderColor(0, 0, 0, 255);
    mark.borderWidth(1);
    mark.x((x0 + x1)/2).y((y0 + y1) / 2); 
    var w = (x1 - x0);
    var h = (y1 - y0);
    mark.width(w).height(h);
    colorBox(mark);
    createLabel(label, mark, y0, y1);
}

function colorBox(mark){
    mark.color(colors[colorIndex][0], colors[colorIndex][1], colors[colorIndex][2], 255);
}

function createLabel(name, mark, y0, y1, m){
    //creation d'un label (texte) pour chaque terme
    var r = 0; //rotation du label, par defaut la disposition est orizontale
    var rectCenterX = mark.x();
    var rectCenterY = mark.y();
    var w = mark.width();
    var h = mark.height();
    var label;
    
    //affichage d'informations supplementaires pour le rectangle choisi
    /*  if ((m != undefined ) && ( elem.markt.id() == m.id())){
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
	
	label = window.fatum.addText().textColor(0,0,200,200).size(T_SIZE).
	    text(elem.term).x(rectCenterX).y(y0+3*T_SIZE).rotation(r); 
	labelList.push(label);
	label = window.fatum.addText().textColor(0,0,200,200).size(T_SIZE)
	    .text("ICnuno "+elem.ICnuno).x(rectCenterX).y(y0+2*T_SIZE).rotation(r); 
	    labelList.push(label);
	label = window.fatum.addText().textColor(0,0,200,200).size(T_SIZE)
	    .text("ICzhou "+elem.ICzhou).x(rectCenterX).y(y0+T_SIZE).rotation(r); 
	labelList.push(label);
	return;
	}
    
    */
    	//Affichage nom pour le reste de rectangles
	//Si la chaine entière peut entrer horizontalement ou verticalement dans le rectangle
	//if ((w >= (name.length*T_SIZE/2) ||  h >= (name.length*T_SIZE/2)) && (w>T_SIZE && h>T_SIZE) ){
    //Si la chaine peut entrer verticalement seulement
    if (w < (name.length*T_SIZE/2) && h >= (name.length*T_SIZE/2))
	r = 1.57; //rotation de 90° (en radians)
    label = window.fatum.addText().textColor(0,0,200,255).size(T_SIZE).text(name).x(rectCenterX).y(rectCenterY).rotation(r); 
    labelList.push(label);
	//Autrement : separation de la chaîne de charactères
	/*else {
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
	}*/
}

var treeInteractor = function (e) {
    var rect = canvas.getBoundingClientRect();  
    var pickX = e.clientX - rect.left;
    var pickY = e.clientY - rect.top; //modifié
    var m = window.fatum.pick(pickX, pickY);  
    if(!m) return;
    //changeSize(data, 8); // s * k = G / 2
    //recSum(data);
    //changeColor(data, true);
    //changeColor(markRev[m.id()], false);
    //changeSize(markRev[m.id()], data.size / (markRev[m.id()].size * 2));
    //recSum(data);
    //updateMarks(m);
    window.fatum.animate(500);
}

var canvas = document.getElementById('example');
var initVis = function () {
    // generate our treemap from our data
    var nodes = Treemap.generate(data, 1800 ,750);
    // create our canvas
    window.fatum = Fatum.createFatumContext(canvas);
    Fatum.setRenderingObserver(fatum);
    canvas.onclick = treeInteractor;
    fatum.layerOn(Fatum.MARKS | Fatum.TEXT);
    // draw the generated treemap
    drawTreemap(nodes, labels);
    fatum.swap();
    fatum.center();
    fatum.camera().swap();
};

Fatum.addInitListener(initVis);



