import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '../Logo';

describe('Logo Component', () => {
  it('renders correctly with default props', () => {
    render(<Logo />);
    expect(screen.getByText('🧠')).toBeInTheDocument();
    expect(screen.getByText('BrainBattle')).toBeInTheDocument();
  });

  it('hides text when showText is false', () => {
    render(<Logo showText={false} />);
    expect(screen.getByText('🧠')).toBeInTheDocument();
    expect(screen.queryByText('BrainBattle')).not.toBeInTheDocument();
  });

  it('applies size styles correctly', () => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    const sizeIconClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
    };

    sizes.forEach((size) => {
      const { container } = render(<Logo size={size} />);
      const iconContainer = container.querySelector('span');
      expect(iconContainer).toHaveClass(sizeIconClasses[size]);
    });
  });

  it('applies variant styles correctly', () => {
    const { rerender, container } = render(<Logo variant="light" />);
    expect(container.firstChild).toHaveClass('text-white');
    
    rerender(<Logo variant="dark" />);
    expect(container.firstChild).toHaveClass('text-dark-bg');
  });

  it('renders as a link when linkTo is provided', () => {
    const testUrl = '/test-url';
    const { container } = render(<Logo linkTo={testUrl} />);
    const link = container.querySelector('a');
    
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', testUrl);
    expect(link).toHaveClass('hover:opacity-90');
  });

  it('applies custom className', () => {
    const customClass = 'test-class';
    const { container } = render(<Logo className={customClass} />);
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('passes through additional HTML props', () => {
    const testId = 'test-logo';
    render(<Logo data-testid={testId} />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('has correct text shadow styles', () => {
    const { container, rerender } = render(<Logo variant="light" />);
    const text = container.querySelector('span:last-child');
    expect(text).toHaveClass('[text-shadow:_0_1px_2px_rgba(0,0,0,0.2)]');

    rerender(<Logo variant="dark" />);
    expect(text).toHaveClass('[text-shadow:_0_1px_2px_rgba(255,255,255,0.2)]');
  });
}); 