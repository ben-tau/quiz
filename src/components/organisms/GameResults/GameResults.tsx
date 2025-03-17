import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';
import { Card } from '../../atoms/Card/Card';
import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { StatsChart } from './StatsChart';
import { PlayerStats } from './PlayerStats';
import { ThemeStats } from './ThemeStats';

interface Player {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  stats: {
    correctAnswers: number;
    totalAnswers: number;
    averageTime: number;
    pointsPerQuestion: number;
  };
}

interface GameResultsProps {
  players: Player[];
  currentPlayerId: string;
  onPlayAgain: () => void;
  onNewGame: () => void;
  onHome: () => void;
  className?: string;
}

// Composant pour le podium
const Podium: React.FC<{ players: Player[]; currentPlayerId: string }> = ({
  players,
  currentPlayerId
}) => {
  const [winner, secondPlace, thirdPlace] = players;
  const isCurrentUserWinner = winner?.id === currentPlayerId;

  useEffect(() => {
    if (isCurrentUserWinner) {
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: NodeJS.Timeout = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isCurrentUserWinner]);

  return (
    <div className="relative flex justify-center items-end mt-8 mb-16">
      {/* 2ème place */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-gray-300">
          <img src={secondPlace?.avatar || '/avatars/default.png'} alt={secondPlace?.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-lg font-semibold">{secondPlace?.name}</div>
        <div className="text-sm text-blue-300 font-medium">{secondPlace?.score} pts</div>
        <div className="bg-surface/50 h-24 w-24 flex items-center justify-center rounded-t-lg mt-2">
          <span className="text-2xl font-bold">2</span>
        </div>
      </motion.div>

      {/* 1ère place */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="flex flex-col items-center -mt-8 mx-4"
      >
        <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-4 border-yellow-400 shadow-lg">
          <img src={winner?.avatar || '/avatars/default.png'} alt={winner?.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-xl font-bold">{winner?.name}</div>
        <div className="text-lg text-yellow-400 font-semibold">{winner?.score} pts</div>
        <div className="bg-yellow-600/50 h-32 w-32 flex items-center justify-center rounded-t-lg mt-4">
          <span className="text-3xl font-bold">1</span>
        </div>
      </motion.div>

      {/* 3ème place */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="w-14 h-14 rounded-full overflow-hidden mb-2 border-2 border-amber-700">
          <img src={thirdPlace?.avatar || '/avatars/default.png'} alt={thirdPlace?.name} className="w-full h-full object-cover" />
        </div>
        <div className="text-base font-medium">{thirdPlace?.name}</div>
        <div className="text-sm text-amber-500">{thirdPlace?.score} pts</div>
        <div className="bg-amber-900/50 h-20 w-20 flex items-center justify-center rounded-t-lg mt-2">
          <span className="text-xl font-bold">3</span>
        </div>
      </motion.div>
    </div>
  );
};

// Composant pour les statistiques détaillées
const DetailedStats: React.FC<{ players: Player[] }> = ({ players }) => {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-surface/50">
              <th className="px-4 py-3 text-left">Joueur</th>
              <th className="px-4 py-3 text-right">Score</th>
              <th className="px-4 py-3 text-right">Bonnes réponses</th>
              <th className="px-4 py-3 text-right">Temps moyen</th>
              <th className="px-4 py-3 text-right">Points/Question</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <motion.tr
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-t border-white/10"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={player.avatar || '/avatars/default.png'}
                      alt={player.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{player.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  {player.score}
                </td>
                <td className="px-4 py-3 text-right">
                  {Math.round((player.stats.correctAnswers / player.stats.totalAnswers) * 100)}%
                </td>
                <td className="px-4 py-3 text-right">
                  {player.stats.averageTime.toFixed(1)}s
                </td>
                <td className="px-4 py-3 text-right">
                  {player.stats.pointsPerQuestion}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

/**
 * Composant d'affichage des résultats de fin de partie
 */
export const GameResults: React.FC<GameResultsProps> = ({
  players,
  currentPlayerId,
  onPlayAgain,
  onNewGame,
  onHome,
  className
}) => {
  // Trier les joueurs par score
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  // Sauvegarder les résultats dans le localStorage
  useEffect(() => {
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    const currentGame = {
      date: new Date().toISOString(),
      players: sortedPlayers,
      currentPlayerId
    };
    localStorage.setItem('gameHistory', JSON.stringify([currentGame, ...gameHistory]));
  }, [sortedPlayers, currentPlayerId]);

  return (
    <div className={twMerge('max-w-7xl mx-auto p-6', className)}>
      {/* Titre animé */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-8"
      >
        Résultats de la partie
      </motion.h1>

      {/* Podium */}
      <Podium players={sortedPlayers} currentPlayerId={currentPlayerId} />

      {/* Statistiques détaillées */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Statistiques détaillées</h2>
        <DetailedStats players={sortedPlayers} />
      </motion.div>

      {/* Actions post-partie */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <Button
          variant="primary"
          onClick={onPlayAgain}
          className="min-w-[200px]"
        >
          <Icon name="ArrowPathIcon" className="w-5 h-5 mr-2" />
          Rejouer
        </Button>

        <Button
          variant="secondary"
          onClick={onNewGame}
          className="min-w-[200px]"
        >
          <Icon name="PlusCircleIcon" className="w-5 h-5 mr-2" />
          Nouvelle partie
        </Button>

        <Button
          variant="outline"
          onClick={onHome}
          className="min-w-[200px]"
        >
          <Icon name="HomeIcon" className="w-5 h-5 mr-2" />
          Accueil
        </Button>

        <Button
          variant="outline"
          onClick={() => {
            // Simulation du partage
            alert('Partage simulé des résultats !');
          }}
          className="min-w-[200px]"
        >
          <Icon name="ShareIcon" className="w-5 h-5 mr-2" />
          Partager
        </Button>
      </motion.div>
    </div>
  );
}; 