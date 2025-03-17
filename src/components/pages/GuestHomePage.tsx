import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../atoms/Logo/Logo';
import Card from '../atoms/Card/Card';
import Button from '../atoms/Button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Card variant="default" className="p-8 text-center group hover:scale-[1.02] transition-transform">
    <div className="feature-icon mb-6 text-7xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">{title}</h3>
    <p className="text-[#F1F5F9] text-lg leading-relaxed">{description}</p>
  </Card>
);

export const GuestHomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] to-black">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-[#4318FF] to-[#00D1FF] w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(67,24,255,0.3)]">
              <Logo className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-extrabold text-white text-shadow-lg">BrainBattle</span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" href="/login" className="px-8">
              Connexion
            </Button>
            <Button variant="primary" href="/register" className="px-8">
              Inscription
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-4 text-center pt-24">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 max-w-4xl mx-auto leading-tight text-shadow-lg">
          Affrontez vos amis dans des batailles de connaissances !
        </h1>
        <p className="text-xl text-[#F1F5F9] mb-12 max-w-2xl mx-auto leading-relaxed">
          Créez des quiz personnalisés, défiez vos amis en temps réel et découvrez qui est le vrai champion parmi vous.
        </p>
        <Button 
          variant="primary" 
          size="lg" 
          href="/register"
          className="inline-block px-12 py-5 text-xl"
        >
          Commencer l'aventure
        </Button>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
          <FeatureCard
            icon="🎮"
            title="Défiez vos amis"
            description="Créez des parties personnalisées et invitez jusqu'à 10 amis pour des duels intellectuels palpitants."
          />
          <FeatureCard
            icon="🧩"
            title="Questions variées"
            description="Des milliers de questions dans de nombreux thèmes pour tester vos connaissances et celles de vos amis."
          />
          <FeatureCard
            icon="🏆"
            title="Montez sur le podium"
            description="Accumulez des points, répondez rapidement et visez la première place dans un classement dynamique."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-white/10">
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