import React from 'react';
import { render, screen } from '@testing-library/react';
import FormControl from '../FormControl';

describe('FormControl', () => {
  // Test du rendu avec label
  test('rend correctement avec un label', () => {
    render(
      <FormControl id="test" label="Test Label">
        <input type="text" />
      </FormControl>
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  // Test du rendu avec message d'erreur
  test('rend correctement avec un message d\'erreur', () => {
    const errorMessage = 'Ce champ est requis';
    render(
      <FormControl id="test" label="Test" error={errorMessage}>
        <input type="text" />
      </FormControl>
    );
    
    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass('text-red-500');
    expect(errorElement.parentElement).toHaveAttribute('role', 'alert');
  });

  // Test du rendu avec texte d'aide
  test('rend correctement avec un texte d\'aide', () => {
    const helperText = 'Texte d\'aide';
    render(
      <FormControl id="test" label="Test" helperText={helperText}>
        <input type="text" />
      </FormControl>
    );
    
    const helperElement = screen.getByText(helperText);
    expect(helperElement).toBeInTheDocument();
    expect(helperElement).toHaveClass('text-gray-400');
  });

  // Test de l'indicateur required
  test('affiche l\'astérisque pour les champs requis', () => {
    render(
      <FormControl id="test" label="Test" required>
        <input type="text" />
      </FormControl>
    );
    
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-red-500');
  });

  // Test de l'état disabled
  test('applique correctement l\'état disabled', () => {
    render(
      <FormControl id="test" label="Test" disabled>
        <input type="text" />
      </FormControl>
    );
    
    const container = screen.getByLabelText('Test').parentElement;
    expect(container).toHaveClass('opacity-60');
    expect(container).toHaveClass('cursor-not-allowed');
    expect(screen.getByLabelText('Test')).toBeDisabled();
  });

  // Test des classes personnalisées
  test('accepte des classes personnalisées', () => {
    render(
      <FormControl 
        id="test" 
        label="Test" 
        className="custom-class"
        labelClassName="custom-label"
      >
        <input type="text" />
      </FormControl>
    );
    
    const container = screen.getByLabelText('Test').parentElement;
    expect(container).toHaveClass('custom-class');
    expect(screen.getByText('Test')).toHaveClass('custom-label');
  });

  // Test du mode fullWidth
  test('applique correctement le mode fullWidth', () => {
    render(
      <FormControl id="test" label="Test" fullWidth>
        <input type="text" />
      </FormControl>
    );
    
    const container = screen.getByLabelText('Test').parentElement;
    expect(container).toHaveClass('w-full');
  });

  // Test de la priorité du message d'erreur sur le texte d'aide
  test('affiche le message d\'erreur au lieu du texte d\'aide', () => {
    const errorMessage = 'Message d\'erreur';
    const helperText = 'Texte d\'aide';
    
    render(
      <FormControl 
        id="test" 
        label="Test" 
        error={errorMessage}
        helperText={helperText}
      >
        <input type="text" />
      </FormControl>
    );
    
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByText(helperText)).not.toBeInTheDocument();
  });
}); 