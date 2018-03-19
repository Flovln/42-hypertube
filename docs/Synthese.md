# 42-hypertube

## Contraintes

### Technologies

- Serveur
  - Built-in Web-Serveur
- Compatibilité
  - Firefox >= 41
  - Chrome >= 46
- Responsivité
  - Oui
- Elements
  - Header
  - Footer
- Locales
  - Anglais (Défaut)
  - Francais

### Fonctionnalités de base

- Deconnexion depuis n'importe quelle page
- Traduction de l'application en deux langues

### Modules prohibés

- webtorrent
- pulsar
- peerflix

### Accès restreint
  - Bibliothèque
  - Recherche
  - Partie vidéo (stream)
  - Profil public utilisateur
  - Gestion compte/profil utilisateur

## Fonctionnalités

### Expérience utilisateur

- Omniauth (Inscription + Connexion)
  - 2 Stratégies minimum
    - 42 - obligatoire
    - Facebook
    - Google
    - Github
    - Instagram
- [x] Inscription
  - E-mail
  - Nom d'utilisateur
  - Photo de profil
  - Nom
  - Prénom
  - Mot de passe sécurisé
- [x] Connexion
  - Nom d'utilisateur
  - Mot de passe
- [x] Reinitialisation du mot de passe
  - Email
- [x] Edition de profil
  - Photo de profil
  - Nom
  - Prénom
- [ ] Edition de compte
  - Email
  - Nom d'utilisateur
  - Mot de passe
- [ ] Profil
  - Photo de profil
  - Nom
  - Prenom

### Bibliothèque

- Champ de recherche
  - Contraintes
    - 2 Sources externes de torrent (Minimum)
      - Yify
      - Pirate Bay
    - Limiter le resultat aux formats vidéo
- Liste de miniatures
  - Comportement
    - Clic: Accès a la page du film
    - Survol: Affichage du poster, titre, date de sortie et note IMDB
    - Pas de recherche lancée par l'utilisateur
      - Afficher les médias les plus populaires des sources de torrent
  - Contraintes
    - Informations affichées
      - Année de production
      - Note
      - Photo de couverture
      - Nom de la vidéo
      - Element notifiant si le film a été vu
    - Pagination infinie
      - Pas de liens pour la page suivante
      - Technique utilisée: infinite scrolling
  - Fonctionnalités
    - Triable
      - Date de sortie
      - Note IMDB
    - Filtrable
      - Genre
      - Note IMDB (Intervalle)
      - Année de production (Intervalle)

### Partie vidéo

- Player
  - Contraintes
    - Lancer la lecture après téléchargement suffisant des données
    - Ne pas retélécharger un film déjà téléchargé sûr le serveur
    - Traitement asynchrone du telechargement de données
    - Selection des sous-titres si disponibles
      - Anglais
      - Français
  - Fonctionnalités
      - Téléchargement des sous-titres si disponibles pour le film
- Informations
  - Résumé (si disponible)
  - Casting: producteur, réalisateur, acteurs principaux
  - Année de production
  - Durée
  - Note
  - Image de couverture
  - Nombre de vues
- Commentaires
  - Ajout de commentaires
  - Voir les commentaires des autres utilisateurs
- Fichier téléchargé
  - Contraintes
    - Sauvegarde sur le serveur
    - Suppression du fichier après 1 mois sans visionnage (CRON Job)
  - Sous-titres
    - Contraintes
      - Téléchargement des sous-titres si disponibles pour le film
- Flux vidéo
  - Formats supportés
    - MP4
    - WEBM
    - Mkv (convertion a la volée)
    - Avi (convertion a la volée)

### Technologies utilisées

- UI / UX
  - ant-design
  - SASS
- Langues du site
  - i18n
- Client
  - webpack-dev-server
  - React
  - Redux
- API
  - Express Server
  - NodeJS
  - MongoDB
  - Mongooe
