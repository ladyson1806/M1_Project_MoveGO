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
    elem.size = elem.origin * k;
  });
}

//Objet
var markRev = {
};

var hstatic = 0;
function changeColor(elem, grey) {
  var f = function () {
  };
  if (grey) {
    f = function (elem) {
      var c = elem.color;
      var y = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
      elem.mark.color(y, y, y, 255);
      elem.marki.color([y, y, y, 255]);
      elem.markt.color(y, y, y, 255);
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
      if (elem.mark != undefined) {
        elem.mark.color(elem.color);
        elem.marki.color(elem.color);
        elem.markt.color(elem.color);
      }
    };
  }
  accept(elem, f, f, undefined);
}
function recSum(elem) {
	/* Affectue à la taille de l'elem representant l'élément visuel
	  la somme récursive des tous les éléments contenus
	  par exemple dans la treemap c'est la somme de tous les rectangles*/
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

var icicle = function (elem, depth, alpha0, alpha1) {
  if (elem.marki == undefined) {
    elem.marki = window.fatum.addMark();
    markRev[elem.marki.id()] = elem;
    elem.marki.clippingStart(0).clippingStop(0);
    elem.marki.internalClipping(0);
    elem.marki.shape(Fatum.Shape.SQUARE);
    elem.marki.borderColor(0, 0, 0, 255);
    elem.marki.borderWidth(1);
  }
  elem.marki.x((alpha1 + alpha0) / 2).y(depth * 0.5 - 5);
  elem.marki.width(alpha1 - alpha0).height(0.5);
  var dalpha = (alpha1 - alpha0) / elem.size;
  if (elem.children != undefined)
  for (var i in elem.children) {
    alpha1 = alpha0 + elem.children[i].size * dalpha;
    icicle(elem.children[i], depth + 1, alpha0, alpha1);
    alpha0 = alpha1;
  }
}
var radial = function (elem, depth, alpha0, alpha1) {
  if (depth != 0) {
    if (elem.mark == undefined) {
      elem.mark = window.fatum.addMark();
      markRev[elem.mark.id()] = elem;
      elem.mark.x(0).y(0);
      elem.mark.internalClipping(1 - 1 / depth);
      elem.mark.shape(Fatum.Shape.CIRCLE);
      if (depth == 1)
      elem.mark.internalClipping(0.5);
      elem.mark.borderColor(0, 0, 0, 255);
      elem.mark.borderWidth(1);
    }
    elem.mark.clippingStart(alpha0).clippingStop(alpha1);
    elem.mark.width(depth).height(depth);
    elem.mark.shape(Fatum.Shape.CIRCLE);
  }
  var dalpha = (alpha1 - alpha0) / elem.size;
  if (elem.children != undefined)
  for (var i in elem.children) {
    alpha1 = alpha0 + elem.children[i].size * dalpha;
    radial(elem.children[i], depth + 1, alpha0, alpha1);
    alpha0 = alpha1;
  }
}
var tmap = function (elem, depth, x0, y0, x1, y1, s) {
      /* Crée une treemap à partir d'un objet javascript récursivement.
	   Cet objet contient un attribut 'name'
	   et un attribut 'children' qui contient les différents
	   'rectangles' de la treemap.
	   Chaque objet  des 'children' possède un attribut nom et
       un attribut entre les deux suivants :
         - 'children' : un tableau des plus petits rectangles contenus 
         - un attribut 'size' (quand ce rectangle contient pas d'autres rectangles) 
           qui indique la longeur ou largeur du rectangle dans l'unite qu'on veut-
		   c'est la proportion qui compte (cf function recsum)
       La fonction appelle elle même pour chaque 'child' des données
       depth = niveau d'appel
       x0, x1 : position x de l'élément passé en param dans la fenêtre de visualisation
       y0, y1 : position y de l'élément
       s : booléen qui indique quelle coordonnées du rectangle 'size' représente :
           true : y
           false : x
      */
    if (elem.markt == undefined) {
	/* -window.fatum.addMark() : On crée un élément visuel (rectangle), appelé "mark" dans Fatum.
	   -elem.markt = ... : on affectue ce 'mark' comme un attribut, markt, de l'objet elem javascript */
	elem.markt = window.fatum.addMark();
	/* Ajout de ce mark dans une liste de marks, markRev, qui permet de
	   faire de differents opérations sur eux */
	markRev[elem.markt.id()] = elem;
	elem.markt.clippingStart(0).clippingStop(0);
	elem.markt.internalClipping(0);
	//forme de chaque élément : rectangle
	elem.markt.shape(Fatum.Shape.SQUARE);
	elem.markt.borderColor(0, 0, 0, 255);
	elem.markt.borderWidth(1);
    }

    /*Calcul largeur et longeur que le mark occupe */
    var w = (x1 - x0);
    var h = (y1 - y0);

    /* Position et taille du mark*/
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

    /* */
	
    var dalpha = 0;
    if (s)
	dalpha = (y1 - y0) / elem.size;
    else
	dalpha = (x1 - x0) / elem.size;


    if (elem.children != undefined)
		for (var i in elem.children) {
			if (s)
				y1 = y0 + elem.children[i].size * dalpha;
			else
				x1 = x0 + elem.children[i].size * dalpha;
			tmap(elem.children[i], depth + 1, x0, y0, x1, y1, !s);
			if (s)
				y0 = y1;
			else
				x0 = x1;
		}
}

function updateMarks() {
    radial(data, 1, 0, 6.28318530718);
    icicle(data, 1, - 2.5, 2.5);
 //tmap(elem,depth, x0,   y0,   x1,  y1,   s)
    tmap(data, 1, - 8, - 4.75, - 3, 2.5, true);
}

var canvas = document.getElementById('fatum-demo');

var treeInteractor = function (e) {
  //e est l'objet de l'event click (passé par defaut en paramètre ?)
  //renvoie la taille d'un élément et sa position relative par rapport à la zone d'affichage
  var rect = canvas.getBoundingClientRect();
  //Calcul des coordonnées absolues choisies
  var pickX = e.clientX - rect.left;
  var pickY = canvas.height - e.clientY + rect.top;
  //Sélection de l'élément de la visualisation choisi
  var m = window.fatum.pick(pickX, pickY);
  //Si ce n'est pas un élément de visualisation sortir de la fonction
  if(!m) return;
  //Changement de la taille ?
  changeSize(data, 1); // s * k = G / 2
  recSum(data);
  //Changement de la couleur de la treemap en gri (paramètre grey false)
  changeColor(data, true);
  //Coloration de l'élément selectionné
  changeColor(markRev[m.id()], false);
  //Changement de proportions
  changeSize(markRev[m.id()], data.size / (markRev[m.id()].size * 2));
  recSum(data);
  //Rafraichissement des visualisations
  updateMarks();
  window.fatum.animate(500);
}

var initVis = function () {
  //Initialiser le canvas de fatum
  window.fatum = Fatum.createFatumContext(canvas);
  //Permet la visualisation en appellant renderFrame()
  Fatum.setRenderingObserver(fatum);
  canvas.onclick = treeInteractor;
  //Activation de la 'layer' à utiliser avec layerOn(layer)
  fatum.layerOn(Fatum.MARKS);
  //Définir l'attribut 'size' des données
  recSum(data);
  //Commencer la visualisation
  updateMarks();
  //Mettre des couleurs aux éléments
  changeColor(data, false);
  //Passage du back buffer au front buffer et visualisation
  fatum.swap();
  fatum.center();
  fatum.camera().swap();
};
Fatum.addInitListener(initVis);

