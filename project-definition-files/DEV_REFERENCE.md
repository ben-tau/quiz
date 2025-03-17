# === ENCART DE TRANSITION - RÉFÉRENCE DÉVELOPPEUR FRONTEND - AGENT:DÉVELOPPEUR - DERNIÈRE MAJ:21-03-24 ===

## État Actuel & Contexte

- **Avancement**: Sprint 2 - 70% complété
- **Focus actuel**: Composants de jeu et interfaces interactives
- **Environnement**:
  - React 18.2.0 avec TypeScript
  - Vite 5.1.4 comme bundler
  - Tailwind CSS 3.4.1 pour le styling
  - React Router DOM 6.21.3 pour le routage

## Architecture Technique

### Services
- Factory: init, auth, game, profile ✅
- Auth: login, register, logout ✅
- Game: state, score, match 🔄
- Profile: stats, history, badges 🔄

### Mock Data
- Socket: events, latency, bots
- State: storage, scores

### Thème & Style
```ts
{
  primary: '#1E3A8A',
  secondary: '#3B82F6',
  accent: '#FACC15',
  bg: '#0F172A'
}
```
- Mode: Exclusivement sombre
- Effets: blur:12px, surface:30%, border:0.08

## Composants

### Atomiques ✅
```ts
// Button
{variant:'primary'|'secondary'|'outline'|'danger',size:'sm'|'md'|'lg',loading?:bool,disabled?:bool,onClick:()=>void}

// Card
{variant:'default'|'elevated'|'outlined',onClick?:()=>void}

// Badge
{variant:'primary'|'success'|'warning'|'danger',size:'sm'|'md'}
```

### Moléculaires ✅
```ts
// Invite
{code:str}
FEAT:pulse,copy,feedback

// Player
{id:str,name:str,avatar?:str,host?:bool,ready?:bool}
FEAT:empty,status,anim
```

### Organismiques ✅
```ts
// Themes
{themes:Theme[],selected:str[],toggle:(id:str)=>void,min?:num}
FEAT:multi,valid,anim

// Players
{players:Player[],max:num,kick?:(id:str)=>void}
FEAT:slots,host,anim
```

## API Endpoints

### Auth
```ts
POST /auth/login:{email:str,pwd:str}
POST /auth/register:{name:str,email:str,pwd:str}
POST /auth/refresh:{refresh:str}
```

### Game
```ts
POST /games:{mode:'classic'|'time'|'survival',themes:str[],maxP:num,timeQ:num,priv:bool}
GET /games/{code}
POST /games/{code}/join
POST /games/{code}/start
POST /games/{code}/answer:{qId:str,ans:str|num|str[],time:num}
```

### Profile
```ts
GET /profile
GET /profile/history?page&limit
```

## WebSocket Events

### Émission
- game:playerJoin
- game:playerLeft
- game:qStart
- game:ansRes

### Réception
- game:ready
- game:answer

## Règles Critiques

### Performance
- Virtual lists
- Lazy load
- Memo data
- Opt renders

### Accessibilité
- ARIA
- Keyboard
- WCAG AA
- Error msg

### Qualité
|Métrique|Cible|
|-|-|
|Load|<3s|
|Light|>90|
|WCAG|AA|
|TS|0err|
|Test|>80%|

## Structure du Projet
```
src/
├── components/
│   ├── atoms/       # Composants de base
│   ├── molecules/   # Combinaisons atomiques
│   ├── organisms/   # Sections complètes
│   └── pages/       # Pages
├── services/        # Services (auth, game, etc.)
├── lib/             # Utilitaires
└── styles/          # Styles globaux
```

## Guide de Développement

1. **Limitations**
   - 200 lignes max/fichier
   - Thème sombre exclusif
   - Tests manuels obligatoires
   - Documentation JSDoc requise

2. **Workflow**
   - Créer dossier dédié par composant
   - Implémenter avec JSDoc
   - Tester manuellement
   - Mettre à jour documentation

3. **Sécurité**
   - JWT + refresh
   - 401 handle
   - CSRF guard
   - Input validation

# === FIN DE L'ENCART - NE PAS SUPPRIMER === 