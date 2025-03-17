import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from '../Alert';

describe('Alert', () => {
  // Test du rendu de base
  test('rend correctement avec le contenu', () => {
    render(<Alert>Message test</Alert>);
    expect(screen.getByText('Message test')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('bg-blue-50');
  });

  // Test des différentes variantes
  test.each(['info', 'success', 'warning', 'error'] as const)(
    'applique correctement les styles pour la variante %s',
    (variant) => {
      render(<Alert variant={variant}>Message test</Alert>);
      const alert = screen.getByRole('alert');
      
      const variantClassMap = {
        info: 'bg-blue-50',
        success: 'bg-green-50',
        warning: 'bg-yellow-50',
        error: 'bg-red-50',
      };
      
      expect(alert).toHaveClass(variantClassMap[variant]);
    }
  );

  // Test du titre
  test('affiche correctement le titre', () => {
    render(
      <Alert title="Titre test">
        Message test
      </Alert>
    );
    
    expect(screen.getByText('Titre test')).toBeInTheDocument();
    expect(screen.getByText('Message test')).toBeInTheDocument();
  });

  // Test de l'icône
  test('affiche et masque correctement l\'icône', () => {
    const { rerender } = render(<Alert>Message test</Alert>);
    expect(screen.getByRole('alert').querySelector('svg')).toBeInTheDocument();

    rerender(<Alert icon={false}>Message test</Alert>);
    expect(screen.getByRole('alert').querySelector('svg')).toBeNull();
  });

  // Test du bouton de fermeture
  test('gère correctement la fermeture', () => {
    const onDismiss = jest.fn();
    render(
      <Alert dismissible onDismiss={onDismiss}>
        Message test
      </Alert>
    );
    
    const closeButton = screen.getByRole('button', { name: /fermer/i });
    expect(closeButton).toBeInTheDocument();
    
    fireEvent.click(closeButton);
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  // Test des classes personnalisées
  test('accepte des classes personnalisées', () => {
    const customClass = 'custom-class';
    render(
      <Alert className={customClass}>
        Message test
      </Alert>
    );
    
    expect(screen.getByRole('alert')).toHaveClass(customClass);
  });

  // Test de l'accessibilité
  test('a les attributs d\'accessibilité appropriés', () => {
    render(
      <Alert dismissible>
        Message test
      </Alert>
    );
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Fermer');
  });
}); 