# Composant Badge

Le composant `Badge` est utilisé pour afficher des indicateurs de statut, des compteurs ou des notifications.

## Propriétés

```typescript
interface BadgeProps {
  children?: React.ReactNode;                      // Contenu du badge
  variant?: 'default' | 'success' | 'warning' | 'error'; // Style du badge (défaut: 'default')
  size?: 'sm' | 'md' | 'lg';                      // Taille du badge (défaut: 'md')
  rounded?: boolean;                              // Forme arrondie (défaut: true)
  empty?: boolean;                                // Badge vide (point coloré)
  className?: string;                            // Classes additionnelles
}
```

## Variantes

Les différentes variantes disponibles sont :
- `default`: Gris secondaire avec texte blanc
- `success`: Vert avec texte blanc
- `warning`: Jaune avec texte sombre
- `error`: Rouge avec texte blanc

## Tailles

Les différentes tailles disponibles sont :
- `sm`: Petit (text-xs, padding réduit)
- `md`: Moyen (text-sm, padding standard)
- `lg`: Grand (text-base, padding large)

## Exemples d'utilisation

```tsx
// Badge de statut
<Badge variant="success">Actif</Badge>

// Badge de compteur
<Badge>42</Badge>

// Badge de notification
<Badge variant="error" size="sm">3</Badge>

// Badge vide (point de statut)
<Badge variant="success" empty />

// Badge avec coins moins arrondis
<Badge rounded={false}>Nouveau</Badge>

// Badge personnalisé
<Badge
  variant="warning"
  size="lg"
  className="font-bold"
>
  Important
</Badge>
```

## Cas d'utilisation

### Indicateur de statut

```tsx
<div className="flex items-center gap-2">
  <Badge variant="success" empty />
  <span>En ligne</span>
</div>
```

### Compteur de notifications

```tsx
<button className="relative">
  Messages
  <Badge
    variant="error"
    size="sm"
    className="absolute -top-1 -right-1"
  >
    5
  </Badge>
</button>
```

### Étiquette de statut

```tsx
<div className="flex items-center gap-2">
  <Badge variant="warning">En attente</Badge>
  <Badge variant="success">Approuvé</Badge>
  <Badge variant="error">Rejeté</Badge>
</div>
```

## Styles

Le composant utilise Tailwind CSS avec les caractéristiques suivantes :

### Base
- Flexbox pour le centrage du contenu
- Police en medium pour une meilleure lisibilité
- Transitions fluides pour les interactions

### Variantes
- Couleurs du design system
- Contraste optimal pour chaque variante
- Effets hover subtils

### Tailles
- Dimensions et espacements cohérents
- Taille de police adaptée
- Taille minimale garantie

### Mode vide
- Dimensions réduites
- Pas de padding
- Forme circulaire par défaut

## Accessibilité

Le composant suit les bonnes pratiques d'accessibilité :
- Contraste suffisant pour le texte
- Tailles minimales respectées
- Support des attributs ARIA si nécessaire

## Tests

Les tests unitaires vérifient :
- Le rendu du contenu
- L'application des variantes
- Les différentes tailles
- Les styles arrondis
- Le mode vide
- Les classes personnalisées
- Les props additionnelles 