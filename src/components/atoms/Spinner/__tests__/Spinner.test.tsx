import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../Spinner';

describe('Spinner', () => {
  // Test du rendu de base
  test('rend correctement avec les valeurs par défaut', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('w-8', 'text-secondary'); // md size et secondary color
  });

  // Test des tailles
  test.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'applique correctement la taille %s',
    (size) => {
      render(<Spinner size={size} />);
      
      const sizeClassMap = {
        xs: 'w-4',
        sm: 'w-6',
        md: 'w-8',
        lg: 'w-12',
        xl: 'w-16',
      };
      
      const spinner = screen.getByRole('status').querySelector('div');
      expect(spinner).toHaveClass(sizeClassMap[size]);
    }
  );

  // Test des couleurs
  test.each([
    'primary',
    'secondary',
    'accent',
    'white',
    'inherit',
  ] as const)('applique correctement la couleur %s', (color) => {
    render(<Spinner color={color} />);
    
    const colorClassMap = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      white: 'text-white',
      inherit: 'text-inherit',
    };
    
    const spinner = screen.getByRole('status').querySelector('div');
    expect(spinner).toHaveClass(colorClassMap[color]);
  });

  // Test des variantes
  test.each(['border', 'dots', 'grow'] as const)(
    'rend correctement la variante %s',
    (variant) => {
      render(<Spinner variant={variant} />);
      const spinner = screen.getByRole('status');
      
      if (variant === 'border') {
        expect(spinner.querySelector('div')).toHaveClass('animate-spin');
      } else if (variant === 'dots') {
        expect(spinner.querySelector('div')).toHaveClass('flex', 'gap-1');
      } else if (variant === 'grow') {
        expect(spinner.querySelector('div')).toHaveClass('animate-pulse');
      }
    }
  );

  // Test du mode plein écran
  test('applique correctement le mode plein écran', () => {
    render(<Spinner fullScreen />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('fixed', 'inset-0', 'bg-black/50', 'z-50');
  });

  // Test du label
  test('affiche correctement le label', () => {
    const label = 'Chargement des données...';
    render(<Spinner label={label} />);
    
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(label, { selector: '.sr-only' })).toBeInTheDocument();
  });

  // Test des classes personnalisées
  test('accepte des classes personnalisées', () => {
    const customClass = 'custom-class';
    render(<Spinner className={customClass} />);
    expect(screen.getByRole('status')).toHaveClass(customClass);
  });

  // Test de l'accessibilité
  test('a les attributs d\'accessibilité appropriés', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Chargement en cours...', { selector: '.sr-only' })).toBeInTheDocument();
  });

  // Test spécifique pour DotsSpinner
  test('rend correctement les points pour la variante dots', () => {
    render(<Spinner variant="dots" />);
    const dots = screen.getByRole('presentation').querySelectorAll('div');
    expect(dots).toHaveLength(3);
    dots.forEach(dot => {
      expect(dot).toHaveClass('w-2', 'h-2', 'rounded-full');
    });
  });
}); 