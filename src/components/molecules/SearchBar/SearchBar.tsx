import { FC, useState, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Input } from '../../atoms/Input';
import { Icon } from '../../atoms/Icon/Icon';
import { Button } from '../../atoms/Button';
import { Spinner } from '../../atoms/Spinner/Spinner';

/**
 * Props du composant SearchBar
 * @property {string} value - La valeur actuelle du champ de recherche
 * @property {(value: string) => void} onChange - Fonction appelée lors du changement de valeur
 * @property {string} [placeholder] - Texte d'aide dans le champ
 * @property {(value: string) => void} [onSearch] - Fonction appelée lors de la recherche
 * @property {boolean} [isLoading] - Si la recherche est en cours
 * @property {string[]} [suggestions] - Liste des suggestions
 * @property {(suggestion: string) => void} [onSuggestionClick] - Fonction appelée lors du clic sur une suggestion
 * @property {string} [className] - Classes CSS additionnelles
 */
interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
  isLoading?: boolean;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  className?: string;
}

/**
 * Composant SearchBar - Barre de recherche avec suggestions et état de chargement
 */
export const SearchBar: FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Rechercher...',
  onSearch,
  isLoading = false,
  suggestions = [],
  onSuggestionClick,
  className
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gestion du clic en dehors des suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gestion de la touche Entrée
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
      setShowSuggestions(false);
    }
  };

  // Gestion du focus
  const handleFocus = () => {
    setIsFocused(true);
    setShowSuggestions(true);
  };

  // Gestion du clic sur une suggestion
  const handleSuggestionClick = (suggestion: string) => {
    onChange(suggestion);
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    }
    setShowSuggestions(false);
  };

  return (
    <div
      ref={containerRef}
      className={twMerge(
        'relative w-full',
        className
      )}
    >
      {/* Conteneur de la barre de recherche */}
      <div className="relative flex items-center">
        {/* Icône de recherche */}
        <div className="absolute left-3 text-white/60">
          <Icon name="search" className="w-5 h-5" />
        </div>

        {/* Champ de recherche */}
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={twMerge(
            'pl-10 pr-10',
            'bg-dark-bg/50 border-white/20',
            'focus:border-secondary focus:ring-1 focus:ring-secondary',
            isFocused && 'border-secondary'
          )}
        />

        {/* Indicateur de chargement ou bouton de réinitialisation */}
        {(isLoading || value) && (
          <div className="absolute right-3">
            {isLoading ? (
              <Spinner size="sm" className="text-secondary" />
            ) : (
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onChange('')}
                className="text-white/60 hover:text-white"
              >
                <Icon name="x" className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Liste des suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-dark-bg border border-white/20 rounded-md shadow-lg">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={twMerge(
                'w-full px-4 py-2 text-left text-sm',
                'hover:bg-secondary/10 transition-colors',
                'focus:outline-none focus:bg-secondary/10'
              )}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}; 