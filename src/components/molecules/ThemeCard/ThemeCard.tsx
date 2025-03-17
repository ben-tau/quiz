import { FC } from 'react';
import { twMerge } from 'tailwind-merge';
import { Badge } from '../../atoms/Badge/Badge';
import { Card } from '../../atoms/Card/Card';
import { Icon } from '../../atoms/Icon/Icon';

/**
 * Interface pour les propriétés d'un thème
 */
interface Theme {
  id: string;
  name: string;
  icon: string;
  questionsCount: number;
  difficulty: number;
}

/**
 * Props du composant ThemeCard
 * @property {Theme} theme - Les données du thème à afficher
 * @property {boolean} [isSelected] - Si le thème est sélectionné
 * @property {boolean} [isDisabled] - Si le thème est désactivé
 * @property {() => void} [onToggle] - Fonction appelée lors du clic sur la carte
 * @property {string} [className] - Classes CSS additionnelles
 */
interface ThemeCardProps {
  theme: Theme;
  isSelected?: boolean;
  isDisabled?: boolean;
  onToggle?: () => void;
  className?: string;
}

/**
 * Composant ThemeCard - Affiche une carte de thème pour la sélection dans le jeu
 */
export const ThemeCard: FC<ThemeCardProps> = ({
  theme,
  isSelected = false,
  isDisabled = false,
  onToggle,
  className
}) => {
  const renderDifficultyDots = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div
        key={index}
        className={twMerge(
          'w-1.5 h-1.5 rounded-full',
          index < theme.difficulty
            ? 'bg-accent-2'
            : 'bg-white/30'
        )}
      />
    ));
  };

  return (
    <Card
      onClick={!isDisabled ? onToggle : undefined}
      className={twMerge(
        'relative aspect-square p-4 transition-all duration-300',
        'flex flex-col items-center justify-center gap-2',
        'cursor-pointer hover:transform hover:-translate-y-1',
        isSelected && 'border-accent bg-secondary/10',
        isDisabled && 'opacity-50 cursor-not-allowed',
        !isSelected && !isDisabled && 'hover:border-secondary',
        className
      )}
    >
      {/* Badge de sélection */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent text-dark-bg flex items-center justify-center text-xs font-bold">
          ✓
        </div>
      )}

      {/* Icône du thème */}
      <div className="text-3xl mb-2">
        <Icon name={theme.icon} />
      </div>

      {/* Nom du thème */}
      <h3 className="text-sm font-bold text-center mb-1">
        {theme.name}
      </h3>

      {/* Nombre de questions */}
      <Badge
        variant="accent"
        className="text-xs"
      >
        {theme.questionsCount} questions
      </Badge>

      {/* Indicateur de difficulté */}
      <div className="flex gap-1 mt-2">
        {renderDifficultyDots()}
      </div>
    </Card>
  );
}; 