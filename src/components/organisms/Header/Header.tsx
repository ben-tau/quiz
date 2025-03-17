import React from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Logo } from '../../atoms/Logo/Logo';

interface HeaderProps {
  className?: string;
}

/**
 * Composant Header - Barre de navigation principale de l'application
 */
export const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={twMerge(
      'fixed top-0 left-0 right-0 bg-surface border-b border-border z-50',
      className
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo et titre */}
          <Link to="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold text-text">
              BrainBattle
            </span>
          </Link>

          {/* Navigation et actions */}
          <nav className="flex items-center gap-6">
            <Link
              to="/themes"
              className="text-text hover:text-primary transition-colors"
            >
              Thèmes
            </Link>
            <span className="text-text">|</span>
            <Link
              to="/leaderboard"
              className="text-text hover:text-primary transition-colors"
            >
              Classement
            </Link>
            <Link
              to="/create-game"
              className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Créer une partie
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}; 