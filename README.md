<a href="https://www.linkedin.com/in/yassine-derkaoui/" rel="nofollow"><img src="https://camo.githubusercontent.com/e49e6d27ba0f51faf70c0c5eb9d1682cf7591d3989dd4b2cf0e65a68e366ee40/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4c696e6b6564496e2d626c61636b2e7376673f7374796c653d666c61742d737175617265266c6f676f3d6c696e6b6564696e26636f6c6f72423d353535" alt="LinkedIn" data-canonical-src="https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&amp;logo=linkedin&amp;colorB=555" style="max-width:100%;"></a>
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://raw.githubusercontent.com/Yassdrk/ESME-TRIP/main/src/assets/ESME%20TRIP.png" alt="Logo" width="150" height="80">
  </a>
    
 

  <h3 align="center">ESME TRIP</h3>

  <p align="center">
 Application web de réservations de voyages</p>
   <p align="center"><b>Auteur</b></p>

  <p align="center"><b>Yassine DERKAOUI</b></p>
</p>

<!-- ABOUT THE PROJECT -->
## À propos du projet

Mon projet intitulé ESME TRIP permet aux agences de voyages de réaliser leur propre application web de réservations de voyages. L'application proposée est intuitive et réactive.
Fonctionnalités incluses: 
- Système d'inscription et de connexion : authentification des utilisateurs avec mécanismes de sécurité standards (cookies, hashage de mots
de passe)
- Espace administrateur de gestion du site : gestion des voyages, des séjours et des utilisateurs. Modification du site : logo, slogan, et meilleures destinations.
- Recherche dynamique avec autosuggestion.

L'interface web a été réalisée en HTML5/CSS/Bootstrap et vuejs. Le serveur web dispose d'une API, développée en NODEJS.

### Comment lancer mon projet ?

1) Installez l'api qui se trouve dans le fichier ESME-TRIP-API.rar à la racine du projet et installez les modules avec la commande suivante :
```
npm install
```
N'oubliez pas de lancer pgadmin et d'executer la création de la base de donnée qui se trouve dans le fichier backup.sql dans l'archive SQL_esme_trip.rar

2) Après l'étape précèdente, démarrez l'api.
Si vous souhaitez démarrer l'api sur une base de données local (assurez-vous d'avoir installé postgreSQL), exécutez la commande ci-dessous:
```
npm start localhost
```
Sinon:
```
npm start 
```
L'api est lancée à l'adresse suivante : http://localhost:5000/

3) Une fois l'API lancée, vous pouvez lancer l'application web. Téléchargez le contenu de la branche Main (excepté le dossier API) et effectuez à la racine du projet les commandes ci-dessous.
```
npm install
```
```
npm start
```
4) Tout fonctionne, vous pouvez dès à présent utiliser l'application Web (http://localhost:8080/). N'hésitez pas à me solliciter si vous avez une question sur le lancement du projet ou sur l'application en elle-même.

### Aperçu de l'application
<p align="center">

![IMG](https://user-images.githubusercontent.com/82156431/115144360-812b7680-a04c-11eb-8e00-34d646d26d8a.png)


</p>

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
