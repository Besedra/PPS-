# Mode en ligne — Pierre, Feuille, Ciseaux

Dossier de travail du 2ᵉ collaborateur : **jouer contre un autre joueur en ligne**.
Ce dossier est indépendant du jeu solo (`src/`) pour éviter les conflits Git.

> Le plan initial (`plan_projet_minigame.txt`) interdisait le backend. Cette fonctionnalité est une **extension** : le mode solo doit continuer à fonctionner sans serveur.

## Objectif

Deux joueurs, dans deux navigateurs différents, se retrouvent dans une même partie, choisissent chacun pierre, feuille ou ciseaux, et voient le résultat en même temps.

## Périmètre (version minimale)

- [ ] Un serveur qui accepte des connexions en temps réel
- [ ] Créer une salle et obtenir un code (ex. `ABCD`)
- [ ] Rejoindre une salle avec ce code (2 joueurs maximum)
- [ ] Chaque joueur envoie son choix, **sans que l'autre le voie avant la fin de la manche**
- [ ] Le serveur calcule le résultat et l'envoie aux deux joueurs
- [ ] Gérer la déconnexion d'un joueur
- [ ] Scores par salle (victoires / défaites / égalités)

Hors périmètre : comptes utilisateurs, base de données, chat, déploiement.

## Structure du dossier

```
online/
├── README.md        ← ce fichier
├── server/          ← le serveur (à créer par toi)
│   ├── package.json
│   └── index.js
└── PROTOCOLE.md     ← à créer : messages échangés (voir plus bas)
```

Tu travailles **uniquement dans `online/`**. Pour brancher l'interface, prévois ensuite un petit fichier client dans `src/online/` (ex. `socket.js`), après accord avec la personne qui gère l'interface.

## Technologie suggérée (modifiable)

- Node.js + [Socket.IO](https://socket.io) (ou le module `ws`)
- Port du serveur : `3001` (le front Vite tourne sur `5173`)
- Autoriser le CORS pour `http://localhost:5173`

Démarrage possible :

```bash
cd online/server
npm init -y
npm install socket.io
node index.js
```

## Messages à définir (proposition de départ)

À valider avec le reste de l'équipe, puis à figer dans `PROTOCOLE.md`.

| Sens | Évènement | Données | Rôle |
|---|---|---|---|
| client → serveur | `room:create` | — | Créer une salle |
| serveur → client | `room:created` | `{ code }` | Code de la salle |
| client → serveur | `room:join` | `{ code }` | Rejoindre |
| serveur → clients | `room:ready` | `{ code }` | 2 joueurs présents |
| serveur → client | `room:error` | `{ message }` | Salle pleine / inconnue |
| client → serveur | `round:choose` | `{ choice }` | `pierre`, `feuille` ou `ciseaux` |
| serveur → clients | `round:result` | `{ you, opponent, result, scores }` | `result` : `victoire`, `defaite` ou `egalite` |
| serveur → clients | `opponent:left` | — | L'adversaire s'est déconnecté |

Les valeurs (`pierre`, `victoire`, etc.) sont les **mêmes** que dans le jeu solo (`src/`), pour réutiliser les composants.

Règle à appliquer côté serveur : Pierre bat Ciseaux, Ciseaux bat Feuille, Feuille bat Pierre ; sinon égalité. Une seule catégorie de score est incrémentée par manche.

## Travail avec Git

1. Part de la branche d'intégration à jour : `git switch dev` puis `git pull`
2. Crée ta branche : `git switch -c feature/online`
3. Commits petits et fréquents, uniquement dans `online/`
4. `git push -u origin feature/online`, puis Pull Request vers `dev`
5. Ne commit jamais `node_modules` ni un fichier `.env`

## Définition de « terminé »

- Deux onglets de navigateur peuvent jouer une partie complète ensemble
- Le choix d'un joueur n'est jamais visible par l'autre avant le résultat
- Le serveur ne plante pas si un joueur quitte en pleine manche
- `PROTOCOLE.md` est à jour
