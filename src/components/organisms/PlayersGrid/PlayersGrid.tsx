import React from 'react';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';
import { Card } from '../../atoms/Card/Card';
import { Icon } from '../../atoms/Icon/Icon';

/**
 * Interface pour un joueur
 */
interface Player {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  isReady: boolean;
}

/**
 * Props du composant PlayersGrid
 * @property {Array<Player>} players - Liste des joueurs dans la partie
 * @property {number} [maxPlayers] - Nombre maximum de joueurs autorisés
 * @property {string} [className] - Classes CSS additionnelles
 */
interface PlayersGridProps {
  players: Player[];
  maxPlayers?: number;
  className?: string;
}

/**
 * Composant PlayersGrid - Grille des joueurs dans la salle d'attente
 */
export const PlayersGrid: React.FC<PlayersGridProps> = ({
  players,
  maxPlayers = 10,
  className
}) => {
  // Calcul des emplacements vides restants
  const remainingSlots = Math.max(0, maxPlayers - players.length);

  return (
    <div className={twMerge('space-y-4', className)}>
      {/* En-tête avec compteur de joueurs */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon
            name="UsersIcon"
            className="w-5 h-5 text-secondary"
          />
          <h3 className="font-semibold text-white">
            Joueurs dans la partie
          </h3>
        </div>
        <span className="text-sm text-white/60">
          {players.length}/{maxPlayers} joueurs
        </span>
      </div>

      {/* Grille des joueurs */}
      <div className={twMerge(
        'grid gap-4',
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
      )}>
        {/* Cartes des joueurs présents */}
        {players.map(player => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative"
          >
            <Card className="p-4">
              <div className="flex items-center gap-3">
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
                  {player.isHost && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-900/50 text-blue-300">
                      <Icon name="CrownIcon" className="w-3 h-3 mr-1" />
                      Hôte
                    </span>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Emplacements vides */}
        {Array.from({ length: remainingSlots }).map((_, index) => (
          <motion.div
            key={`empty-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <Card className={twMerge(
              'aspect-square',
              'border-2 border-dashed border-white/10',
              'flex items-center justify-center',
              'bg-dark-bg/30'
            )}>
              <div className="text-center">
                <Icon
                  name="UserPlusIcon"
                  className="w-8 h-8 text-white/20 mx-auto mb-2"
                />
                <span className="text-sm text-white/40">
                  Place disponible
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Message d'information */}
      <div className={twMerge(
        'flex items-center gap-2 p-3',
        'bg-secondary/10 rounded-lg',
        'border-l-4 border-secondary'
      )}>
        <Icon
          name="InformationCircleIcon"
          className="w-5 h-5 text-secondary"
        />
        <p className="text-sm text-white/90">
          La partie commencera lorsque tous les joueurs seront prêts.
        </p>
      </div>
    </div>
  );
}; 