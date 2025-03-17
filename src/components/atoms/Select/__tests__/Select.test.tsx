import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../Select';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('Select', () => {
  const defaultProps = {
    id: 'test-select',
    name: 'test',
    value: '',
    onChange: jest.fn(),
    options: mockOptions,
  };

  // Test du rendu avec options
  test('rend correctement avec les options', () => {
    render(<Select {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(mockOptions.length);
    expect(options[0]).toHaveTextContent('Option 1');
  });

  // Test de la sélection d'une option
  test('déclenche onChange lors de la sélection', () => {
    render(<Select {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });
    
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  // Test du placeholder
  test('rend correctement avec un placeholder', () => {
    const placeholder = 'Sélectionnez une option';
    render(<Select {...defaultProps} placeholder={placeholder} />);
    
    const placeholderOption = screen.getByText(placeholder);
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption.tagName.toLowerCase()).toBe('option');
    expect(placeholderOption).toHaveAttribute('disabled');
  });

  // Test de l'état disabled
  test('applique correctement l\'état disabled', () => {
    render(<Select {...defaultProps} disabled />);
    
    const select = screen.getByRole('combobox');
    expect(select).toBeDisabled();
    expect(select).toHaveClass('disabled:opacity-60');
    expect(select).toHaveClass('disabled:cursor-not-allowed');
  });

  // Test de l'état d'erreur
  test('applique correctement l\'état d\'erreur', () => {
    render(<Select {...defaultProps} error="Message d'erreur" />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-red-500');
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  // Test des classes personnalisées
  test('accepte des classes personnalisées', () => {
    const customClass = 'custom-class';
    render(<Select {...defaultProps} className={customClass} />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(customClass);
  });

  // Test de la valeur sélectionnée
  test('affiche correctement la valeur sélectionnée', () => {
    render(<Select {...defaultProps} value="option2" />);
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
  });
}); 