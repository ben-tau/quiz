import { FC, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';

/**
 * Props du composant PasswordStrength
 * @property {string} password - Le mot de passe à évaluer
 * @property {string} [className] - Classes CSS additionnelles
 */
interface PasswordStrengthProps {
  password: string;
  className?: string;
}

/**
 * Type pour les niveaux de force du mot de passe
 */
type StrengthLevel = {
  label: string;
  color: string;
  minScore: number;
};

/**
 * Niveaux de force du mot de passe avec leurs caractéristiques
 */
const strengthLevels: StrengthLevel[] = [
  { label: 'Faible', color: 'error', minScore: 0 },
  { label: 'Moyen', color: 'warning', minScore: 40 },
  { label: 'Fort', color: 'success', minScore: 70 },
  { label: 'Très fort', color: 'success', minScore: 90 }
];

/**
 * Composant PasswordStrength - Affiche un indicateur de force du mot de passe
 */
export const PasswordStrength: FC<PasswordStrengthProps> = ({
  password,
  className
}) => {
  // Calcul du score de force du mot de passe
  const score = useMemo(() => {
    if (!password) return 0;

    let score = 0;

    // Longueur minimale
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;

    // Présence de chiffres
    if (/\d/.test(password)) score += 15;

    // Présence de lettres minuscules
    if (/[a-z]/.test(password)) score += 15;

    // Présence de lettres majuscules
    if (/[A-Z]/.test(password)) score += 15;

    // Présence de caractères spéciaux
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 15;

    // Mélange de caractères
    const uniqueChars = new Set(password).size;
    score += Math.min(uniqueChars * 2, 10);

    return Math.min(score, 100);
  }, [password]);

  // Détermination du niveau de force actuel
  const currentLevel = useMemo(() => {
    return strengthLevels
      .slice()
      .reverse()
      .find(level => score >= level.minScore) || strengthLevels[0];
  }, [score]);

  return (
    <div className={twMerge('w-full space-y-2', className)}>
      {/* Barre de progression */}
      <ProgressBar
        value={score}
        max={100}
        variant={currentLevel.color as 'error' | 'warning' | 'success'}
        className="h-1"
      />

      {/* Texte descriptif */}
      <div className={twMerge(
        'flex justify-between items-center text-xs',
        score === 0 && 'opacity-50'
      )}>
        <span className="font-medium text-white/90">
          Force du mot de passe:
        </span>
        <span className={twMerge(
          'font-semibold',
          currentLevel.color === 'error' && 'text-error',
          currentLevel.color === 'warning' && 'text-warning',
          currentLevel.color === 'success' && 'text-success'
        )}>
          {currentLevel.label}
        </span>
      </div>

      {/* Liste des critères (visible uniquement si le score est faible) */}
      {score < 70 && (
        <ul className="text-xs space-y-1 text-white/70 list-disc list-inside">
          {password.length < 8 && (
            <li>Au moins 8 caractères</li>
          )}
          {!/\d/.test(password) && (
            <li>Au moins un chiffre</li>
          )}
          {!/[A-Z]/.test(password) && (
            <li>Au moins une majuscule</li>
          )}
          {!/[!@#$%^&*(),.?":{}|<>]/.test(password) && (
            <li>Au moins un caractère spécial</li>
          )}
        </ul>
      )}
    </div>
  );
}; 