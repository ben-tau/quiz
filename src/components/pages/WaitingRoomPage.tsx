import React, { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../atoms/Card/Card';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { PlayersGrid } from '../../organisms/PlayersGrid/PlayersGrid';
import { useToast } from '../../hooks/useToast';
import { useSocket } from '../../hooks/useSocket';
import { useGameSettings } from '../../hooks/useGameSettings';

interface WaitingRoomPageProps {
  roomId: string;
  isHost?: boolean;
  className?: string;
}

interface Player {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  isReady: boolean;
}

interface Theme {
  id: string;
  name: string;
  selected: boolean;
}

// Composant pour le code d'invitation
const InviteCode: React.FC<{ gameCode: string }> = ({ gameCode }) => {
  const [codeCopied, setCodeCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(gameCode);
      setCodeCopied(true);
      showToast('Code copié !', 'success');
      setTimeout(() => setCodeCopied(false), 2000);
    } catch (error) {
      showToast('Erreur lors de la copie', 'error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center mb-8"
    >
      <h3 className="text-sm uppercase text-blue-300 mb-1">Code d'invitation</h3>
      <div className="text-3xl font-mono tracking-wider mb-2 bg-surface/50 py-2 px-6 rounded-lg border border-white/10">
        {gameCode}
      </div>
      <Button
        onClick={handleCopyCode}
        variant="secondary"
        size="sm"
        className="flex items-center gap-2"
      >
        <span>Copier</span>
        <Icon name="DocumentDuplicateIcon" className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

// Composant pour les options de partie
const GameSettings: React.FC = () => {
  const { settings, updateSettings } = useGameSettings();

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Options de la partie</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Thèmes</label>
          <div className="grid grid-cols-2 gap-2">
            {settings.themes.map((theme: Theme) => (
              <Button
                key={theme.id}
                variant={theme.selected ? "primary" : "secondary"}
                onClick={() => updateSettings('themes', theme.id)}
                className="justify-start"
              >
                {theme.name}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Nombre de questions</label>
          <input
            type="range"
            min="5"
            max="20"
            value={settings.questionsCount}
            onChange={(e) => updateSettings('questionsCount', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>5</span>
            <span>{settings.questionsCount}</span>
            <span>20</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Temps par question (secondes)</label>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={settings.timePerQuestion}
            onChange={(e) => updateSettings('timePerQuestion', parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-400">
            <span>10s</span>
            <span>{settings.timePerQuestion}s</span>
            <span>60s</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4">
          <label className="text-sm font-medium">Questions aléatoires</label>
          <button
            onClick={() => updateSettings('randomOrder', !settings.randomOrder)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.randomOrder ? 'bg-primary' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                settings.randomOrder ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </Card>
  );
};

/**
 * Page de salle d'attente où les joueurs se préparent avant le début d'une partie
 */
export const WaitingRoomPage: React.FC<WaitingRoomPageProps> = ({
  roomId,
  isHost = false,
  className
}) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [isReady, setIsReady] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isEveryoneReady, setIsEveryoneReady] = useState(false);

  useEffect(() => {
    if (!socket) return;

    // Écouter les événements socket
    socket.on('playerJoined', (newPlayer: Player) => {
      setPlayers(current => [...current, newPlayer]);
    });

    socket.on('playerLeft', (playerId: string) => {
      setPlayers(current => current.filter(p => p.id !== playerId));
    });

    socket.on('playerReady', (playerId: string) => {
      setPlayers(current =>
        current.map(p =>
          p.id === playerId ? { ...p, isReady: true } : p
        )
      );
    });

    socket.on('gameStarting', () => {
      navigate(`/game/${roomId}`);
    });

    return () => {
      socket.off('playerJoined');
      socket.off('playerLeft');
      socket.off('playerReady');
      socket.off('gameStarting');
    };
  }, [socket, roomId, navigate]);

  useEffect(() => {
    setIsEveryoneReady(
      players.length >= 2 && players.every(p => p.isReady)
    );
  }, [players]);

  const handleReady = () => {
    setIsReady(!isReady);
    socket?.emit('playerReady', { roomId, ready: !isReady });
  };

  const handleStart = () => {
    if (isEveryoneReady) {
      socket?.emit('startGame', { roomId });
    }
  };

  const handleLeave = () => {
    socket?.emit('leaveRoom', { roomId });
    navigate('/');
  };

  return (
    <div
      className={twMerge(
        'min-h-screen bg-background p-6',
        'grid grid-cols-1 lg:grid-cols-12 gap-6',
        className
      )}
    >
      {/* Colonne principale */}
      <div className="lg:col-span-8 space-y-6">
        {/* Code d'invitation */}
        <InviteCode gameCode={roomId} />

        {/* Liste des joueurs */}
        <PlayersGrid
          players={players}
          maxPlayers={10}
          className="mb-6"
        />

        {/* Boutons d'action */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            variant={isReady ? "success" : "primary"}
            onClick={handleReady}
            className="min-w-[150px]"
          >
            {isReady ? "Je ne suis plus prêt" : "Je suis prêt"}
          </Button>

          {isHost && (
            <Button
              variant="primary"
              onClick={handleStart}
              disabled={!isEveryoneReady}
              className="min-w-[150px]"
            >
              Démarrer la partie
            </Button>
          )}

          <Button
            variant="danger"
            onClick={handleLeave}
            className="min-w-[150px]"
          >
            Quitter la salle
          </Button>
        </div>
      </div>

      {/* Colonne latérale */}
      <div className="lg:col-span-4 space-y-6">
        {/* Options de partie (hôte uniquement) */}
        {isHost && <GameSettings />}

        {/* Statut des joueurs */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Statut</h2>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <Icon
                name={isEveryoneReady ? "CheckCircleIcon" : "ClockIcon"}
                className={isEveryoneReady ? "text-green-500" : "text-yellow-500"}
              />
              <span>
                {isEveryoneReady
                  ? "Tout le monde est prêt !"
                  : "En attente des joueurs..."}
              </span>
            </p>
            <p className="text-sm text-gray-400">
              {players.length} joueur{players.length > 1 ? "s" : ""} dans la salle
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}; 