import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error';
  className?: string;
}

/**
 * Composant Badge pour afficher des étiquettes et statuts
 * @param {BadgeProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant Badge
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-primary-500/20 text-primary-500',
    secondary: 'bg-secondary-500/20 text-secondary-500',
    success: 'bg-green-500/20 text-green-500',
    error: 'bg-red-500/20 text-red-500'
  };

  return (
    <span
      className={twMerge(
        'inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium',
        'transition-all duration-300',
        'backdrop-blur-sm',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}; 