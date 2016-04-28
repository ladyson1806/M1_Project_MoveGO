/***********************************************************
* Treemap visualisation - unmodified part
* Source : 
* http://www.labri.fr/perso/aperrot/fatum/treedemo/index.html
* Author : David Auber
*********************************************************/

var markRev = {};
var canvas = document.getElementById('fatum-demo');

function rgbToHsv(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [ Math.round(h * 360), Math.round(s * 100),  Math.round(v * 100) ];
}

function hsvToRgb(h, s, v) {
2
    h = h / 360 * 6;
    s = s / 100;
    v = v / 100;

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],

        b = [p, p, t, v, v, q][mod];

    return [ Math.round(r * 255), Math.round(g * 255), Math.round(b * 255) , 255];
}

function accept(elem, leaf, intern, parent, depth) {
    if (depth == undefined)
	depth = 0;
    if (elem.children != undefined) {
	if (intern != undefined) intern(elem, parent, depth);
	for (var i in elem.children)
	    accept(elem.children[i], leaf, intern, elem, depth + 1);
    }
    else {
	leaf(elem, parent, depth);
    }
}

function changeSize(elem, k) {
    accept(elem, function (elem) {
	console.log(elem.origin);
    elem.size = elem.origin * k;
  });
}

var hstatic = 0;
function changeColor(elem, grey) {
    var f = function () {};
    if (grey) {
	f = function (elem) {
	    var c = elem.color;
	    var y = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
	    elem.markt.color(y, y, y, 255);
	    //code original : deux autres marks en plus
	}
    }
    else {
	f = function (elem, parent, depth) {
	    if (elem.color == undefined) {
		if (parent == undefined )
		    elem.color = [100,100,100,255];
		else {
		    var col = parent.color;
		    var hsv = rgbToHsv(col[0], col[1], col[2]);
		    hsv[1] = 100/(depth+1);
		    hsv[2] = 100;
		    if (parent.hstatic == undefined)
			parent.hstatic = 0;
		    if (parent.hstatic > 360)
			parent.hstatic = 0;
		    hsv[0] = parent.hstatic;
		    parent.hstatic += 360/ parent.children.length;
		    
		    hsv[0] = Math.max(hsv[0], 0);
		    hsv[0] = Math.min(hsv[0], 360);
		    elem.color= hsvToRgb(hsv[0], hsv[1], hsv[2]);
		}
	    }
	    if (elem.markt != undefined) {
		elem.markt.color(elem.color);
		//code original : deux autres marks en plus
	    }
	};
    }
    accept(elem, f, f, undefined);
}

function recSum(elem) {
  var sum = 0;
  if (elem.children != undefined)
  for (var i in elem.children)
  sum += recSum(elem.children[i]);
   else {
    if (elem.origin == undefined) elem.origin = elem.size;
    return elem.size;
  }
  elem.size = sum;
  return sum;
}
