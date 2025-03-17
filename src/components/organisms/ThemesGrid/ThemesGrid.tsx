import { FC, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ThemeCard } from '../../molecules/ThemeCard';
import { Icon } from '../../atoms/Icon/Icon';

/**
 * Interface pour un thème
 */
interface Theme {
  id: string;
  name: string;
  icon: string;
  questionsCount: number;
  difficulty: 1 | 2 | 3; // 1: Facile, 2: Moyen, 3: Difficile
}

/**
 * Props du composant ThemesGrid
 * @property {Array<Theme>} themes - Liste des thèmes disponibles
 * @property {string[]} selectedThemeIds - IDs des thèmes sélectionnés
 * @property {(themeId: string) => void} onThemeToggle - Callback de sélection/désélection
 * @property {number} [minQuestions] - Nombre minimum de questions requis
 * @property {string} [className] - Classes CSS additionnelles
 */
interface ThemesGridProps {
  themes: Theme[];
  selectedThemeIds: string[];
  onThemeToggle: (themeId: string) => void;
  minQuestions?: number;
  className?: string;
}

/**
 * Composant ThemesGrid - Grille de sélection des thèmes
 */
export const ThemesGrid: FC<ThemesGridProps> = ({
  themes,
  selectedThemeIds,
  onThemeToggle,
  minQuestions = 20,
  className
}) => {
  // Calcul du nombre total de questions sélectionnées
  const totalQuestions = useMemo(() => {
    return themes
      .filter(theme => selectedThemeIds.includes(theme.id))
      .reduce((sum, theme) => sum + theme.questionsCount, 0);
  }, [themes, selectedThemeIds]);

  // Détermine si le nombre minimum de questions est atteint
  const hasEnoughQuestions = totalQuestions >= minQuestions;

  return (
    <div className={twMerge('space-y-6', className)}>
      {/* Grille des thèmes */}
      <div className={twMerge(
        'grid gap-4',
        'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
      )}>
        {themes.map(theme => (
          <ThemeCard
            key={theme.id}
            name={theme.name}
            icon={theme.icon}
            questionsCount={theme.questionsCount}
            difficulty={theme.difficulty}
            isSelected={selectedThemeIds.includes(theme.id)}
            onClick={() => onThemeToggle(theme.id)}
            className="transition-transform hover:scale-[1.02]"
          />
        ))}
      </div>

      {/* Compteur et message d'aide */}
      <div className={twMerge(
        'bg-dark-bg/50 rounded-lg p-4',
        'border border-white/10'
      )}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              name={hasEnoughQuestions ? 'check-circle' : 'info'}
              className={twMerge(
                'w-5 h-5',
                hasEnoughQuestions ? 'text-success' : 'text-warning'
              )}
            />
            <span className="font-medium text-white">
              Questions sélectionnées :
              <span className={twMerge(
                'ml-2 font-bold',
                hasEnoughQuestions ? 'text-success' : 'text-warning'
              )}>
                {totalQuestions}
              </span>
            </span>
          </div>
          <span className="text-sm text-white/60">
            Minimum requis : {minQuestions}
          </span>
        </div>

        {/* Message d'aide ou d'erreur */}
        {!hasEnoughQuestions && (
          <p className="mt-2 text-sm text-warning/90">
            Sélectionnez plus de thèmes pour atteindre le minimum de {minQuestions} questions.
          </p>
        )}
      </div>
    </div>
  );
}; 