import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from '../ProgressBar';

describe('ProgressBar', () => {
  // Test du rendu de base
  test('rend correctement avec les valeurs par défaut', () => {
    render(<ProgressBar value={50} />);
    const progressbar = screen.getByRole('progressbar');
    
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuenow', '50');
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
  });

  // Test des différentes variantes
  test.each(['default', 'success', 'warning', 'error'] as const)(
    'applique correctement les styles pour la variante %s',
    (variant) => {
      render(<ProgressBar value={50} variant={variant} />);
      const bar = screen.getByRole('progressbar').firstChild;
      
      const variantClassMap = {
        default: 'bg-secondary',
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500',
      };
      
      expect(bar).toHaveClass(variantClassMap[variant]);
    }
  );

  // Test des différentes tailles
  test.each(['sm', 'md', 'lg'] as const)(
    'applique correctement les styles pour la taille %s',
    (size) => {
      render(<ProgressBar value={50} size={size} />);
      const progressbar = screen.getByRole('progressbar');
      
      const sizeClassMap = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
      };
      
      expect(progressbar).toHaveClass(sizeClassMap[size]);
    }
  );

  // Test du calcul du pourcentage
  test('calcule correctement le pourcentage avec min et max personnalisés', () => {
    render(<ProgressBar value={5} min={0} max={10} />);
    const bar = screen.getByRole('progressbar').firstChild as HTMLElement;
    
    expect(bar.style.width).toBe('50%');
  });

  // Test des différents formats d'affichage
  test.each([
    { format: 'percentage', expected: '50%' },
    { format: 'fraction', expected: '50/100' },
  ] as const)('affiche correctement la valeur au format $format', ({ format, expected }) => {
    render(
      <ProgressBar
        value={50}
        showValue
        valueFormat={format}
      />
    );
    
    expect(screen.getByText(expected)).toBeInTheDocument();
  });

  // Test de l'absence d'affichage de la valeur
  test('n\'affiche pas la valeur quand showValue est false', () => {
    const { container } = render(<ProgressBar value={50} showValue={false} />);
    const span = container.querySelector('span');
    expect(span).not.toBeInTheDocument();
  });

  // Test des valeurs limites
  test('gère correctement les valeurs hors limites', () => {
    render(<ProgressBar value={150} max={100} />);
    const bar = screen.getByRole('progressbar').firstChild as HTMLElement;
    expect(bar.style.width).toBe('100%');

    render(<ProgressBar value={-10} min={0} />);
    const barMin = screen.getAllByRole('progressbar')[1].firstChild as HTMLElement;
    expect(barMin.style.width).toBe('0%');
  });

  // Test des classes personnalisées
  test('accepte des classes personnalisées', () => {
    const customClass = 'custom-class';
    render(<ProgressBar value={50} className={customClass} />);
    expect(screen.getByRole('progressbar')).toHaveClass(customClass);
  });

  // Test de l'animation
  test('applique la classe d\'animation quand animate est true', () => {
    render(<ProgressBar value={50} animate />);
    const bar = screen.getByRole('progressbar').firstChild;
    expect(bar).toHaveClass('transition-all');
  });

  test('n\'applique pas la classe d\'animation quand animate est false', () => {
    render(<ProgressBar value={50} animate={false} />);
    const bar = screen.getByRole('progressbar').firstChild;
    expect(bar).not.toHaveClass('transition-all');
  });
}); 