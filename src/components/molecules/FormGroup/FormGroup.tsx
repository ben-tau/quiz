import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Props du composant FormGroup
 * @property {ReactNode} children - Les éléments enfants du groupe de formulaire
 * @property {string} [title] - Le titre/légende du groupe
 * @property {'vertical' | 'horizontal'} [layout] - La disposition des champs (vertical par défaut)
 * @property {'sm' | 'md' | 'lg'} [spacing] - L'espacement entre les champs
 * @property {string} [className] - Classes CSS additionnelles
 */
interface FormGroupProps {
  children: ReactNode;
  title?: string;
  layout?: 'vertical' | 'horizontal';
  spacing?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Composant FormGroup - Regroupe plusieurs champs de formulaire avec une mise en forme cohérente
 */
export const FormGroup: FC<FormGroupProps> = ({
  children,
  title,
  layout = 'vertical',
  spacing = 'md',
  className
}) => {
  // Map des espacements
  const spacingClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  };

  // Map des layouts
  const layoutClasses = {
    vertical: 'flex-col',
    horizontal: 'flex-row items-start'
  };

  return (
    <div className={twMerge('w-full', className)}>
      {/* Titre du groupe */}
      {title && (
        <legend className="text-sm font-semibold text-white/90 mb-3">
          {title}
        </legend>
      )}

      {/* Conteneur des champs */}
      <div
        className={twMerge(
          'flex',
          layoutClasses[layout],
          spacingClasses[spacing],
          layout === 'horizontal' && 'flex-wrap'
        )}
      >
        {children}
      </div>
    </div>
  );
}; 