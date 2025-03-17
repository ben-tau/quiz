import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { authService } from '../../services/authService';

const CreateGamePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = authService.getCurrentUser();
  const selectedThemes = (location.state as any)?.selectedThemes || [];

  const [gameSettings, setGameSettings] = useState({
    questionsPerTheme: 5,
    timePerQuestion: 30,
    maxPlayers: 4
  });

  const [inviteCode, setInviteCode] = useState<string | null>(null);

  const handleCreateGame = () => {
    // Simuler la création d'une partie
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setInviteCode(code);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 to-secondary/10">
      <Header
        isAuthenticated
        user={{
          name: currentUser?.username || '',
          avatarUrl: currentUser?.profilePicture || undefined
        }}
        onLogout={() => {
          authService.logout();
          navigate('/');
        }}
      />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            Créer une nouvelle partie
          </h1>

          {/* Paramètres de la partie */}
          <div className="bg-dark-bg/50 backdrop-blur-sm p-6 rounded-lg border border-white/10 mb-8">
            <h2 className="text-xl font-semibold mb-6">
              Paramètres de la partie
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Questions par thème
                </label>
                <Select
                  value={gameSettings.questionsPerTheme.toString()}
                  onChange={(e) => setGameSettings(prev => ({
                    ...prev,
                    questionsPerTheme: parseInt(e.target.value)
                  }))}
                  options={[
                    { value: '3', label: '3 questions' },
                    { value: '5', label: '5 questions' },
                    { value: '7', label: '7 questions' },
                    { value: '10', label: '10 questions' }
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Temps par question (secondes)
                </label>
                <Select
                  value={gameSettings.timePerQuestion.toString()}
                  onChange={(e) => setGameSettings(prev => ({
                    ...prev,
                    timePerQuestion: parseInt(e.target.value)
                  }))}
                  options={[
                    { value: '15', label: '15 secondes' },
                    { value: '30', label: '30 secondes' },
                    { value: '45', label: '45 secondes' },
                    { value: '60', label: '60 secondes' }
                  ]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Nombre maximum de joueurs
                </label>
                <Select
                  value={gameSettings.maxPlayers.toString()}
                  onChange={(e) => setGameSettings(prev => ({
                    ...prev,
                    maxPlayers: parseInt(e.target.value)
                  }))}
                  options={[
                    { value: '2', label: '2 joueurs' },
                    { value: '4', label: '4 joueurs' },
                    { value: '6', label: '6 joueurs' },
                    { value: '8', label: '8 joueurs' }
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Code d'invitation */}
          {inviteCode ? (
            <div className="bg-success/20 p-6 rounded-lg border border-success/30 text-center">
              <h3 className="text-xl font-semibold mb-4">
                Partie créée avec succès !
              </h3>
              <p className="text-gray-300 mb-4">
                Partagez ce code avec vos amis pour qu'ils puissent rejoindre la partie :
              </p>
              <div className="bg-dark-bg/50 py-3 px-6 rounded-lg inline-block">
                <span className="text-2xl font-mono font-bold tracking-wider">
                  {inviteCode}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                onClick={handleCreateGame}
                disabled={selectedThemes.length === 0}
              >
                Créer la partie
              </Button>
              {selectedThemes.length === 0 && (
                <p className="text-warning mt-4">
                  Veuillez sélectionner au moins un thème pour créer une partie.
                </p>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer
        links={[
          { label: 'Règles du jeu', href: '/rules' },
          { label: 'Support', href: '/support' }
        ]}
      />
    </div>
  );
};

export default CreateGamePage; 