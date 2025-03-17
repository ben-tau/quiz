import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../atoms/Logo/Logo';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-bold text-white">BrainBattle</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="btn btn-primary">
              Connexion
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Inscription
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-20 pb-32">
        <h1 className="hero-title">
          Affrontez vos amis dans des batailles de connaissances !
        </h1>
        <p className="hero-subtitle">
          Créez des quiz personnalisés, jouez avec vos amis en temps réel et
          découvrez qui sera le champion parmi vous !
        </p>
        <div className="text-center mt-12">
          <Link to="/register" className="btn btn-cta animate-float">
            Commencer l'aventure
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          <div className="feature-card">
            <img 
              src="/icons/gamepad.svg" 
              alt="Manette de jeu"
              className="feature-icon"
            />
            <h3 className="feature-title">Défiez vos amis</h3>
            <p className="feature-description">
              Créez des parties personnalisées et invitez jusqu'à 10 amis pour des duels intellectuels palpitants.
            </p>
          </div>

          <div className="feature-card">
            <img 
              src="/icons/puzzle.svg" 
              alt="Puzzle"
              className="feature-icon"
            />
            <h3 className="feature-title">Questions variées</h3>
            <p className="feature-description">
              Des milliers de questions dans de nombreux thèmes pour tester vos connaissances et celles de vos amis.
            </p>
          </div>

          <div className="feature-card">
            <img 
              src="/icons/trophy.svg" 
              alt="Trophée"
              className="feature-icon"
            />
            <h3 className="feature-title">Montez sur le podium</h3>
            <p className="feature-description">
              Accumulez des points, répondez rapidement et visez la première place dans un classement dynamique.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="text-gray-400">
            © 2025 BrainBattle
          </div>
          <div className="footer-links">
            <Link to="/about" className="nav-link">
              À propos
            </Link>
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
            <Link to="/terms" className="nav-link">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}; 