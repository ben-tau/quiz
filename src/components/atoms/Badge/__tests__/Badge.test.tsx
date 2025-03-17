import React from 'react';
import { render, screen } from '@testing-library/react';
import Badge from '../Badge';

describe('Badge Component', () => {
  it('renders children correctly', () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const variants: Array<'default' | 'success' | 'warning' | 'error'> = [
      'default',
      'success',
      'warning',
      'error',
    ];

    const variantClassMap = {
      default: 'bg-secondary',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      error: 'bg-red-500',
    };

    variants.forEach((variant) => {
      const { container } = render(<Badge variant={variant}>Test</Badge>);
      expect(container.firstChild).toHaveClass(variantClassMap[variant]);
    });
  });

  it('applies size styles correctly', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    const sizeClassMap = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };

    sizes.forEach((size) => {
      const { container } = render(<Badge size={size}>Test</Badge>);
      expect(container.firstChild).toHaveClass(sizeClassMap[size]);
    });
  });

  it('applies rounded styles correctly', () => {
    const { rerender, container } = render(<Badge>Test</Badge>);
    expect(container.firstChild).toHaveClass('rounded-full');

    rerender(<Badge rounded={false}>Test</Badge>);
    expect(container.firstChild).toHaveClass('rounded');
    expect(container.firstChild).not.toHaveClass('rounded-full');
  });

  it('renders empty badge correctly', () => {
    const { container } = render(<Badge empty />);
    expect(container.firstChild).not.toHaveTextContent();
    expect(container.firstChild).toHaveClass('p-0');
  });

  it('applies empty size styles correctly', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    const emptySizeClassMap = {
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
    };

    sizes.forEach((size) => {
      const { container } = render(<Badge empty size={size} />);
      expect(container.firstChild).toHaveClass(emptySizeClassMap[size]);
    });
  });

  it('applies custom className', () => {
    const customClass = 'custom-badge';
    const { container } = render(<Badge className={customClass}>Test</Badge>);
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('passes through additional props', () => {
    render(<Badge data-testid="test-badge">Test</Badge>);
    expect(screen.getByTestId('test-badge')).toBeInTheDocument();
  });
}); 