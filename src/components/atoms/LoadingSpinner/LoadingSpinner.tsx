import React, { memo } from 'react';
import { useAccessibility } from '../../../hooks/useAccessibility';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4'
};

export const LoadingSpinner = memo(({
  size = 'md',
  className = '',
  label = 'Chargement en cours'
}: LoadingSpinnerProps) => {
  const { prefersReducedMotion } = useAccessibility();

  return (
    <div 
      role="status"
      aria-label={label}
      className={`inline-flex flex-col items-center ${className}`}
    >
      <div
        className={`
          ${sizeClasses[size]}
          rounded-full
          border-blue-500
          border-t-transparent
          ${prefersReducedMotion ? '' : 'animate-spin'}
          dark:border-blue-400
        `}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner'; 