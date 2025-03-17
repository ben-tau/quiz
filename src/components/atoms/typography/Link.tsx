import React from 'react';
import { twMerge } from 'tailwind-merge';

export type LinkVariant = 'inline' | 'button';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: LinkVariant;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<LinkVariant, string> = {
  inline: 'text-secondary hover:underline focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-dark-bg',
  button: 'inline-flex items-center justify-center px-4 py-2 border border-secondary text-sm font-medium rounded-md text-secondary hover:bg-secondary hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary focus:ring-offset-dark-bg',
};

const Link: React.FC<LinkProps> = ({
  href,
  variant = 'inline',
  external = false,
  children,
  className,
  ...props
}) => {
  const externalProps = external ? {
    target: '_blank',
    rel: 'noopener noreferrer',
  } : {};

  const styles = twMerge(
    'transition-all duration-200',
    variantStyles[variant],
    className
  );

  return (
    <a
      href={href}
      className={styles}
      {...externalProps}
      {...props}
    >
      {children}
      {external && variant === 'inline' && (
        <svg
          className="inline-block ml-1 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </a>
  );
};

export default Link; 