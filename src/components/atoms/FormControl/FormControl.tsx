import React from 'react';
import { cn } from '@/lib/utils';

interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: React.ReactNode;
  label?: string;
  helperText?: React.ReactNode;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  fullWidth?: boolean;
}

const FormControl: React.FC<FormControlProps> = ({
  id,
  children,
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  className,
  labelClassName,
  fullWidth = false,
  ...props
}) => {
  // Styles de base pour le conteneur
  const containerStyles = cn(
    'flex flex-col space-y-1',
    fullWidth && 'w-full',
    disabled && 'opacity-60 cursor-not-allowed',
    className
  );

  // Styles pour le label
  const labelStyles = cn(
    'text-text font-semibold mb-2 text-sm',
    disabled && 'cursor-not-allowed opacity-60',
    labelClassName
  );

  // Styles pour le texte d'aide et d'erreur
  const helperTextStyles = cn(
    'text-sm mt-1',
    error ? 'text-error' : 'text-text-muted'
  );

  // Clone l'enfant pour lui passer les props nécessaires
  const enhancedChild = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        id,
        'aria-describedby': error ? `${id}-error` : helperText ? `${id}-helper` : undefined,
        disabled,
        ...child.props
      });
    }
    return child;
  });

  return (
    <div className={containerStyles} {...props}>
      {label && (
        <label 
          htmlFor={id}
          className={labelStyles}
        >
          {label}
          {required && (
            <span className="text-error ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      
      {enhancedChild}

      {(error || helperText) && (
        <div
          id={error ? `${id}-error` : `${id}-helper`}
          className={helperTextStyles}
          role={error ? 'alert' : undefined}
        >
          {error || helperText}
        </div>
      )}
    </div>
  );
};

export default FormControl; 