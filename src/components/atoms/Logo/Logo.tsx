import React from 'react';
import { twMerge } from 'tailwind-merge';

export type LogoSize = 'sm' | 'md' | 'lg';
export type LogoVariant = 'light' | 'dark';

export interface LogoProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  showText?: boolean;
  size?: LogoSize;
  variant?: LogoVariant;
  linkTo?: string;
  className?: string;
}

const sizeStyles: Record<LogoSize, { icon: string; text: string }> = {
  sm: {
    icon: 'w-8 h-8 text-2xl',
    text: 'text-base ml-2',
  },
  md: {
    icon: 'w-10 h-10 text-3xl',
    text: 'text-xl ml-3',
  },
  lg: {
    icon: 'w-12 h-12 text-4xl',
    text: 'text-2xl ml-3',
  },
};

const variantStyles: Record<LogoVariant, { container: string; icon: string; text: string }> = {
  light: {
    container: 'text-white',
    icon: 'bg-secondary',
    text: 'text-white [text-shadow:_0_1px_2px_rgba(0,0,0,0.2)]',
  },
  dark: {
    container: 'text-dark-bg',
    icon: 'bg-white',
    text: 'text-dark-bg [text-shadow:_0_1px_2px_rgba(255,255,255,0.2)]',
  },
};

export const Logo: React.FC<LogoProps> = ({
  showText = true,
  size = 'md',
  variant = 'light',
  linkTo,
  className,
  ...props
}) => {
  const Container = linkTo ? 'a' : 'div';
  const containerProps = linkTo ? { href: linkTo } : {};

  const baseStyles = 'inline-flex items-center';
  const hoverStyles = linkTo ? 'hover:opacity-90 transition-opacity duration-200' : '';
  
  const containerStyles = twMerge(
    baseStyles,
    hoverStyles,
    variantStyles[variant].container,
    className
  );

  const iconContainerStyles = twMerge(
    'flex items-center justify-center rounded-lg shadow-lg',
    variantStyles[variant].icon,
    `shadow-${variant === 'light' ? 'secondary' : 'white'}/50`,
    sizeStyles[size].icon
  );

  const textStyles = twMerge(
    'font-extrabold tracking-wide',
    variantStyles[variant].text,
    sizeStyles[size].text
  );

  return (
    <Container
      className={containerStyles}
      {...containerProps}
      {...props}
    >
      <div className={`relative ${className}`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle cx="20" cy="20" r="20" className="fill-primary-500" />
          <path
            d="M12 20C12 16.6863 14.6863 14 18 14H22C25.3137 14 28 16.6863 28 20V26H12V20Z"
            className="fill-white"
          />
          <circle cx="16" cy="18" r="2" className="fill-primary-500" />
          <circle cx="24" cy="18" r="2" className="fill-primary-500" />
          <path
            d="M15 23H25M20 23V26"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
      <span className={iconContainerStyles}>
        🧠
      </span>
      {showText && (
        <span className={textStyles}>
          BrainBattle
        </span>
      )}
    </Container>
  );
};

export default Logo; 