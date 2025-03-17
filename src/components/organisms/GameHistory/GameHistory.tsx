import React, { memo, useCallback } from 'react';
import { FixedSizeList } from 'react-window';
import { GameHistoryEntry } from '../../../services/profileService';
import { formatDate } from '../../../utils/dateUtils';

interface GameHistoryProps {
  games: GameHistoryEntry[];
  onViewDetails: (gameId: string) => void;
  className?: string;
}

const GameRow = memo(({ data, index, style }: any) => {
  const { games, onViewDetails } = data;
  const game = games[index];

  return (
    <div style={style} className="hover:bg-blue-900/20">
      <div className="flex items-center px-4 py-3">
        <div className="w-24 text-left">{formatDate(game.date)}</div>
        <div className="flex-1 text-left">
          <div className="flex gap-1">
            {game.themes.map(theme => (
              <span 
                key={theme} 
                className="text-sm px-2 py-1 bg-blue-900/30 rounded-md"
                role="status"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
        <div className="w-20 text-center" role="cell">{game.playerCount}</div>
        <div className="w-20 text-center" role="cell">
          <span className={`font-bold ${game.position === 1 ? 'text-yellow-400' : ''}`}>
            {game.position}
          </span>
        </div>
        <div className="w-24 text-right font-medium" role="cell">{game.score}</div>
        <div className="w-24 text-right">
          <button 
            className="text-sm px-3 py-1 bg-blue-600/50 hover:bg-blue-600/80 rounded-md transition-colors"
            onClick={() => onViewDetails(game.id)}
            aria-label={`Voir les détails de la partie du ${formatDate(game.date)}`}
          >
            Détails
          </button>
        </div>
      </div>
    </div>
  );
});

GameRow.displayName = 'GameRow';

export const GameHistory: React.FC<GameHistoryProps> = memo(({ 
  games, 
  onViewDetails,
  className 
}) => {
  const itemData = { games, onViewDetails };

  const renderHeader = useCallback(() => (
    <div className="bg-gray-900/70 px-4 py-3 flex items-center">
      <div className="w-24 text-left" role="columnheader">Date</div>
      <div className="flex-1 text-left" role="columnheader">Thèmes</div>
      <div className="w-20 text-center" role="columnheader">Joueurs</div>
      <div className="w-20 text-center" role="columnheader">Position</div>
      <div className="w-24 text-right" role="columnheader">Score</div>
      <div className="w-24 text-right" role="columnheader">Actions</div>
    </div>
  ), []);

  return (
    <div className={className}>
      <div 
        className="bg-gray-800/60 rounded-lg overflow-hidden"
        role="table"
        aria-label="Historique des parties"
      >
        {renderHeader()}
        <FixedSizeList
          height={400}
          width="100%"
          itemCount={games.length}
          itemSize={70}
          itemData={itemData}
        >
          {GameRow}
        </FixedSizeList>
      </div>
    </div>
  );
}); 