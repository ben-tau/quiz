import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input Component', () => {
  const defaultProps = {
    id: 'test-input',
    name: 'test-input',
  };

  it('renders correctly with required props', () => {
    render(<Input {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays label when provided', () => {
    const label = 'Test Label';
    render(<Input {...defaultProps} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    const error = 'Error message';
    render(<Input {...defaultProps} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<Input {...defaultProps} onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Input {...defaultProps} isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders with prefix icon', () => {
    const PrefixIcon = () => <span data-testid="prefix-icon">🔍</span>;
    render(<Input {...defaultProps} prefixIcon={<PrefixIcon />} />);
    expect(screen.getByTestId('prefix-icon')).toBeInTheDocument();
  });

  it('renders with suffix icon', () => {
    const SuffixIcon = () => <span data-testid="suffix-icon">✓</span>;
    render(<Input {...defaultProps} suffixIcon={<SuffixIcon />} />);
    expect(screen.getByTestId('suffix-icon')).toBeInTheDocument();
  });
}); 