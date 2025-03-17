import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Card } from '../../atoms/Card/Card';
import { motion, AnimatePresence } from 'framer-motion';

export interface ScoreBoardProps {
  scores: Array<{
    playerId: string;
    name: string;
    avatar?: string;
    score: number;
    previousScore?: number;
    rank: number;
    previousRank?: number;
    isCurrentPlayer?: boolean;
  }>;
  showAnimation?: boolean;
  className?: string;
}

/**
 * Tableau de bord des scores en temps réel
 * @param {ScoreBoardProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant ScoreBoard
 */
export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  scores,
  showAnimation = true,
  className
}) => {
  const [sortedScores, setSortedScores] = useState(scores);

  // Tri et mise à jour des scores
  useEffect(() => {
    const newSortedScores = [...scores].sort((a, b) => b.score - a.score);
    setSortedScores(newSortedScores);
  }, [scores]);

  // Animation pour le changement de position
  const scoreVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  // Rendu d'une ligne de score
  const renderScoreRow = (player: typeof scores[0], index: number) => {
    const scoreChange = player.score - (player.previousScore ?? player.score);
    const rankChange = (player.previousRank ?? player.rank) - player.rank;

    return (
      <motion.div
        key={player.playerId}
        variants={scoreVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={twMerge(
          'flex items-center p-4 rounded-lg mb-2',
          'bg-surface/30 backdrop-blur-sm',
          'border border-white/[0.08]',
          player.isCurrentPlayer && 'ring-2 ring-primary-500',
          'transform transition-transform hover:scale-[1.02]'
        )}
      >
        {/* Rang */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-surface text-2xl font-bold">
          {player.rank}
          {rankChange > 0 && (
            <span className="ml-1 text-sm text-green-500">↑{rankChange}</span>
          )}
          {rankChange < 0 && (
            <span className="ml-1 text-sm text-red-500">↓{Math.abs(rankChange)}</span>
          )}
        </div>

        {/* Avatar et nom */}
        <div className="flex items-center flex-1 ml-4">
          {player.avatar && (
            <img
              src={player.avatar}
              alt={`Avatar de ${player.name}`}
              className="w-10 h-10 rounded-full mr-3"
            />
          )}
          <span className="font-semibold text-lg">{player.name}</span>
        </div>

        {/* Score */}
        <div className="flex items-center">
          <span className="text-2xl font-bold">{player.score}</span>
          {scoreChange !== 0 && (
            <span
              className={twMerge(
                'ml-2 text-sm',
                scoreChange > 0 ? 'text-green-500' : 'text-red-500'
              )}
            >
              {scoreChange > 0 ? '+' : ''}{scoreChange}
            </span>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <Card className={twMerge('p-6', className)}>
      <h2 className="text-xl font-bold mb-6">Classement</h2>
      <AnimatePresence>
        <div className="space-y-2">
          {sortedScores.map((score, index) => renderScoreRow(score, index))}
        </div>
      </AnimatePresence>
    </Card>
  );
}; 