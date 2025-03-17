import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Props du composant Footer
 * @property {string} [className] - Classes CSS additionnelles
 * @property {Array<{ label: string, href: string }>} [links] - Liste des liens à afficher dans le footer
 */
interface FooterProps {
  className?: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
}

/**
 * Composant Footer - Pied de page de l'application
 */
export const Footer: FC<FooterProps> = ({
  className,
  links = [
    { label: 'À propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: "Conditions d'utilisation", href: '/terms' }
  ]
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={twMerge(
      'w-full border-t border-white/10',
      'bg-dark-bg/80 backdrop-blur-sm',
      'py-6 px-6',
      className
    )}>
      <div className={twMerge(
        'max-w-7xl mx-auto',
        'flex flex-col md:flex-row items-center justify-between',
        'gap-4'
      )}>
        {/* Copyright */}
        <div className="text-white/60 text-sm">
          © {currentYear} BrainBattle
        </div>

        {/* Liste des liens */}
        <nav className="flex flex-wrap items-center gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={twMerge(
                'text-sm text-white/80 hover:text-white',
                'transition-colors duration-200',
                'hover:underline underline-offset-4'
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}; 