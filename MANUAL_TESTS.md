# Plan de Tests Manuels - BrainBattle

Version: 1.0.0
Dernière mise à jour: 21/03/2024

## Instructions d'Utilisation

### Exécution des Tests
1. Utilisez ce document comme une checklist interactive
2. Marquez les tests avec :
   - ✅ Test réussi
   - ❌ Test échoué (ajoutez un commentaire expliquant l'échec)
   - ⏳ Test en attente ou bloqué
3. Documentez les bugs trouvés dans le système de suivi

### Fréquence Recommandée
- Après chaque nouvelle fonctionnalité majeure
- Avant chaque déploiement
- Lors de modifications importantes du design system
- Au minimum une fois par sprint

## 1. Design System et Interface

### 1.1 Thème et Couleurs
- [ ] Vérifier que toutes les couleurs correspondent au design system :
  - [ ] Bleu profond (#1E3A8A) pour les éléments primaires
  - [ ] Bleu électrique (#3B82F6) pour les éléments secondaires
  - [ ] Rose (#EC4899) et Jaune (#FACC15) pour les accents
  - [ ] Fond bleu foncé (#0F172A) pour l'arrière-plan
- [ ] Contraste suffisant pour tous les textes (WCAG AA)
- [ ] Cohérence des couleurs sur tous les composants

### 1.2 Typographie
- [ ] Police Montserrat chargée et appliquée correctement
- [ ] Hiérarchie des tailles de texte respectée :
  - [ ] Titres (h1 à h5)
  - [ ] Texte courant
  - [ ] Labels et petits textes
- [ ] Lisibilité optimale sur tous les fonds

### 1.3 Composants de Base
- [ ] Boutons :
  - [ ] États normal, hover, focus, disabled
  - [ ] Variantes (primary, secondary, outline)
  - [ ] Animations au hover
- [ ] Champs de formulaire :
  - [ ] Style cohérent (Input, TextArea)
  - [ ] États d'erreur et de succès
  - [ ] Messages d'aide et d'erreur
  - [ ] Placeholders visibles
- [ ] Cards :
  - [ ] Effet de flou (backdrop-blur)
  - [ ] Ombres et bordures
  - [ ] Animation au hover

## 2. Formulaires et Validation

### 2.1 Composant Input
- [ ] Rendu de base :
  - [ ] Affichage correct du label
  - [ ] Placeholder visible
  - [ ] Bordures et couleurs conformes
- [ ] États :
  - [ ] Focus avec anneau de focus
  - [ ] Hover avec effet subtil
  - [ ] Disabled avec opacité réduite
  - [ ] Erreur avec bordure rouge
- [ ] Icônes :
  - [ ] Prefix icon aligné à gauche
  - [ ] Suffix icon aligné à droite
  - [ ] Espacement correct

### 2.2 Composant TextArea
- [ ] Fonctionnalités de base :
  - [ ] Redimensionnement (si activé)
  - [ ] Nombre de lignes correct
  - [ ] Scrolling vertical
- [ ] États identiques à Input
- [ ] Gestion du placeholder
- [ ] Adaptation à différentes tailles de contenu

### 2.3 FormControl
- [ ] Structure :
  - [ ] Label correctement positionné
  - [ ] Champ de saisie aligné
  - [ ] Message d'aide/erreur en dessous
- [ ] Comportement :
  - [ ] Transmission des props aux enfants
  - [ ] Gestion du required avec astérisque
  - [ ] Affichage conditionnel des messages

## 3. Responsive Design

### 3.1 Breakpoints
- [ ] Tester sur les breakpoints définis :
  - [ ] sm (max-width: 639px)
  - [ ] md (max-width: 767px)
  - [ ] lg (max-width: 1023px)
  - [ ] xl (max-width: 1279px)

### 3.2 Adaptation Mobile
- [ ] Layout fluide
- [ ] Texte lisible
- [ ] Composants redimensionnés
- [ ] Interactions tactiles fonctionnelles

## 4. Accessibilité

### 4.1 Navigation au Clavier
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Ordre de tabulation logique
- [ ] Pas de piège au focus
- [ ] Raccourcis clavier fonctionnels

### 4.2 Lecteurs d'Écran
- [ ] Labels et alternatives textuelles
- [ ] Messages d'erreur annoncés
- [ ] Structure sémantique correcte
- [ ] ARIA roles et attributs

## 5. Performance

### 5.1 Chargement
- [ ] Temps de chargement initial < 3s
- [ ] Lazy loading des images
- [ ] Pas de FOUC (Flash of Unstyled Content)
- [ ] Animations fluides

### 5.2 Interactions
- [ ] Réactivité des formulaires
- [ ] Pas de lag sur les animations
- [ ] Scrolling fluide
- [ ] Gestion efficace des états

## Instructions de Mise à Jour

### Ajout de Nouveaux Tests
1. Créez une nouvelle section pour la fonctionnalité
2. Suivez le format existant
3. Incluez tous les cas d'utilisation
4. Mettez à jour la version du document

### Documentation des Résultats
1. Utilisez un système de versioning pour les rapports
2. Documentez les problèmes trouvés
3. Suivez les corrections
4. Mettez à jour régulièrement

## Historique des Versions

### v1.0.0 (21/03/2024)
- Version initiale du plan de tests
- Focus sur le design system et les composants de base
- Tests d'accessibilité et de responsive design 