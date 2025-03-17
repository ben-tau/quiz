import React from 'react';
import { render, screen } from '@testing-library/react';
import { FiCheck, FiX } from 'react-icons/fi';
import { Icon } from '../Icon';

describe('Icon', () => {
  // Test du rendu de base
  test('rend correctement différentes icônes', () => {
    const { rerender } = render(<Icon icon={FiCheck} data-testid="icon" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    
    rerender(<Icon icon={FiX} data-testid="icon" />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  // Test des tailles
  test.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)(
    'applique correctement la taille %s',
    (size) => {
      render(<Icon icon={FiCheck} size={size} data-testid="icon" />);
      const icon = screen.getByTestId('icon');
      
      const sizeClassMap = {
        xs: 'w-4',
        sm: 'w-5',
        md: 'w-6',
        lg: 'w-8',
        xl: 'w-10',
      };
      
      expect(icon).toHaveClass(sizeClassMap[size]);
    }
  );

  // Test des couleurs
  test.each([
    'primary',
    'secondary',
    'accent',
    'accent-2',
    'white',
    'inherit',
  ] as const)('applique correctement la couleur %s', (color) => {
    render(<Icon icon={FiCheck} color={color} data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    
    const colorClassMap = {
      primary: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      'accent-2': 'text-accent-2',
      white: 'text-white',
      inherit: 'text-inherit',
    };
    
    expect(icon).toHaveClass(colorClassMap[color]);
  });

  // Test des valeurs par défaut
  test('utilise les valeurs par défaut correctement', () => {
    render(<Icon icon={FiCheck} data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    
    expect(icon).toHaveClass('w-6', 'text-inherit'); // md size et inherit color
  });

  // Test des classes personnalisées
  test('accepte des classes personnalisées', () => {
    const customClass = 'custom-class';
    render(
      <Icon icon={FiCheck} className={customClass} data-testid="icon" />
    );
    
    expect(screen.getByTestId('icon')).toHaveClass(customClass);
  });

  // Test de la transmission des props supplémentaires
  test('transmet correctement les props supplémentaires', () => {
    const title = 'Icon title';
    render(
      <Icon
        icon={FiCheck}
        title={title}
        aria-label="Check icon"
        data-testid="icon"
      />
    );
    
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('title', title);
    expect(icon).toHaveAttribute('aria-label', 'Check icon');
  });

  // Test du centrage de l'icône
  test('centre correctement l\'icône', () => {
    render(<Icon icon={FiCheck} data-testid="icon" />);
    const icon = screen.getByTestId('icon');
    
    expect(icon).toHaveClass('items-center', 'justify-center');
  });
}); 