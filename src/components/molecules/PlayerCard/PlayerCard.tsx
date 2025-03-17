import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { Card } from '../../atoms/Card/Card';
import { Badge } from '../../atoms/Badge/Badge';

interface PlayerCardProps {
  player?: {
    id: string;
    name: string;
    avatar?: string;
    isHost?: boolean;
    isReady?: boolean;
  };
  isEmpty?: boolean;
  onKick?: () => void;
  className?: string;
}

/**
 * Carte affichant les informations d'un joueur ou un emplacement vide
 * @param {PlayerCardProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant PlayerCard
 */
export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isEmpty,
  onKick,
  className
}) => {
  if (isEmpty) {
    return (
      <Card
        className={twMerge(
          'flex items-center justify-center p-4',
          'border border-dashed border-white/10',
          'min-h-[120px]',
          className
        )}
      >
        <p className="text-sm text-gray-500">En attente...</p>
      </Card>
    );
  }

  if (!player) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={className}
    >
      <Card className="relative p-4">
        {/* Avatar et nom */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img
              src={player.avatar || '/avatars/default.png'}
              alt={player.name}
              className="w-10 h-10 rounded-full bg-gray-700"
            />
            {player.isReady && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-surface" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-sm">{player.name}</h3>
            <div className="flex gap-2 mt-1">
              {player.isHost && (
                <Badge variant="primary" size="sm">
                  Hôte
                </Badge>
              )}
              {player.isReady && (
                <Badge variant="success" size="sm">
                  Prêt
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Bouton d'expulsion */}
        {onKick && (
          <button
            onClick={onKick}
            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-400 transition-colors"
            title="Expulser le joueur"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        )}
      </Card>
    </motion.div>
  );
}; 