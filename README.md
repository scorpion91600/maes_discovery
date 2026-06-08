<img width="1920" height="2926" alt="image" src="https://github.com/user-attachments/assets/71a6c1ef-f7e7-4584-a8c8-3619ae2a4784" />


# 🎵 Maes — Site Discographie

> Projet réalisé dans le cadre de la formation **La Toile** — *EM Lyon Business School*

🔗 **[Voir le site en ligne](https://scorpion91600.github.io/maes_discovery)**

---

## 📋 Présentation

Site web dédié à la discographie du rappeur français **Maes**, conçu avec une esthétique **glassmorphisme** et une attention particulière portée à la **lisibilité du texte**.

Le projet explore les fondamentaux du développement web front-end (HTML, CSS, JavaScript) à travers un cas concret et créatif.

---

## 🏗️ Architecture — Injection dynamique via JSON

L'une des évolutions majeures du projet est le passage d'un HTML statique à une **architecture data-driven**.

Les trois pages HTML sont désormais de **simples coquilles vides** :
elles ne contiennent aucun contenu visible, uniquement des `id` cibles.

Au chargement de la page, le fichier `script.js` récupère `data.json`
et **injecte dynamiquement** tout le contenu (textes, images, liens, iframes…).

data.json  ──►  script.js  ──►  index.html
                           ──►  album.html
                           ──►  tracklist.html


### Avantages concrets

| Besoin | Sans JSON | Avec JSON |
|---|---|---|
| Changer le nom de l'artiste | Modifier 3 fichiers HTML | Modifier 1 ligne dans `data.json` |
| Ajouter un album | Copier-coller du HTML dans 3 pages | Ajouter un objet dans le tableau `albums` |
| Changer un lien Spotify | Chercher dans le HTML | Modifier la clé `spotify` dans le JSON |
| Changer d'artiste entièrement | Réécrire tout le HTML | Remplacer `data.json` |

---

## 📄 Pages du site

| Page | Fichier | Description |
|---|---|---|
| **Accueil** | `index.html` | Biographie, hero, stats, carte, timeline discographique |
| **Albums** | `album.html` | Grille des 5 albums avec pochettes, popularité et liens Spotify |
| **Tracklist** | `tracklist.html` | Titres par album via onglets interactifs + widget Deezer |

---

## 🗂️ Structure du projet
```txt
maes_discovery/
│
├── index.html          # Coquille vide — page Biographie
├── album.html          # Coquille vide — page Albums
├── tracklist.html      # Coquille vide — page Tracklist
│
├── style.css           # Styles globaux (glassmorphisme, responsive)
├── script.js           # Injection dynamique du contenu via fetch()
├── data.json           # Source unique de vérité — toutes les données
│
└── photo_maes.jpg      # Photo utilisée dans la navbar
```

---

## 🔑 Fonctionnement de `data.json`

Le fichier est organisé en sections correspondant à chaque partie du site :

```json
{
  "navbar": { },
  "artiste": {
    "nom": "...",
    "stats": [],
    "map": {},
    "carriere": [],
    "discographie": [],
    "affairesJudiciaires": [],
    "pageAlbums": {},
    "pageTracklist": {}
  }
}
