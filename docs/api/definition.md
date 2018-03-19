# Définition de l'API

- [Connexion au compte](#connexion-au-compte)
- [Enregistrement de compte](#enregistrement-de-compte)
- [Demande de réinitialisation de mot de passe](#demande-de-réinitialisation-de-mot-de-passe)
- [Réinitialisation de mot de passe](#réinitialisation-du-mot-de-passe)
- [Edition de compte | Pseudonyme](#edition-de-compte--pseudonyme)
- [Edition de compte | Email](#edition-de-compte--email)
- [Edition de compte | Mot de passe](#edition-de-compte--mot-de-passe)
- [Liste des miniatures | recommendation](#liste-des-miniatures--recommendation)
- [Liste des miniatures | recherche](#liste-des-miniatures--recherche)
- [Page de film](#page-de-film)
- [Commentaire posté](#commentaire-post)
- [Commentaire affichage](#commentaire-affichage)
- [Flux vidéo | Stream](#flux-video--stream)
- [Déconnexion](#déconnexion)

---

## Connexion au compte

```js
POST /api/user/signin
```

La route permettant à un utilisateur de se connecter à l'application.

#### Requête

```js
{
  'username': String,
  'password': String
}
```

#### Réponse (`Status: 2xx`)

```js
{
  'data': {
    'token': String
  },
  'state': { ... }
}
```

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:

- Pseudonyme (`username`)
  - N'existe pas
- Mot de passe ( `password`)
  - Ne correspond pas au compte associé à `username`

Un seul message d'erreur à afficher en front: `Échec de la connexion`.

---

## Enregistrement de compte

```js
POST /api/user/signup
```

La route permettant à un utilisateur de se créer un compte.

#### Requête

```js
{
  'email': String,
  'username': String,
  'photoURL': String,
  'firstName': String,
  'lastName': String,
  'password': String
}
```

#### Succès (`Status: 2xx`)

Aucune donnée nécessaire pour cette requête à part le statut.
Une fois la réponse reçue, l'utilisateur est redirigé vers une page statique qui lui signale qu'il peut se connecter à son compte.

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:

- Email (`email`)
  - Format invalide
  - Trop long
- Pseudonyme (`username`)
  - Format invalide
  - Trop court
  - Trop long
- Photo de profil (`photoURL`)
  - Format invalide
  - Trop long
- Prénom (`firstName`)
  - Vide
  - Trop long
- Nom (`lastName`)
  - Vide
  - Trop long
- Mot de passe (`password`)
  - Trop faible
  - Trop long

---

## Demande de réinitialisation de mot de passe

```js
POST /api/user/forgot-password
```

La route permettant à un utilisateur faire une demande de réinitialisation de son mot de passe.

#### Requête

```js
{
  'email': String
}
```

#### Succès (`Status: 2xx`)

Aucune donnée n'est générée par le serveur, nous nous servons juste du statut de la requête pour afficher le message de confirmation.

#### Erreur (`Status: 4xx`)

Pour des raisons évidentes de sécurité, aucune erreur possible sur cette route.
(Limitation possible du nombre de requêtes, mais de facon transparente)

---

## Réinitialisation du mot de passe

```js
POST /api/user/reset-password
```

La route permettant à un utilisateur de réinitialiser son mot de passe.

#### Requête

```js
{
  'id': String,
  'token': String,
  'password': String,
}
```

#### Succès (`Status: 2xx`)

Le statut de la requête permet de déterminer si l'utilisateur est redirigé vers la page de confirmation.
(On confirme que l'opération est un succès et un lien vers la page de connexion est présent)

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:

- Mot de passe (`password`)
  - Trop faible
  - Trop long

---

## Profil utilisateur

```js
GET /api/profile/:username
```

La route permettant de récupérer les informations publiques de l'utilisateur.

#### Requête

```js
{
  'username': String
}
```

#### Succès (`Status: 2xx`)

Le statut de la requête permet de déterminer si l'on affiche la page du profil publique de l'utilisateur.

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:
- Pseudonyme (`username`)
  - N'existe pas

## Edition de profil

```js
  POST /api/user/edit/profile
```

La route permettant à un utilisateur de mettre à jour ses informations publiques.

#### Requête

```js
{
  'photoURL': String,
  'firstName': String,
  'lastName': String
}
```

#### Succès (`Status: 2xx`)

Le statut de la requête permet de déterminer si les informations utilisateur ont bien été mises à jour.

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:
- Photo (`photoURL`)
  - Vide
  - Format invalide
  - Trop long
- Prénom (`firstName`)
  - Vide
  - Trop long
- Nom (`lastName`)
  - Vide
  - Trop long

---

## Edition de compte | Pseudonyme

```js
POST /api/user/edit/account/username
```

La route permettant à un utilisateur d'éditer son pseudonyme.

#### Requête

```js
{
  'username': String
}
```

#### Succès (`Status: 2xx`)

Le statut de la requête sert de confirmation. Aucune donnée spécifique n'est renvoyée.

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:
- Pseudonyme (`username`)
  - Format invalide
  - Déjà existant
  - Trop court
  - Trop long

---

## Edition de compte | Email

```js
POST /api/user/edit/account/email
```

La route permettant à un utilisateur d'éditer son addresse email.

#### Requête

```js
{
  'email': String
}
```

#### Succès (`Status: 2xx`)

Le statut de la requête sert de confirmation. Aucune donnée spécifique n'est renvoyée.

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:

- Email (`email`)
  - Format invalide
  - Déjà existant
  - Trop long

---

## Edition de compte | Mot de passe

```js
POST /api/user/edit/account/password
```

La route permettant à un utilisateur d'éditer son mot de passe.

#### Requête

```js
{
  'password': String
}
```

#### Succès (`Status: 2xx`)

Le statut de la requête sert de confirmation. Aucune donnée spécifique n'est renvoyée.

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:

- Mot de passe (`password`)
  - Trop faible
  - Trop long

---

## Liste des miniatures | recommendation

```js
GET /api/movies/thumbnails/:page
```

La route permettant de récupérer la liste des miniatures.

#### Requête

```js
{
  'page': Int
}
```

#### Succès (`Status: 2xx`)

```js
{
  'data': {
    'thumbnails': [
      { ... }
    ]
  },
  'state': { ... }
}
```

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:

- Miniatures (`thumbnails`)
  - Pas de miniatures disponibles

---

## Liste des miniatures | recherche

```js
POST /api/movies/search
```

La route permettant de récupérer le résultat d'une recherche.

#### Requête

```js
{
  'movie': String
}
```

#### Succès (`Status: 2xx`)

```js
{
  'data': {
    'search': [
      { ... }
    ]
  },
  'state': { ... }
}
```

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:

- Miniatures (`thumbnails`)
  - Aucun résultat pour cette recherche

---

## Page de film

```js
GET /api/movies/:movie&:hash
```

La route permettant à un utilisateur de récupérer les informations IMDB ainsi que le flux de streaming.

#### Requête

```js
{
  'movie': String,
  'hash': String
}
```

#### Succès (`Status: 2xx`)

```js
{
  'title': String,
  'year': Number,
  'duration': Number,
  'synopsis': String,
  'casting': Array,
  'genres': Array,
  'imdbRating': Number,
  'views': Int
}
```

#### Erreur (`Status: 4xx`)

Les erreurs possibles sont:
- Film (`movie`)
  - Impossibilité de trouver des informations sûr ce film
  - Inexistant - aucun torrent valide trouvé

---

## Commentaire posté

```js
POST /api/movies/movie/comment
```

La route permettant à un utilisateur de poster un commentaire sûr un film souhaité

### Requête

```js
{
  'movie': String,
  'author': String,
  'content': String
}
```

#### Succès (`Status: 2xx`)

```js
{
  'thread': Array
}
```

### Erreur (`Status 4xx`)

Les erreurs possibles sont:
- Commentaires (`comments`)
  - Erreur de run time avec la base de donnée ou API

---

## Commentaire affichage

```js
GET /api/movies/movie/comments/:movie
```

La route permettant de récupérer tous les commentaires postés pour un film donné

### Requête

```js
{
  'movie': String
}
```

#### Succès (`Status: 2xx`)

```js
{
  'thread': Array
}
```

### Erreur (`Status 4xx`)

Les erreurs possibles sont:
- Commentaires (`comments`)
  - Erreur de run time avec la base de donnée ou API
  - Film invalide

---

## Flux videéo

```js
GET /api/stream/:magnet&:title
```

La route permettant au player vidéo de lancer le téléchargement et streamer le fichier du film

### Requête

```js
{
  'magnet': String,
  'title': String
}
```
#### Succès (`Status: 2xx`)

```js
writeHead(2xx, {
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache, no-store',
        'Content-Range': '',
        'Content-Length': '',
        'Content-Type': ''
    })
```

Une fois le header définissant les spécificités du fichier envoyé, response est retournée au client au travers d'un pipe créé et géré par le stream côté serveur

### Erreur (`Status 4xx`)

Les erreurs possibles sont:
  - Fichier corrompu


---

## Déconnexion

```js
GET /api/logout
```

La route permettant au client de signaler au serveur la déconnexion de l'utilisateur, et d'interrompre le flux streaming.

#### Succès (`Status: 2xx`)

Le statut de la requête permet de déterminer si le flux a bien été interrompu ou non.

#### Erreur (`Status: 4xx`)

Indéterminé.
