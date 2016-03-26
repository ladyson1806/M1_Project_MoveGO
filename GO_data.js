/*
Ce fichier contient un objet javascript appelé 'data'. 'data' a un nom et un attribut 'children'
qui est constitué d'une liste d'objets qui seront contenus dans la treemap.
Chaque objet est un cluster avec un nom et un attribut children. Cet attribut children contient
les termes de ce cluster. L'attribut qui contient les termes 'enfants' de chaque terme est renommé
à term_children pour le distinguer.
Dans cette structure de données 'children' représente les plus petits rectangles contenus dans
un plus grand rectangle est il permet l'utilisation d'un algorithme recursif pour la visu.
Size : l'attribut qui indique la longeur ou largeur de chaque rectange.
Size est dans l'unité qu'on veut, le code permet de construire les proportions. 
Ici size = le nombre de gènes annotés pour chaque terme- c'est inseré manuelement mais dans la 
dernière version il devra être calculé par le script.
*/

var data = {
    'name' : 'data',
    'children' : [
	{
	    'name' : 'cluster1' ,
            'children' : [ 
		{
            'term' : 'GO151514',
		    'name'    : 'phosphorylation',
		    'size': 4,
                    'ICnuno'  : 0.94,
                    'ICzhou'  : 0.87,
                    'depth'   : 3,
                    'parents' : [ 'GO1514884', 'GO64894484', 'GO78486411' ],
                    'term_children': [ 'GO7112277', 'GO98947445', 'GO23131364' ],
                    'genes'   : [ 'TNFSF4', 'TNFSF4', 'TNFSF4', 'TNFSF4']
                },
		{ 
		    'term' : 'GO1514847',
		    'name'    : 'electron transport chain',
		    'size': 3,
                    'ICnuno'  : 0.14,
                    'ICzhou'  : 0.57,
                    'depth'   : 2,
                    'parents' : [ 'GO15848884', 'GO648948484', 'GO78777411' ],
                    'term_children': [ 'GO78442277', 'GO98947445', 'GO23131364' ],
                    'genes'   : [ 'TNFSF4', 'TNFSF4', 'TNFSF4']
                },
		{
                    'term' : 'GO648948484',
		    'name'    : 'proliferation',
		    'size': 2,
                    'ICnuno'  : 0.94,
                    'ICzhou'  : 0.87,
                    'depth'   : 3,
                    'parents' : [ 'GO1514884', 'GO64894484', 'GO78486411' ],
                    'term_children': [ 'GO7112277', 'GO98947445', 'GO23131364' ],
                    'genes'   : [ 'TNFSF4', 'TNFSF4']
              	}
	    ]
	},
	{
	    'name' : 'cluster2',
	    'children' : [
		{
                    'term' : 'GO151514',
		    'name'    : 'oxidation-reduction process',
		    'size': 1,
                    'ICnuno'  : 0.94,
                    'ICzhou'  : 0.87,
                    'depth'   : 3,
                    'parents' : [ 'GO1514884', 'GO64894484', 'GO78486411' ],
                    'term_children': [ 'GO7112277', 'GO98947445', 'GO23131364' ],
                    'genes'   : [ 'TNFSF4']
                },
		{
                    'term' : 'GO1514847',
		    'name'    : 'axon skeleton',
		    'size': 4,
                    'ICnuno'  : 0.14,
                    'ICzhou'  : 0.57,
                    'depth'   : 2,
                    'parents' : [ 'GO15848884', 'GO648948484', 'GO78777411' ],
                    'term_children': [ 'GO78442277', 'GO98947445', 'GO23131364' ],
                    'genes'   : [ 'TNFSF4', 'TNFSF4', 'TNFSF4', 'TNFSF4']
                },
                {
		    'term': 'GO1548484',
		    'name'    : 'generation of precursor metabolites and energy',
		    'size': 3,
                    'ICnuno'  : 0.94,
                    'ICzhou'  : 0.87,
                    'depth'   : 3,
                    'parents' : [ 'GO1514884', 'GO64894484', 'GO78486411' ],
                    'term_children': [ 'GO7112277', 'GO98947445', 'GO23131364' ],
                    'genes'   : [ 'TNFSF4', 'TNFSF4', 'TNFSF4']
                }
	    ]
	},
	{
	    'name' : 'cluster3',
	    'children' : [
		{
                    'term' : 'GO148451514',
		    'name'    : 'aerobic respiration',
		    'size' : 5,
                    'ICnuno'  : 0.94,
                    'ICzhou'  : 0.87,
                    'depth'   : 3,
                    'parents' : [ 'GO1514884', 'GO64894484', 'GO78486411' ],
                    'term_children': [ 'GO7112277', 'GO98947445', 'GO23131364' ],
                    'genes'   : [ 'TNFSF4', 'TNFSF4', 'TNFSF4', 'TNFSF4', 'TNFSF4']
                },
                {
		    'term' :'GO1574147',
		    'name'    : 'cellular respiration',
		    'size' : 7,
                    'ICnuno'  : 0.14,
                    'ICzhou'  : 0.57,
                    'depth'   : 2,
                    'parents' : [ 'GO15848884', 'GO648948484', 'GO78777411' ],
                    'term_children': [ 'GO78442277', 'GO1548484', 'GO23131364' ],
                    'genes'   : [ 'TNFSF4', 'TNFSF4', 'TNFSF4', 'TNFSF4', 'TNFSF4', 'TNFSF4', 'TNFSF4']
                }
	    ]
	}
    ]
}


