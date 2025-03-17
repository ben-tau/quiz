import React from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  labelClassName?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  id,
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className,
  labelClassName,
}) => {
  // Dimensions selon la taille
  const sizes = {
    sm: {
      track: 'w-8 h-4',
      thumb: 'w-3 h-3',
      thumbTranslate: 'translate-x-4',
      label: 'text-sm',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-5 h-5',
      thumbTranslate: 'translate-x-5',
      label: 'text-base',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-6 h-6',
      thumbTranslate: 'translate-x-7',
      label: 'text-lg',
    },
  };

  // Styles de base pour le track (arrière-plan)
  const trackBaseStyles = cn(
    'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75',
    disabled && 'opacity-50 cursor-not-allowed',
    checked ? 'bg-secondary' : 'bg-gray-600',
    sizes[size].track
  );

  // Styles pour le thumb (partie mobile)
  const thumbBaseStyles = cn(
    'pointer-events-none inline-block transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
    checked ? sizes[size].thumbTranslate : 'translate-x-0',
    sizes[size].thumb
  );

  // Styles pour le label
  const labelStyles = cn(
    'ml-3 select-none',
    disabled && 'opacity-50 cursor-not-allowed',
    sizes[size].label,
    labelClassName
  );

  // Gestionnaire de clic
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  // Gestionnaire de touche
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      if (!disabled) {
        onChange(!checked);
      }
    }
  };

  return (
    <div className={cn('flex items-center', className)}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        className={trackBaseStyles}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute left-0.5 top-0.5',
            thumbBaseStyles
          )}
        />
      </button>
      {label && (
        <label
          htmlFor={id}
          className={labelStyles}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Toggle; 