# Composants Typographiques BrainBattle

## Heading

Le composant `Heading` permet de créer des titres de différents niveaux avec des styles cohérents.

### Propriétés

```typescript
interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6; // Niveau du titre (défaut: 1)
  children: React.ReactNode;      // Contenu du titre
  className?: string;            // Classes additionnelles
}
```

### Exemples d'utilisation

```tsx
// Titre principal
<Heading>Bienvenue sur BrainBattle</Heading>

// Sous-titre
<Heading level={2}>Catégories populaires</Heading>

// Titre de section avec classe personnalisée
<Heading level={3} className="mb-6">Derniers quiz</Heading>
```

## Text

Le composant `Text` offre différentes variantes de texte pour une typographie cohérente.

### Propriétés

```typescript
interface TextProps {
  variant?: 'body' | 'small' | 'caption'; // Style du texte (défaut: 'body')
  children: React.ReactNode;              // Contenu du texte
  className?: string;                    // Classes additionnelles
}
```

### Exemples d'utilisation

```tsx
// Texte standard
<Text>Découvrez notre sélection de quiz passionnants.</Text>

// Texte plus petit
<Text variant="small">Dernière mise à jour : hier</Text>

// Légende
<Text variant="caption">* Certaines conditions s'appliquent</Text>
```

## Link

Le composant `Link` fournit des liens stylisés avec support des liens externes.

### Propriétés

```typescript
interface LinkProps {
  href: string;                    // URL de destination
  variant?: 'inline' | 'button';   // Style du lien (défaut: 'inline')
  external?: boolean;              // Ouvre dans un nouvel onglet
  children: React.ReactNode;       // Contenu du lien
  className?: string;             // Classes additionnelles
}
```

### Exemples d'utilisation

```tsx
// Lien inline simple
<Link href="/categories">Voir toutes les catégories</Link>

// Lien style bouton
<Link href="/inscription" variant="button">
  Créer un compte
</Link>

// Lien externe
<Link href="https://example.com" external>
  Visiter le site partenaire
</Link>

// Lien avec classe personnalisée
<Link href="/profil" className="font-bold">
  Mon profil
</Link>
```

### Styles

Les composants utilisent Tailwind CSS avec les caractéristiques suivantes :

#### Heading
- Tailles responsives pour chaque niveau
- Police en gras pour les niveaux 1-3
- Police semi-gras pour les niveaux 4-6
- Couleur blanche par défaut

#### Text
- Trois variantes avec tailles et opacités différentes
- Line-height optimisé pour chaque variante
- Support du texte multilingue

#### Link
- Transition fluide sur les interactions
- Indicateur visuel pour les liens externes
- Focus visible pour l'accessibilité
- Variante bouton avec bordure et hover effect

### Accessibilité

Les composants suivent les meilleures pratiques d'accessibilité :
- Structure sémantique avec les balises appropriées
- Attributs ARIA quand nécessaire
- Focus visible et navigation au clavier
- Contraste de couleurs optimal 