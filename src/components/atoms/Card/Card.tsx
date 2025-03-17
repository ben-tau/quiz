import React from 'react';
import { twMerge } from 'tailwind-merge';

// Types pour les props des sous-composants
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

// Props du composant principal Card
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

// Sous-composants
const CardHeader = ({ className, children, ...props }: CardHeaderProps) => {
  return (
    <div 
      className={twMerge('px-6 py-4 border-b border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardBody = ({ className, children, ...props }: CardBodyProps) => {
  return (
    <div 
      className={twMerge('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ className, children, ...props }: CardFooterProps) => {
  return (
    <div 
      className={twMerge('px-6 py-4 border-t border-white/10', className)}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Composant Card avec effet de verre dépoli
 * @param {CardProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant Card
 */
export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(
        'bg-surface/30 backdrop-blur-sm',
        'border border-white/[0.08]',
        'rounded-xl shadow-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Attachement des sous-composants
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter; 