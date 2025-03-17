# Composants Atomiques BrainBattle

## Input

Le composant `Input` est un champ de saisie personnalisé qui supporte plusieurs variantes et fonctionnalités.

### Propriétés

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;                    // Identifiant unique (requis)
  name: string;                  // Nom du champ (requis)
  label?: string;               // Libellé du champ
  error?: string;               // Message d'erreur
  prefixIcon?: React.ReactNode; // Icône à gauche
  suffixIcon?: React.ReactNode; // Icône à droite
  isDisabled?: boolean;         // État désactivé
}
```

### Exemples d'utilisation

```tsx
// Input basique
<Input
  id="username"
  name="username"
  label="Nom d'utilisateur"
  placeholder="Entrez votre nom d'utilisateur"
/>

// Input avec icônes
<Input
  id="search"
  name="search"
  prefixIcon={<SearchIcon />}
  placeholder="Rechercher..."
/>

// Input avec erreur
<Input
  id="email"
  name="email"
  type="email"
  label="Email"
  error="L'email est invalide"
  value={email}
  onChange={handleEmailChange}
/>

// Input désactivé
<Input
  id="readonly"
  name="readonly"
  value="Lecture seule"
  isDisabled
/>
```

## TextArea

Le composant `TextArea` est un champ de texte multi-lignes avec support pour le redimensionnement et d'autres fonctionnalités.

### Propriétés

```typescript
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;            // Identifiant unique (requis)
  name: string;          // Nom du champ (requis)
  label?: string;       // Libellé du champ
  error?: string;       // Message d'erreur
  isDisabled?: boolean; // État désactivé
  rows?: number;        // Nombre de lignes (défaut: 4)
  resize?: boolean;     // Possibilité de redimensionner
}
```

### Exemples d'utilisation

```tsx
// TextArea basique
<TextArea
  id="description"
  name="description"
  label="Description"
  placeholder="Entrez une description"
/>

// TextArea avec nombre de lignes personnalisé
<TextArea
  id="message"
  name="message"
  rows={6}
  label="Message"
/>

// TextArea sans redimensionnement
<TextArea
  id="fixed"
  name="fixed"
  resize={false}
  label="Taille fixe"
/>

// TextArea avec erreur
<TextArea
  id="bio"
  name="bio"
  label="Biographie"
  error="La biographie est trop courte"
  value={bio}
  onChange={handleBioChange}
/>
```

### Styles

Les deux composants utilisent Tailwind CSS avec les styles suivants :
- Fond semi-transparent (`bg-dark-bg bg-opacity-50`)
- Bordure avec opacité (`border border-secondary border-opacity-30`)
- Texte blanc et placeholder gris
- États focus, error et disabled stylisés
- Support des icônes préfixe/suffixe pour Input
- Support du redimensionnement configurable pour TextArea

### Tests

Les composants sont livrés avec une suite de tests complète qui vérifie :
- Le rendu de base
- L'affichage des labels
- La gestion des erreurs
- Les événements onChange
- L'état disabled
- Les icônes (Input)
- Le redimensionnement (TextArea)
- Le nombre de lignes (TextArea)

## Checkbox

Le composant `Checkbox` est une case à cocher personnalisée qui supporte plusieurs états et fonctionnalités avancées.

### Propriétés

```typescript
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;                // Identifiant unique (requis)
  name: string;              // Nom du champ (requis)
  label?: string;           // Texte associé
  checked?: boolean;        // État coché (contrôlé)
  defaultChecked?: boolean; // État initial (non contrôlé)
  indeterminate?: boolean;  // État intermédiaire
  isDisabled?: boolean;     // État désactivé
  error?: string;           // Message d'erreur
}
```

### Exemples d'utilisation

```tsx
// Checkbox basique
<Checkbox
  id="terms"
  name="terms"
  label="J'accepte les conditions d'utilisation"
/>

// Checkbox contrôlé
<Checkbox
  id="newsletter"
  name="newsletter"
  label="S'abonner à la newsletter"
  checked={isSubscribed}
  onChange={handleSubscriptionChange}
/>

// Checkbox avec état indéterminé
<Checkbox
  id="selectAll"
  name="selectAll"
  label="Sélectionner tout"
  indeterminate={someSelected}
  checked={allSelected}
  onChange={handleSelectAll}
/>

// Checkbox avec erreur
<Checkbox
  id="privacy"
  name="privacy"
  label="J'accepte la politique de confidentialité"
  error="Vous devez accepter la politique de confidentialité"
  checked={privacyAccepted}
  onChange={handlePrivacyChange}
/>

// Checkbox désactivé
<Checkbox
  id="disabled"
  name="disabled"
  label="Option non disponible"
  isDisabled
/>
```

### Styles

Le composant utilise Tailwind CSS avec les caractéristiques suivantes :
- Apparence personnalisée avec `appearance-none`
- Animation de transition sur les changements d'état
- Support des états : checked, unchecked, indeterminate, disabled
- Icône de coche SVG personnalisée
- Styles distincts pour chaque état
- Support du focus et de l'accessibilité
- Label positionné à droite avec espacement approprié

### Accessibilité

Le composant implémente les meilleures pratiques d'accessibilité :
- Utilisation appropriée des attributs ARIA
- Support du focus via clavier
- Label associé correctement via htmlFor
- États visuels distincts pour chaque interaction
- Support de l'état indéterminé

### Tests

Les tests unitaires vérifient :
- Le rendu de base
- L'affichage du label
- La gestion des erreurs
- Le contrôle de l'état (contrôlé/non contrôlé)
- Les événements onChange
- L'état disabled
- L'état indeterminate
- Les attributs ARIA 