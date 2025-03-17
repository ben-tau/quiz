import React from 'react';
import { cn } from '@/lib/utils';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'secondary' | 'accent' | 'white' | 'inherit';
export type SpinnerVariant = 'border' | 'dots' | 'grow';

export interface SpinnerProps {
  size?: SpinnerSize;
  color?: SpinnerColor;
  variant?: SpinnerVariant;
  fullScreen?: boolean;
  label?: string;
  className?: string;
}

const sizeStyles: Record<SpinnerSize, string> = {
  xs: 'w-4 h-4',
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

const colorStyles: Record<SpinnerColor, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  white: 'text-white',
  inherit: 'text-inherit',
};

const variantStyles: Record<SpinnerVariant, string> = {
  border: 'border-[2px] border-current border-t-transparent rounded-full animate-spin',
  dots: 'flex gap-1',
  grow: 'animate-pulse rounded-full',
};

const DotsSpinner = ({ className }: { className?: string }) => (
  <div className={cn('flex gap-1', className)} role="presentation">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className={cn(
          'w-2 h-2 rounded-full',
          'animate-[dots_1.4s_ease-in-out_infinite]'
        )}
        style={{ animationDelay: `${i * 0.16}s` }}
      />
    ))}
  </div>
);

export const Spinner = ({
  size = 'md',
  color = 'secondary',
  variant = 'border',
  fullScreen = false,
  label,
  className,
}: SpinnerProps) => {
  const spinnerContent = (
    <div
      role="status"
      className={cn(
        'inline-flex flex-col items-center justify-center',
        fullScreen && 'fixed inset-0 bg-black/50 z-50',
        className
      )}
    >
      {variant === 'dots' ? (
        <DotsSpinner
          className={cn(sizeStyles[size], colorStyles[color])}
        />
      ) : (
        <div
          className={cn(
            sizeStyles[size],
            colorStyles[color],
            variantStyles[variant]
          )}
        />
      )}
      {label && (
        <span className="mt-2 text-sm text-inherit">{label}</span>
      )}
      <span className="sr-only">
        {label || 'Chargement en cours...'}
      </span>
    </div>
  );

  return fullScreen ? (
    <div className="relative">
      {spinnerContent}
    </div>
  ) : (
    spinnerContent
  );
};

export default Spinner; 