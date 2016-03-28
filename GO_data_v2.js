/*
Ce fichier contient un objet javascript appelé 'data'. 'data' a un nom et un attribut 'children'
qui est constitué d'une liste d'objets qui seront contenus dans la treemap.
Chaque objet est un cluster avec un nom et un attribut children. Cet attribut children contient
les termes de ce cluster. 
Dans cette structure de données 'children' représente les plus petits rectangles contenus dans
un plus grand rectangle est il permet l'utilisation d'un algorithme recursif pour la visu.
Size : l'attribut qui indique la longeur ou largeur de chaque rectange.
Size : nb de gènes annotés avec ce terme, determine la taille du rectangle
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
                    'ICnuno'  : 0.94,
                    'ICzhou'  : 0.87,
                    'depth'   : 3,
                    'parents' : [ 'GO1514884', 'GO64894484', 'GO78486411' ],
                    'children': [ 
						{
							'name'    : 'GO7112277',
							'size': 4,			
						},
						{
							'name'    : 'GO98947445', 
							'size': 2
						},
						{
							'name'    : 'GO23131364',
							'size': 1
						}
					],                    
        },
		{ 
		    'term' : 'GO1514847',
		    'name'    : 'electron transport chain',
		    'size': 3,
                    'ICnuno'  : 0.14,
                    'ICzhou'  : 0.57,
                    'depth'   : 2,
                    'parents' : [ 'GO15848884', 'GO648948484', 'GO78777411' ],
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
                    'ICnuno'  : 0.94,
                    'ICzhou'  : 0.87,
                    'depth'   : 3,
                    'parents' : [ 'GO1514884', 'GO64894484', 'GO78486411' ],
                    'children': 
					[ 
						{
							'name'    : 'GO7112277', 
							 'size': 1
						},
						{
							'name'    : 'GO98947445',
							 'size': 4
						},
						{
							'name'    : 'GO23131364',
							 'size': 2
						}						
					],
                    'genes'   : [ 'TNFSF4']
                },
		{
                    'term' : 'GO1514847',
		    'name'    : 'cytoskeleton organization',
		    'size': 4,
                    'ICnuno'  : 0.14,
                    'ICzhou'  : 0.57,
                    'depth'   : 2,
                    'parents' : [ 'GO15848884', 'GO648948484', 'GO78777411' ],
                    'genes'   : [ 'TNFSF4', 'TNFSF4', 'TNFSF4', 'TNFSF4']
                },
                {
		    'term': 'GO1548484',
		    'name'    : 'generation of precursor metabolites and energy',
                    'ICnuno'  : 0.94,
                    'ICzhou'  : 0.87,
                    'depth'   : 3,
                    'parents' : [ 'GO1514884', 'GO64894484', 'GO78486411' ],
                    'children': 
					[
						{					
							'name' : 'GO7112277', 
							'size' : 3
						},
						{
							'name' : 'GO98947445',
							'size' : 1
						}
					]
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
                    'parents' : [ 'GO1514884', 'GO64894484', 'GO78486411' ]
                },
                {
		    'term' :'GO1574147',
		    'name'    : 'cellular respiration',
		    'size' : 7,
                    'ICnuno'  : 0.14,
                    'ICzhou'  : 0.57,
                    'depth'   : 2,
                    'parents' : [ 'GO15848884', 'GO648948484', 'GO78777411' ]
                }
	    ]
	}
    ]
}


