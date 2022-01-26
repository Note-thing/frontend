<p align="center">
  <img src="public/favicon.svg" />
</p>

<h1 align="center">Note-thing</h1>

## Introduction

Ce projet offre un interface web et on moyen d'utiliser le backend pour offir une expérience utilisateur hors norme lors de l'utilisation de note gestionnaire de création de notes.

Pour ce faire, nous avons utilisé [ReactJs](https://github.com/facebook/create-react-app).

## Mise en place

Tout d'abord, ouvrez un terminal, puis cloné le repository comme suit:
```bash
git clone git@github.com:Note-thing/frontend.git
```

Il vous faut, ensuite, installer les dépendances NPM avec la commande suivante:
```bash
npm install
```

Après ceci, le projet est prêt à être démarré à l'aide de la commande:
```bash
npm start
```

L'application, une fois démarée, est disponible à cette adresse: [http://localhost:3000](http://localhost:3000)

## Scripts utiles

Pour lancer tous les tests, utiliser la commande:
```bash
npm test
```

Pour générer l'application pour la production, utilisez la commande:
```bash
npm run build
```

## CI / CD

### CI

Les étapes suivantes sont effectuées pour nous assurer de la validité de l'application:

 1. Creation d'une VM ubuntu
 2. Récupération de la dernière version du repository
 3. Installation de NodeJs 16.x
 4. Lancement du script `npm ci` pour installer les dépendances
 5. Lancement du script `npm test` pour tester l'application

### CD

Les étapes suivantes sont effectuées lorsque l'on souhaite déployer l'application sur notre AWS (seule la branche _deploy_ permets de déployer l'application):

 1. Creation d'une VM ubuntu
 2. Récupération de la dernière version du repository
 3. Lancement du script `npm ci` pour installer les dépendances
 4. Lancement du script `npm test` pour tester l'application
 5. Génère l'application optimisée pour la production
 6. Crée un fichier qui contiendra la clé SSH permettant de se connecter à l'AWS
 7. Change la permission du fichier créé au point 6 pour être modifiable
 8. Ajout de la clé SSh dans le fichier créé au point 6
 9. Utilisation de rsync pour copier les fichiers sur notre AWS en utilisant la clé SSH du point 8

## Contributeurs

<a href="https://github.com/note-thing/frontend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=note-thing/frontend" />
</a>