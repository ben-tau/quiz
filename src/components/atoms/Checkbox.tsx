import React, { forwardRef, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  id: string;
  name: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  isDisabled?: boolean;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      id,
      name,
      label,
      checked,
      defaultChecked,
      onChange,
      indeterminate,
      isDisabled = false,
      error,
      className,
      ...props
    },
    ref
  ) => {
    const checkboxRef = useRef<HTMLInputElement>(null);

    // Fusion des refs pour gérer à la fois la ref externe et la ref interne
    useEffect(() => {
      if (!checkboxRef.current) return;

      if (typeof ref === 'function') {
        ref(checkboxRef.current);
      } else if (ref) {
        ref.current = checkboxRef.current;
      }
    }, [ref]);

    // Gestion de l'état indéterminé
    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate]);

    const baseCheckboxStyles = 'appearance-none w-5 h-5 border rounded transition-all duration-200 ease-in-out cursor-pointer';
    const stateStyles = 'checked:bg-primary checked:border-primary hover:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-bg';
    const disabledStyles = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-200';
    
    const checkboxStyles = twMerge(
      baseCheckboxStyles,
      stateStyles,
      disabledStyles,
      error ? 'border-red-500' : 'border-secondary border-opacity-30',
      'bg-dark-bg bg-opacity-50',
      className
    );

    return (
      <div className="flex items-start">
        <div className="relative flex items-center h-5">
          <input
            ref={checkboxRef}
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={onChange}
            disabled={isDisabled}
            className={checkboxStyles}
            aria-invalid={!!error}
            {...props}
          />
          {/* Icône de coche personnalisée */}
          <svg
            className={twMerge(
              'absolute w-4 h-4 pointer-events-none transition-opacity duration-200',
              'left-0.5 top-0.5',
              checked ? 'opacity-100' : 'opacity-0',
              isDisabled ? 'text-gray-400' : 'text-white'
            )}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M6 10l3 3 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* Icône d'état indéterminé */}
          {indeterminate && (
            <div
              className={twMerge(
                'absolute w-2.5 h-0.5 rounded-full left-1 top-2',
                isDisabled ? 'bg-gray-400' : 'bg-white'
              )}
            />
          )}
        </div>
        {label && (
          <label
            htmlFor={id}
            className={twMerge(
              'ml-3 text-sm font-medium',
              isDisabled ? 'text-gray-400' : 'text-white',
              'select-none'
            )}
          >
            {label}
          </label>
        )}
        {error && (
          <p className="mt-1 text-sm text-red-500 ml-8">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox; 