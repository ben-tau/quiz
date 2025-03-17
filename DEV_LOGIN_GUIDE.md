# Guide d'Authentification pour le Développement

Ce document décrit le système d'authentification factice mis en place pour le développement de BrainBattle.

## Utilisateurs de Test

### 1. Utilisateur Standard - Thomas
- **Email:** thomas@example.com
- **Mot de passe:** password123
- **Rôle:** user
- **Caractéristiques:** Utilisateur de base sans photo de profil

### 2. Utilisateur Standard - Sophie
- **Email:** sophie@example.com
- **Mot de passe:** password456
- **Rôle:** user
- **Caractéristiques:** Utilisateur avec photo de profil

### 3. Administrateur
- **Email:** admin@brainbattle.com
- **Mot de passe:** admin123
- **Rôle:** admin
- **Caractéristiques:** Accès aux fonctionnalités d'administration

## Panneau de Développement

Un panneau de développement est disponible pour faciliter les tests d'authentification :

1. **Accès:** Appuyez sur `Ctrl + Alt + D` pour afficher/masquer le panneau
2. **Fonctionnalités:**
   - Liste des utilisateurs disponibles
   - Connexion rapide en un clic
   - Déconnexion rapide
   - Affichage de l'utilisateur actuellement connecté

## Stockage Local

Les informations d'authentification sont stockées dans le localStorage sous la clé `brainbattle_auth_user`.

## Services d'Authentification

Le service d'authentification (`src/services/authService.ts`) fournit les méthodes suivantes :

```typescript
// Connexion
await authService.login({ email, password });

// Inscription
await authService.register({ username, email, password });

// Déconnexion
await authService.logout();

// Vérifier l'authentification
authService.isAuthenticated();

// Obtenir l'utilisateur courant
authService.getCurrentUser();
```

## Notes Importantes

1. Ce système est uniquement destiné au développement
2. Les mots de passe sont stockés en clair - NE PAS utiliser en production
3. Les données utilisateur sont réinitialisées à chaque rechargement de l'application
4. Un délai artificiel de 500ms est ajouté aux appels pour simuler des appels réseau 