import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string;
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  isDisabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      placeholder,
      value,
      onChange,
      error,
      prefixIcon,
      suffixIcon,
      isDisabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseInputStyles = twMerge(
      'w-full',
      'bg-surface px-4 py-2',
      'text-text placeholder-text-muted',
      'border border-border-accent rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'transition-all duration-200'
    );

    const labelStyles = 'block text-sm font-semibold text-text mb-1';
    const errorStyles = 'mt-1 text-sm text-error';
    const iconStyles = 'absolute inset-y-0 flex items-center pointer-events-none text-text-muted';

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className={labelStyles}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {prefixIcon && (
            <div className={twMerge(iconStyles, 'left-0 pl-3')}>
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={isDisabled}
            className={twMerge(
              baseInputStyles,
              error && 'border-error focus:ring-error-light focus:border-error',
              (prefixIcon || suffixIcon) && 'pl-10',
              suffixIcon && 'pr-10',
              className
            )}
            {...props}
          />
          {suffixIcon && (
            <div className={twMerge(iconStyles, 'right-0 pr-3')}>
              {suffixIcon}
            </div>
          )}
        </div>
        {error && (
          <p className={errorStyles} role="alert">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 