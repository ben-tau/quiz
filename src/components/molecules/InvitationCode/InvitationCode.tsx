import { FC, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon/Icon';

/**
 * Props du composant InvitationCode
 * @property {string} code - Le code d'invitation à afficher
 * @property {() => void} [onCopy] - Fonction appelée après la copie du code
 * @property {string} [className] - Classes CSS additionnelles
 */
interface InvitationCodeProps {
  code: string;
  onCopy?: () => void;
  className?: string;
}

/**
 * Composant InvitationCode - Affiche un code d'invitation avec possibilité de copie
 */
export const InvitationCode: FC<InvitationCodeProps> = ({
  code,
  onCopy,
  className
}) => {
  const [showCopied, setShowCopied] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Réinitialiser le message "Copié" après 2 secondes
  useEffect(() => {
    if (showCopied) {
      const timer = setTimeout(() => {
        setShowCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showCopied]);

  // Animation périodique pour attirer l'attention
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Gestion de la copie du code
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setShowCopied(true);
      onCopy?.();
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  return (
    <div className={twMerge(
      'flex flex-col items-center',
      className
    )}>
      {/* Conteneur du code */}
      <div className={twMerge(
        'bg-dark-bg/80 border-2 border-secondary',
        'rounded-lg px-8 py-4 mb-6',
        'flex items-center gap-4',
        'shadow-lg shadow-secondary/20',
        isAnimating && 'animate-pulse'
      )}>
        {/* Code formaté */}
        <span className={twMerge(
          'text-4xl font-extrabold tracking-[0.25em]',
          'text-white select-all',
          'text-shadow-glow'
        )}>
          {code}
        </span>

        {/* Bouton de copie */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className={twMerge(
            'rounded-full bg-secondary text-white',
            'hover:bg-accent-2 hover:scale-110',
            'transition-all duration-300',
            'shadow-md shadow-secondary/30'
          )}
        >
          <Icon
            name={showCopied ? 'check' : 'copy'}
            className="w-5 h-5"
          />
        </Button>
      </div>

      {/* Message d'information */}
      <div className={twMerge(
        'flex items-center gap-2 text-sm',
        'bg-accent/10 border-l-4 border-accent',
        'px-4 py-3 rounded-r-md'
      )}>
        <Icon
          name="info"
          className="text-accent"
        />
        <p className="text-white/90">
          Partagez ce code avec vos amis pour qu'ils puissent rejoindre la partie
        </p>
      </div>
    </div>
  );
}; 