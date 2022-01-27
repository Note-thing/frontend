<p align="center">
  <img src="public/favicon.svg" />
</p>

<h1 align="center">Note-thing</h1>

## Introduction

Ce projet offre une interface web et un moyen d'utiliser le backend pour offir une expérience utilisateur hors norme lors de l'utilisation de note gestionnaire de création de notes.

Pour ce faire, nous avons utilisé [ReactJs](https://github.com/facebook/create-react-app).

Vous pouvez accèder à l'application en cliquant [ici](http://note-thing.ch).

## Liste des fonctionnalités

- Compte
  - Création de compte
    - Confirmation par email
  - Connexion à l'application
  - Réinitialisation du mot de passe
- Application
  - Création de dossier
  - Création de note
    - Partage
        - Copie complète : on copie complétement la note chez soi et elle devient indépendante.
        - Lecture seul: on a accès à une note d'un autre utilisateur mais elle n'est pas éditable
        - Mirroir: chaque utilisateur ayant reçu un lien peut éditer la note (une personne à la fois). Les autres utilisateurs verront les modifications apportées par chacun.
    - Ajout de tags
    - Editeur Markdown
    - Rendus HTML du Markdown
    - Téléchargement en PDF
  - Recherche d'une note
    - via son titre
    - via ses tags
  - Tutoriel
  - Mise à jour des informations du compte

## Mise en place

Tout d'abord, ouvrez un terminal, puis clonez le repository comme suit:
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

## Production

Pour générer l'application pour la production, utilisez la commande:
```bash
npm run build
```
Vous trouverez ensuite le contenu dans un dossier `build` à la racine

## Structure des dossiers

```
./
├─ public/            # Contient l'application optimisée après avoir utilisé la commande `npm build`
├─ src/               # Contient le code de l'application ainsi que les tests
│  ├─ config/         # Contient les methodes utilsées pour query le backend
│  ├─ context/        # Contient les contextes utilisé pour l'application
│  ├─ errors/         # Contient les templates d'erreur utilisé dans l'application
│  ├─ hooks/          # Contient les hooks permettant de notifier l'instance actuelle du changement d'un composant
│  ├─ layout/         # Contient les composants React utiles à l'affichage
│  ├─ resource/       # Contient le CSS, les images et les autres ressources utilisées
│  ├─ test/           # Contient les tests de l'application
│  ├─ utils/          # Contient les scripts utilisés par plusieurs composants/contextes/...
```

## Linter

Pour lancer le linter, utilisez la commande:
```bash
npm run lint
```

## Scripts utiles

Pour lancer tous les tests, utilisez la commande:
```bash
npm test
```

## CI / CD

### GitHub Actions

Nous utilisons les GitHub Actions pour tester et déployer l'application.

### CI

Nom de la CI: _CI TEST_

La CI est lancée pour chaque _push_ et _pull request_ fait sur _main_.

Les étapes suivantes sont effectuées pour nous assurer de la validité de l'application:

 1. Création d'une VM ubuntu
 2. Récupération de la dernière version du repository
 3. Installation de NodeJs 16.x
 4. Lancement du script `npm ci` pour installer les dépendances
 5. Lancement du script `npm test` pour tester l'application

### CD

Nom de la CD: _AWS Deploy FrontEnd_

La CD est lancée pour chaque _push_ et _pull request_ fait sur _deploy_.

Il est aussi possible de lancer la CD depuis les Actions en choisissant le workflow _AWS Deploy FrontEnd_ et en cliquant _Run workflow_ en sélectionnant la branche _deploy_.

Les étapes suivantes sont effectuées lorsque l'on souhaite déployer l'application sur notre AWS (seule la branche _deploy_ permets de déployer l'application):

 1. Création d'une VM ubuntu
 2. Récupération de la dernière version du repository
 3. Lancement du script `npm ci` pour installer les dépendances
 4. Lancement du script `npm test` pour tester l'application
 5. Génère l'application optimisée pour la production avec la commande `npm run build`
 6. Crée un fichier qui contiendra la clé SSH permettant de se connecter à l'AWS
 7. Change la permission du fichier créé au point 6 pour être modifiable.
 8. Ajout de la clé SSh dans le fichier créé au point 6
 9. Utilisation de rsync pour copier les fichiers sur notre AWS en utilisant la clé SSH du point 8

## Comment contribuer ? 🤌
Note-thing est un projet réalisé par des étudiants en ingénierie logiciel. Nous sommes ouverts aux avis d'experts.
Vous trouverez un [guide de contribution](CONTRIBUTING.md) qui définit quelques en points clefs comment contribuer au projet.

## Fondateurs

<a href="https://github.com/note-thing/frontend/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=note-thing/frontend" />
</a>

### License
Notre projet utilise la [License apache](LICENSE).
