import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceFactory } from '../../../services/ServiceFactory';
import { Button } from '../../atoms/Button/Button';
import { LoadingSpinner } from '../../atoms/LoadingSpinner/LoadingSpinner';
import { useToast } from '../../../hooks/useToast';

interface DevUser {
  email: string;
  password: string;
  username: string;
  role: 'user' | 'admin';
}

const DEV_USERS: DevUser[] = [
  {
    email: 'user@test.com',
    password: 'test123',
    username: 'TestUser',
    role: 'user'
  },
  {
    email: 'admin@test.com',
    password: 'admin123',
    username: 'TestAdmin',
    role: 'admin'
  }
];

export const DevPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadingUser, setLoadingUser] = useState<string | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const authService = ServiceFactory.getInstance().getAuthService();

  const handleQuickLogin = useCallback(async (user: DevUser) => {
    setLoadingUser(user.email);
    try {
      await authService.login({
        email: user.email,
        password: user.password
      });
      
      showToast({
        type: 'success',
        message: `Connecté en tant que ${user.username}`
      });
      
      setIsOpen(false);
      navigate('/home');
    } catch (error) {
      showToast({
        type: 'error',
        message: 'Erreur de connexion rapide'
      });
      console.error('Erreur de connexion rapide:', error);
    } finally {
      setLoadingUser(null);
    }
  }, [authService, navigate, showToast]);

  const handleLogout = useCallback(async () => {
    try {
      await authService.logout();
      showToast({
        type: 'info',
        message: 'Déconnexion réussie'
      });
      navigate('/login');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  }, [authService, navigate, showToast]);

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2"
      >
        {isOpen ? 'Fermer' : 'Dev Panel'}
      </Button>

      {isOpen && (
        <div className="bg-surface p-4 rounded-lg shadow-lg w-80">
          <h3 className="text-lg font-semibold mb-4">Panneau Développeur</h3>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium mb-2">Connexion Rapide</h4>
            {DEV_USERS.map(user => (
              <div key={user.email} className="flex items-center justify-between">
                <span className="text-sm">
                  {user.username} ({user.role})
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleQuickLogin(user)}
                  isLoading={loadingUser === user.email}
                  loadingText="Connexion..."
                >
                  Connecter
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="w-full"
            >
              Déconnexion
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 