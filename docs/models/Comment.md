# Modèle commentaire (`Comment`)

```typescript

class CommentModel extends Model
{
  author: string;
  content: string;
  date: date;
  movie: string;
  movieID: string;
}

```

## Description et spécificités du modèle

### Auteur (`author`)

Auteur du commentaire.

- Maximum 128 caractères

### Contenu (`contenu`)

Contenu du commentaire.

- Maximum 400 caractères

### Date (`date`)

Date à laquelle le commentaire a été posté.

### Film (`movie`)

Titre du film.

### Identifiant (`movieID`)

Identifiant unique du film
