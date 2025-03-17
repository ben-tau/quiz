import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Avatar from '../Avatar';

describe('Avatar Component', () => {
  const defaultProps = {
    alt: 'Test Avatar',
  };

  it('renders image when src is provided', () => {
    const src = 'https://example.com/avatar.jpg';
    render(<Avatar {...defaultProps} src={src} />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', src);
    expect(img).toHaveAttribute('alt', defaultProps.alt);
  });

  it('renders initials when no src is provided', () => {
    const initials = 'JD';
    render(<Avatar {...defaultProps} initials={initials} />);
    expect(screen.getByText(initials)).toBeInTheDocument();
  });

  it('falls back to initials when image fails to load', () => {
    const initials = 'JD';
    render(
      <Avatar
        {...defaultProps}
        src="invalid-image.jpg"
        initials={initials}
      />
    );
    
    const img = screen.getByRole('img');
    fireEvent.error(img);
    
    expect(screen.getByText(initials)).toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    const sizeMap = {
      xs: 'w-6',
      sm: 'w-8',
      md: 'w-10',
      lg: 'w-12',
      xl: 'w-16',
    };

    sizes.forEach(size => {
      const { container } = render(<Avatar {...defaultProps} size={size} />);
      expect(container.firstChild).toHaveClass(sizeMap[size]);
    });
  });

  it('applies correct shape classes', () => {
    const { rerender } = render(<Avatar {...defaultProps} shape="circle" />);
    expect(screen.getByRole('img').parentElement).toHaveClass('rounded-full');

    rerender(<Avatar {...defaultProps} shape="rounded" />);
    expect(screen.getByRole('img').parentElement).toHaveClass('rounded-lg');
  });

  it('renders status indicator when status is provided', () => {
    const statuses: Array<'online' | 'away' | 'offline' | 'busy'> = ['online', 'away', 'offline', 'busy'];
    const statusColorMap = {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      offline: 'bg-gray-400',
      busy: 'bg-red-500',
    };

    statuses.forEach(status => {
      const { container } = render(<Avatar {...defaultProps} status={status} />);
      const statusIndicator = container.querySelector('span:last-child');
      expect(statusIndicator).toHaveClass(statusColorMap[status]);
    });
  });

  it('applies custom className', () => {
    const customClass = 'custom-avatar';
    render(<Avatar {...defaultProps} className={customClass} />);
    expect(screen.getByRole('img').parentElement).toHaveClass(customClass);
  });

  it('truncates initials to 2 characters', () => {
    const initials = 'ABC';
    render(<Avatar {...defaultProps} initials={initials} />);
    expect(screen.getByText('AB')).toBeInTheDocument();
  });
}); 