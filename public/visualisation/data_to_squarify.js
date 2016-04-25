
function dataSizes(elem, sizesArray, labels){
    if (elem.children != undefined && elem.children[0].size != undefined){
	childrenSizes = [];
	childrenLabels = [];	
	for (var i in elem.children) {
	    childrenSizes.push(elem.children[i].size);
	    childrenLabels.push(elem.children[i].name);
	}
	sizesArray.push(childrenSizes);
	labels.push(childrenLabels);
    }
    
    else if (elem.children != undefined){
	for (var i in elem.children) {
	    dataSizes(elem.children[i], sizesArray, labels);
	}
    }
}

var data = new Array;
var labels = new Array;
dataSizes(originalData, data, labels);
