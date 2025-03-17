import React from 'react';
import { twMerge } from 'tailwind-merge';

export type TextVariant = 'body' | 'small' | 'caption';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<TextVariant, string> = {
  body: 'text-base text-white leading-normal',
  small: 'text-sm text-white leading-snug',
  caption: 'text-xs text-white/70 leading-tight',
};

const Text: React.FC<TextProps> = ({
  variant = 'body',
  children,
  className,
  ...props
}) => {
  const styles = twMerge(
    variantStyles[variant],
    className
  );

  return (
    <p className={styles} {...props}>
      {children}
    </p>
  );
};

export default Text; 