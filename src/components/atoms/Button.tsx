import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Composant Button pour BrainBattle
 * 
 * @example
 * // Bouton primaire basique
 * <Button>Cliquez-moi</Button>
 * 
 * // Bouton outline avec icône
 * <Button variant="outline" leftIcon={<IconComponent />}>Avec icône</Button>
 * 
 * // Bouton désactivé
 * <Button isDisabled>Désactivé</Button>
 * 
 * // Bouton de chargement pleine largeur
 * <Button isLoading fullWidth>Chargement...</Button>
 */

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Contenu du bouton */
  children: React.ReactNode;
  /** Variante de style du bouton */
  variant?: 'primary' | 'outline' | 'text' | 'danger';
  /** Taille du bouton */
  size?: 'sm' | 'md' | 'lg';
  /** Icône à afficher à gauche */
  leftIcon?: React.ReactNode;
  /** Icône à afficher à droite */
  rightIcon?: React.ReactNode;
  /** État désactivé */
  isDisabled?: boolean;
  /** État de chargement */
  isLoading?: boolean;
  /** Occuper toute la largeur disponible */
  fullWidth?: boolean;
  /** Classes CSS additionnelles */
  className?: string;
  /** Href pour les liens */
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      isDisabled = false,
      isLoading = false,
      fullWidth = false,
      className = '',
      href,
      ...props
    },
    ref
  ) => {
    // Styles de base communs à toutes les variantes
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg disabled:cursor-not-allowed disabled:opacity-60';

    // Styles spécifiques aux variantes
    const variantStyles = {
      primary: 'bg-[#4318FF] hover:bg-[#3A16E0] text-white shadow-md hover:shadow-lg focus:ring-[#4318FF]/50',
      outline: 'bg-[#00D1FF] text-white hover:bg-[#00BFEB] focus:ring-[#00D1FF]/50',
      text: 'text-secondary hover:bg-secondary/10 focus:ring-secondary/50',
      danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500/50'
    };

    // Styles spécifiques aux tailles
    const sizeStyles = {
      sm: 'text-sm px-4 py-2 gap-1.5',
      md: 'text-base px-6 py-2.5 gap-2',
      lg: 'text-lg px-8 py-4 gap-3 font-bold'
    };

    // Animation de chargement
    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    const classes = twMerge(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? 'w-full' : '',
      className
    );

    if (href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {isLoading && <LoadingSpinner />}
          {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
          <span>{children}</span>
          {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={isDisabled || isLoading}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {isLoading && <LoadingSpinner />}
        {!isLoading && leftIcon && <span className="inline-flex">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 