import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

describe('Checkbox Component', () => {
  const defaultProps = {
    id: 'test-checkbox',
    name: 'test-checkbox',
  };

  it('renders correctly with required props', () => {
    render(<Checkbox {...defaultProps} />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('displays label when provided', () => {
    const label = 'Test Label';
    render(<Checkbox {...defaultProps} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    const error = 'Error message';
    render(<Checkbox {...defaultProps} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('can be controlled with checked prop', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} checked={true} onChange={handleChange} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox {...defaultProps} onChange={handleChange} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<Checkbox {...defaultProps} isDisabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('supports indeterminate state', () => {
    render(<Checkbox {...defaultProps} indeterminate />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveProperty('indeterminate', true);
  });

  it('can be uncontrolled with defaultChecked', () => {
    render(<Checkbox {...defaultProps} defaultChecked />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('has correct ARIA attributes when invalid', () => {
    render(<Checkbox {...defaultProps} error="Error message" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });
}); 