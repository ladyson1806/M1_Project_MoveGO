 # MoveGO: Outil web pour la visualisation d'annotations fonctionnelles
 
 - Developers: Savandara BESSE - Kristina KASTANO - Alexia SOUVANE (Copyright (C) 2016)  

 ## Description
 - M1 Project for Master's Degree in Bioinformatics (University of Bordeaux, FRANCE)
 - Webtool for the visulization of enriched GO terms for a gene list
 
_____________________
 
 *  This file is part of MoveGO

 * This program is free software: you can redistribute it and/or modify it
 under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 
 * This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 RCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.

 *  You should have received a copy of the GNU General Public License
 along with mowgli.  If not, see <http://www.gnu.org/licenses/>.

_____________________

### How to use
1. To run this web application locally, you need nodejs and npm 
2. To install all necessary packages use the command npm install in the downloaded directory
3. Then you can run the server with the command node main.js
4. You can access the web tool at the adress localhost:300
5. You can now upload a csv file that has to have the structure of the example file ZhouMesureHuman.csv

### User intructions
- To use this web server locally, you need to install on your computer `nodejs` and its package manager `npm`
Instructions d'utilisation
- Once you download npm, run `npm install` inside this repertory (all required packages will be downloaded)
- Run the server with `node main.js`
- Go into your favorite web browser (Firefox if possible) and go to adress `localhost:3000`
- Upload a CSV file and get a nice visualization

### CSV template
- Check the example file ZhouMesureHuman.csv
- A generalized example: 
> Cluster_1;nom-term1;nom-term2;nom-term3;...;nom-termn; <br>
> Cluster_n;term1;term2;...;nom-termn; <br>
> code-term1;gene1;gene2;..;genen; <br>
> code-termn;gene1;gene2;..;genen; 
    
- Each annotated cluster is associated with a list of GO terms
- Each GO term is associated to a gene list
