import React from 'react';
import { motion } from 'framer-motion';

interface PlayerStatsProps {
  players: Array<{
    id: string;
    name: string;
    score: number;
    correctAnswers: number;
    totalAnswers: number;
    averageTime: number;
    isCurrentPlayer?: boolean;
  }>;
}

export const PlayerStats: React.FC<PlayerStatsProps> = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-4">
      {sortedPlayers.map((player, index) => {
        const successRate = (player.correctAnswers / player.totalAnswers) * 100;
        
        return (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg ${
              player.isCurrentPlayer ? 'bg-primary/20' : 'bg-surface/50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{player.name}</span>
              <span className="text-sm text-gray-400">
                {player.score} points
              </span>
            </div>
            
            <div className="space-y-2">
              {/* Barre de progression des bonnes réponses */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Bonnes réponses</span>
                  <span>{successRate.toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-surface/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${successRate}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </div>

              {/* Temps moyen de réponse */}
              <div className="flex justify-between text-sm">
                <span>Temps moyen</span>
                <span>{player.averageTime.toFixed(1)}s</span>
              </div>

              {/* Ratio de réponses */}
              <div className="flex justify-between text-sm">
                <span>Ratio</span>
                <span>
                  {player.correctAnswers}/{player.totalAnswers}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}; 