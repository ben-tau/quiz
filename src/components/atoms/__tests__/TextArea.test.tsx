import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TextArea from '../TextArea';

describe('TextArea Component', () => {
  const defaultProps = {
    id: 'test-textarea',
    name: 'test-textarea',
  };

  it('renders correctly with required props', () => {
    render(<TextArea {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays label when provided', () => {
    const label = 'Test Label';
    render(<TextArea {...defaultProps} label={label} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('shows error message when provided', () => {
    const error = 'Error message';
    render(<TextArea {...defaultProps} error={error} />);
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('calls onChange handler when value changes', () => {
    const handleChange = jest.fn();
    render(<TextArea {...defaultProps} onChange={handleChange} />);
    
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'test' } });
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('can be disabled', () => {
    render(<TextArea {...defaultProps} isDisabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders with correct number of rows', () => {
    const rows = 6;
    render(<TextArea {...defaultProps} rows={rows} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', rows.toString());
  });

  it('has resize property when specified', () => {
    render(<TextArea {...defaultProps} resize={false} />);
    const textarea = screen.getByRole('textbox');
    expect(textarea.className).toContain('resize-none');
  });
}); 