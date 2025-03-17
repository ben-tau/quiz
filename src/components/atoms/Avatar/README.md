# Composant Avatar

Le composant `Avatar` est utilisé pour afficher une image de profil utilisateur ou des initiales en fallback.

## Propriétés

```typescript
interface AvatarProps {
  src?: string;                                    // URL de l'image
  alt?: string;                                    // Texte alternatif
  initials?: string;                              // Initiales à afficher (max 2 caractères)
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';       // Taille de l'avatar (défaut: 'md')
  shape?: 'circle' | 'rounded';                   // Forme de l'avatar (défaut: 'circle')
  status?: 'online' | 'away' | 'offline' | 'busy'; // Statut de l'utilisateur
  className?: string;                             // Classes additionnelles
}
```

## Tailles

Les différentes tailles disponibles sont :
- `xs`: 24px × 24px
- `sm`: 32px × 32px
- `md`: 40px × 40px (défaut)
- `lg`: 48px × 48px
- `xl`: 64px × 64px

## Exemples d'utilisation

```tsx
// Avatar avec image
<Avatar
  src="/path/to/image.jpg"
  alt="John Doe"
  size="md"
/>

// Avatar avec initiales
<Avatar
  initials="JD"
  alt="John Doe"
  size="lg"
/>

// Avatar avec statut
<Avatar
  src="/path/to/image.jpg"
  alt="John Doe"
  status="online"
/>

// Avatar arrondi
<Avatar
  initials="JD"
  shape="rounded"
  size="xl"
/>

// Avatar avec gestion d'erreur d'image
<Avatar
  src="/invalid/image.jpg"
  initials="JD"
  alt="John Doe"
/>
```

## Fonctionnalités

### Gestion des images

- Affiche l'image si `src` est fourni et valide
- Bascule automatiquement sur les initiales si :
  - Aucune image n'est fournie
  - L'image ne peut pas être chargée

### Initiales

- Affichées quand il n'y a pas d'image
- Limitées à 2 caractères
- Couleur de fond générée automatiquement et cohérente pour les mêmes initiales
- Texte en blanc pour un contraste optimal

### Indicateur de statut

- Petit point coloré indiquant le statut de l'utilisateur
- Couleurs :
  - `online`: vert
  - `away`: jaune
  - `offline`: gris
  - `busy`: rouge
- Taille adaptée en fonction de la taille de l'avatar
- Positionné en bas à droite avec un anneau blanc

## Styles

Le composant utilise Tailwind CSS avec les caractéristiques suivantes :
- Tailles responsives et cohérentes
- Gestion des formes (cercle ou coins arrondis)
- Couleurs du design system pour les statuts
- Transitions fluides
- Support du mode sombre

## Accessibilité

Le composant implémente les meilleures pratiques d'accessibilité :
- Texte alternatif obligatoire pour les images
- Contraste optimal pour les initiales
- Support du focus pour les avatars cliquables
- Tailles suffisantes pour une bonne lisibilité

## Tests

Les tests unitaires vérifient :
- Le rendu de l'image
- Le fallback vers les initiales
- Les différentes tailles
- Les formes disponibles
- Les indicateurs de statut
- Les classes personnalisées
- La troncature des initiales 