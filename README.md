# annot_genes
- Pour pouvoir utiliser cette application web localement il est nécessaire
d'avoir installé sur votre ordinateur le serveur nodejs et son package manager
npm. Sous linux avec les commandes aptitude install node et aptitude install npm. 
Sous windows sur le site https://nodejs.org/en/. 
- Après avoir téléchargé tous le fichiers, lancez la commande
npm install sur la console sous linux dans le répertoire des fichiers 
(ça va installer tous le modules node nécessaires pour l'application)
- Lancez le serveur avec la commande node main.js
- Sur un navigateur web (préférablement firefox) allez à l'adresse localhost:3000
- Vous pouvez maintenant charger un fichier csv et avoir une jolie visualisation !

- Structure du fichier à charger
  fichier ZhouMesureHuman.csv
  exemple généralisé : 
    Cluster_1;nom-term1;nom-term2;nom-term3;...;nom-termn;
    ...
    Cluster_n;term1;term2;...;nom-termn;
    
    code-term1;gene1;gene2;..;genen;
    ...
    code-termn;gene1;gene2;..;genen;

Chaque cluster numeroté est suivi par la liste de noms de termes qui l'annotent.
Chaque term GO est suivi par la liste de gènes annotés par lui.
