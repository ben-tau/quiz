import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from '../Toggle';

describe('Toggle', () => {
  const defaultProps = {
    id: 'test-toggle',
    checked: false,
    onChange: jest.fn(),
  };

  // Test du rendu initial non coché
  test('rend correctement en état non coché', () => {
    render(<Toggle {...defaultProps} />);
    
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute('aria-checked', 'false');
    expect(toggle).not.toHaveClass('bg-secondary');
  });

  // Test du rendu initial coché
  test('rend correctement en état coché', () => {
    render(<Toggle {...defaultProps} checked={true} />);
    
    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(toggle).toHaveClass('bg-secondary');
  });

  // Test du changement d'état au clic
  test('déclenche onChange au clic', () => {
    const handleChange = jest.fn();
    render(<Toggle {...defaultProps} onChange={handleChange} />);
    
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // Test du comportement avec label
  test('rend correctement avec un label', () => {
    const label = 'Test Label';
    render(<Toggle {...defaultProps} label={label} />);
    
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-label', label);
  });

  // Test de l'état désactivé
  test('désactive correctement les interactions', () => {
    const handleChange = jest.fn();
    render(<Toggle {...defaultProps} onChange={handleChange} disabled />);
    
    const toggle = screen.getByRole('switch');
    expect(toggle).toBeDisabled();
    expect(toggle).toHaveClass('opacity-50');
    expect(toggle).toHaveClass('cursor-not-allowed');
    
    fireEvent.click(toggle);
    expect(handleChange).not.toHaveBeenCalled();
  });

  // Test des différentes tailles
  test.each(['sm', 'md', 'lg'] as const)('applique correctement la taille %s', (size) => {
    render(<Toggle {...defaultProps} size={size} />);
    
    const toggle = screen.getByRole('switch');
    const thumb = toggle.firstChild as HTMLElement;
    
    if (size === 'sm') {
      expect(toggle).toHaveClass('w-8');
      expect(thumb).toHaveClass('w-3');
    } else if (size === 'md') {
      expect(toggle).toHaveClass('w-11');
      expect(thumb).toHaveClass('w-5');
    } else {
      expect(toggle).toHaveClass('w-14');
      expect(thumb).toHaveClass('w-6');
    }
  });

  // Test de l'interaction au clavier
  test('supporte la navigation au clavier', () => {
    const handleChange = jest.fn();
    render(<Toggle {...defaultProps} onChange={handleChange} />);
    
    const toggle = screen.getByRole('switch');
    
    // Test de la touche Espace
    fireEvent.keyDown(toggle, { key: ' ' });
    expect(handleChange).toHaveBeenCalledWith(true);
    
    // Test de la touche Entrée
    fireEvent.keyDown(toggle, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  // Test des classes personnalisées
  test('accepte des classes personnalisées', () => {
    const customClass = 'custom-class';
    const customLabelClass = 'custom-label';
    
    render(
      <Toggle
        {...defaultProps}
        className={customClass}
        labelClassName={customLabelClass}
        label="Test"
      />
    );
    
    const container = screen.getByRole('switch').parentElement;
    expect(container).toHaveClass(customClass);
    expect(screen.getByText('Test')).toHaveClass(customLabelClass);
  });
}); 