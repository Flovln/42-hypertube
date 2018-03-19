# Modèle film - téléchargé côté serveur (`Movie`)

```typescript

class LocalModel extends Model
{
  title: string;
  magnet: string;
  movieID: string;
  path: string;
  lastPlay: string;
  views: number;
}

```

## Description et spécificités du modèle

### Titre (`title`)

Titre du film.

- Maximum 128 caractères

### Magnet (`magnet`)

Magnet unique permettant le téléchargement via torrent du dossier contenant le fichier vidéo.

### Identifiant (`movieID`)

Identifiant unique du film, magnet convertit en md5

### Chemin (`path`)

Chemin indiquant l'emplacement du film sûr le serveur

### Dernière lecture (`lastPlay`)

Date à laquelle le film a été joué pour la dernière fois

### Vues (`views`)

Nombre de vues utilisateurs pour ce film