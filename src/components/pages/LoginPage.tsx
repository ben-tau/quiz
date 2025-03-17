import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';
import { LoginForm } from '../organisms/LoginForm';
import { authService } from '../../services/authService';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = async (data: { username: string; password: string; rememberMe: boolean }) => {
    try {
      setIsLoading(true);
      setError(undefined);
      await authService.login({ email: data.username, password: data.password });
      navigate('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 to-secondary/10">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Connexion
            </h1>
            <p className="text-gray-400">
              Heureux de vous revoir ! Connectez-vous pour continuer.
            </p>
          </div>

          <div className="bg-dark-bg/50 backdrop-blur-sm p-8 rounded-lg border border-white/10">
            <LoginForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
              onForgotPassword={() => navigate('/forgot-password')}
              onRegister={() => navigate('/register')}
            />
          </div>
        </div>
      </main>

      <Footer
        links={[
          { label: 'Aide', href: '/help' },
          { label: 'Contact', href: '/contact' }
        ]}
      />
    </div>
  );
};

export default LoginPage; 