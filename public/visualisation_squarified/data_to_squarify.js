/*
* Data conversion
* Author : Kristina Kastano
* Data conversion from our format to the format used here :
*     data = [[size1, size2, ...], [size1, size2, size3,...],...]
*     labels = [['a', 'b', ...], ['c', 'd', 'e', ...]]
*/

function dataConversion(elem, sizesArray, labels){
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
dataConversion(originalData, data, labels);
