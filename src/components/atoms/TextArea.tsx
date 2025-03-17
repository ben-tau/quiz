import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  name: string;
  label?: string;
  error?: string;
  isDisabled?: boolean;
  rows?: number;
  resize?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      value,
      onChange,
      error,
      isDisabled = false,
      rows = 4,
      resize = true,
      className,
      ...props
    },
    ref
  ) => {
    const baseTextAreaStyles = twMerge(
      'w-full',
      'bg-surface px-4 py-2',
      'text-text placeholder-text-muted',
      'border border-border-accent rounded-lg',
      'focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      !resize && 'resize-none',
      'transition-all duration-200'
    );

    const labelStyles = 'block text-sm font-semibold text-text mb-1';
    const errorStyles = 'mt-1 text-sm text-error';

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
        <textarea
          ref={ref}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isDisabled}
          rows={rows}
          className={twMerge(
            baseTextAreaStyles,
            error && 'border-error focus:ring-error-light focus:border-error',
            className
          )}
          {...props}
        />
        {error && (
          <p className={errorStyles} role="alert">{error}</p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea; 