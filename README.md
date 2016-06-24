 MoveGO: Outil web pour la visualisation d'annotations fonctionnelles
 *  Copyright (C) 2016  Baba BARO - Savandara BESSE - Kristina KASTANO - Alexia SOUVANE
 *
 *  This file is part of MoveGO
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with mowgli.  If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * Authors:
 * Baba BARO - Savandara BESSE - Kristina KASTANO - Alexia SOUVANE


- Pour pouvoir utiliser cette application web localement il est nécessaire
d'avoir installé sur votre ordinateur la plateforme nodejs et son package manager
npm. Sous linux avec les commandes 
 > aptitude install node
 > aptitude install npm

Sous windows sur le site https://nodejs.org/en/. 
- Après avoir téléchargé tous le fichiers, lancez la commande
npm install sur la console sous linux dans le répertoire des fichiers 
(ça va installer tous le modules node nécessaires pour l'application)
- Lancez le serveur avec la commande node main.js
- Sur un navigateur web (préférablement firefox) allez à l'adresse localhost:3000
- Vous pouvez maintenant charger un fichier csv et avoir une jolie visualisation !

- Structure du fichier à charger
 - Un exemple est le fichier ZhouMesureHuman.csv
 - Exemple généralisé 
    Cluster_1;nom-term1;nom-term2;nom-term3;...;nom-termn; 
    
    Cluster_n;term1;term2;...;nom-termn; 
     
    code-term1;gene1;gene2;..;genen; 
    
    code-termn;gene1;gene2;..;genen; 

 - Chaque cluster numeroté est suivi par la liste de noms de termes qui l'annotent.
 - Chaque term GO est suivi par la liste de gènes annotés par lui.
