import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
}

/**
 * Composant ProgressBar pour afficher une barre de progression
 * @param {ProgressBarProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant ProgressBar
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  className,
  showLabel = false,
  ...props
}) => {
  // Calcul du pourcentage de progression
  const progress = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={twMerge('w-full', className)}
      {...props}
    >
      <div className="relative h-full w-full overflow-hidden rounded-full bg-surface/50">
        <div
          className="h-full transition-all duration-300 ease-in-out rounded-full bg-primary-500"
          style={{ width: `${progress}%` }}
        />
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium text-white">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar; 