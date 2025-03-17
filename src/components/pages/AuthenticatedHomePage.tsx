import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../atoms/Logo/Logo';

interface ThemeCardProps {
  icon: string;
  title: string;
  questionCount: number;
  className?: string;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ icon, title, questionCount, className }) => (
  <div className={`bg-[#0F172A] rounded-lg p-6 hover:transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-[#3B82F6]/20 hover:border-[#3B82F6] hover:shadow-xl ${className}`}>
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 mb-4 text-[#3B82F6]">
        <img src={icon} alt={title} className="w-full h-full" />
      </div>
      <h3 className="text-[#F1F5F9] text-lg font-semibold mb-2">{title}</h3>
      <p className="text-[#FACC15] text-sm font-medium">{questionCount} questions</p>
    </div>
  </div>
);

interface StepCardProps {
  number: number;
  icon: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, icon, title, description }) => (
  <div className="bg-[#0F172A]/50 rounded-lg p-6 relative border border-[#3B82F6]/20 hover:border-[#3B82F6] transition-all duration-300 hover:transform hover:-translate-y-1">
    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#EC4899] flex items-center justify-center text-white font-bold shadow-lg">
      {number}
    </div>
    <div className="flex flex-col items-center text-center">
      <div className="w-10 h-10 mb-4 text-[#3B82F6]">
        <img src={icon} alt={title} className="w-full h-full" />
      </div>
      <h3 className="text-[#F1F5F9] text-lg font-semibold mb-2">{title}</h3>
      <p className="text-[#F1F5F9]/80 text-sm">{description}</p>
    </div>
  </div>
);

export const AuthenticatedHomePage: React.FC = () => {
  const userName = "Thomas"; // À remplacer par le vrai nom d'utilisateur

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-black">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 border-b border-white/10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-extrabold text-white text-shadow">BrainBattle</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-semibold shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              T
            </div>
            <span className="text-[#F1F5F9] font-semibold">{userName}</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.1)_0%,transparent_70%)] rounded-full -z-10 opacity-50" />
          <h1 className="text-4xl font-extrabold text-white mb-4 text-shadow">
            Bienvenue, {userName} !
          </h1>
          <p className="text-[#F1F5F9]/80 text-xl mb-12 max-w-2xl mx-auto">
            Prêt à défier vos amis dans une bataille de connaissances ?
          </p>
          <button className="inline-flex items-center gap-3 px-12 py-6 text-2xl font-bold text-white bg-gradient-to-r from-[#3B82F6] to-[#EC4899] rounded-lg shadow-[0_8px_25px_rgba(59,130,246,0.3)] hover:shadow-[0_12px_30px_rgba(59,130,246,0.5)] hover:transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
            <img src="/icons/gamepad.svg" alt="" className="w-6 h-6" />
            Créer une partie
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>
        </div>

        {/* How to Play Section */}
        <div className="max-w-4xl mx-auto mb-20 bg-[#0F172A]/70 rounded-lg p-10 border border-[#3B82F6]/20 backdrop-blur-xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-10 text-center relative inline-block left-1/2 -translate-x-1/2">
            Comment jouer
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#3B82F6] to-[#EC4899] rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              number={1}
              icon="/icons/dice.svg"
              title="Créez une partie"
              description="Choisissez vos thèmes préférés et définissez les paramètres du jeu selon vos envies."
            />
            <StepCard
              number={2}
              icon="/icons/users.svg"
              title="Invitez des amis"
              description="Partagez le code d'invitation pour que vos amis puissent rejoindre la partie."
            />
            <StepCard
              number={3}
              icon="/icons/trophy.svg"
              title="Affrontez-vous"
              description="Répondez aux questions et découvrez qui est le plus cultivé parmi vous !"
            />
          </div>
        </div>

        {/* Available Themes Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-10 relative inline-block">
            Thèmes disponibles
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#3B82F6] to-[#EC4899] rounded-full" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ThemeCard
              icon="/icons/history.svg"
              title="Histoire"
              questionCount={154}
            />
            <ThemeCard
              icon="/icons/cinema.svg"
              title="Cinéma"
              questionCount={208}
            />
            <ThemeCard
              icon="/icons/science.svg"
              title="Sciences"
              questionCount={172}
            />
            <ThemeCard
              icon="/icons/geography.svg"
              title="Géographie"
              questionCount={143}
            />
            <ThemeCard
              icon="/icons/literature.svg"
              title="Littérature"
              questionCount={112}
            />
            <ThemeCard
              icon="/icons/culture.svg"
              title="Culture Générale"
              questionCount={247}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-6 border-t border-[#3B82F6]/20">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm text-[#F1F5F9]/60">
          <div>© 2025 BrainBattle</div>
          <div className="flex gap-6">
            <Link to="/about" className="hover:text-white transition-colors">
              À propos
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}; 