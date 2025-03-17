import React from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  id,
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled = false,
  className,
  ...props
}) => {
  // Styles de base
  const baseStyles = 'block w-full rounded-lg bg-dark-bg bg-opacity-50 border border-secondary border-opacity-30 text-text-light';
  
  // États et variations
  const stateStyles = cn(
    'focus:ring-2 focus:ring-primary focus:border-transparent',
    'hover:border-secondary hover:border-opacity-50',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    'transition-colors duration-200'
  );

  // Style de la flèche personnalisée
  const arrowStyles = 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNCA2TDggMTBMMTIgNiIgc3Ryb2tlPSIjOEQ4RDhEIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==")] bg-no-repeat bg-[center_right_1rem]';

  // Padding pour éviter que le texte ne chevauche la flèche
  const paddingStyles = 'pl-4 pr-12 py-2.5';

  // Styles d'erreur
  const errorStyles = error ? 'border-red-500 focus:ring-red-500' : '';

  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={cn(
        baseStyles,
        stateStyles,
        arrowStyles,
        paddingStyles,
        errorStyles,
        'appearance-none',
        className
      )}
      aria-invalid={error ? 'true' : 'false'}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default Select; 