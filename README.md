# Créateur de Reels YouTube

Une application web permettant de créer des reels à partir de vidéos YouTube, similaire à Opus Clip.

## Fonctionnalités

- Import de vidéos YouTube via URL
- Découpage automatique de la vidéo
- Ajout de texte et sous-titres
- Ajout de musique
- Export en format Reel
- Prévisualisation en temps réel

## Prérequis

- Node.js (v14 ou supérieur)
- npm ou yarn
- Une clé API YouTube

## Installation

1. Clonez le repository :
```bash
git clone [url-du-repo]
cd [nom-du-dossier]
```

2. Installez les dépendances :
```bash
npm install
```

3. Configurez les variables d'environnement :
- Copiez le fichier `.env.example` vers `.env`
- Ajoutez votre clé API YouTube dans le fichier `.env`

4. Lancez l'application :
```bash
npm run dev
```

## Utilisation

1. Accédez à l'application dans votre navigateur (généralement http://localhost:5173)
2. Collez l'URL de la vidéo YouTube que vous souhaitez convertir en reel
3. Utilisez les outils d'édition pour personnaliser votre reel
4. Prévisualisez le résultat
5. Téléchargez votre reel final

## Technologies utilisées

- React
- TypeScript
- Material-UI
- Tailwind CSS
- YouTube Data API
- FFmpeg (pour le traitement vidéo)

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Licence

MIT 