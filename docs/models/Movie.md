# Modèle film - informations (`Movie`)

```typescript

class MovieModel extends Model
{
  title: string;
  year: string;
  rating: string;
  casting: [ string ];
  genres: [ string ];
  synopsis: string;
  poster: string;
  comments: object[];
  likes: object[];
  magnet: string;
}

```

## Description et spécificités du modèle

### Titre (`title`)

Titre du film.

- Maximum 128 caractères

### Année (`year`)

Année de sortie.

- Maximum 4 caractères

### Note (`rating`)

Note ImDb.

### Casting (`casting`)

Tableau contenant les acteurs du film.

### Genres (`genres`)

Tableau contenant les catégories (styles) auxquelles le film appartient.

### Synopsis (`synopsis`)

Bref résumé de la trame principale et des enjeux du film.

### Affiche (`poster`)

Affiche du film.

- Maximum 1024 caractères
- Valeur par default

### Commentaires (`comments`)

Tableau d'objets contenant les commentaires laissés pour ce film.

### Magnet (`magnet`)

Magnet unique permettant le téléchargement via torrent du dossier contenant le fichier vidéo.