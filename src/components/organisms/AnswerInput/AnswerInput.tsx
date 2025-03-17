import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../atoms/Button';
import { Input } from '../../atoms/Input';
import { FormControl } from '../../atoms/FormControl/FormControl';

export interface AnswerInputProps {
  questionType: 'qcm' | 'text' | 'timeline' | 'drag-n-drop';
  options?: Array<{ id: string; text: string }>;
  onSubmit: (answer: string | string[] | Date) => void;
  isDisabled?: boolean;
  className?: string;
}

/**
 * Composant de saisie des réponses adaptatif selon le type de question
 * @param {AnswerInputProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant AnswerInput
 */
export const AnswerInput: React.FC<AnswerInputProps> = ({
  questionType,
  options = [],
  onSubmit,
  isDisabled = false,
  className
}) => {
  const [textAnswer, setTextAnswer] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [dateAnswer, setDateAnswer] = useState<Date | null>(null);

  // Gestion des réponses QCM
  const handleQcmSelection = (optionId: string) => {
    if (isDisabled) return;
    
    const newSelection = selectedOptions.includes(optionId)
      ? selectedOptions.filter(id => id !== optionId)
      : [...selectedOptions, optionId];
    
    setSelectedOptions(newSelection);
  };

  // Gestion de la soumission
  const handleSubmit = () => {
    if (isDisabled) return;

    switch (questionType) {
      case 'qcm':
        onSubmit(selectedOptions);
        break;
      case 'text':
        onSubmit(textAnswer);
        break;
      case 'timeline':
        if (dateAnswer) onSubmit(dateAnswer);
        break;
      case 'drag-n-drop':
        onSubmit(selectedOptions);
        break;
    }
  };

  // Rendu des différents types d'input
  const renderInput = () => {
    switch (questionType) {
      case 'qcm':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map(option => (
              <Button
                key={option.id}
                onClick={() => handleQcmSelection(option.id)}
                variant={selectedOptions.includes(option.id) ? 'primary' : 'secondary'}
                disabled={isDisabled}
                className="w-full text-left p-4 transition-all duration-200 hover:scale-102"
              >
                {option.text}
              </Button>
            ))}
          </div>
        );

      case 'text':
        return (
          <FormControl>
            <Input
              type="text"
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              placeholder="Saisissez votre réponse..."
              disabled={isDisabled}
              className="w-full"
            />
          </FormControl>
        );

      case 'timeline':
        return (
          <FormControl>
            <Input
              type="date"
              value={dateAnswer?.toISOString().split('T')[0] || ''}
              onChange={(e) => setDateAnswer(new Date(e.target.value))}
              disabled={isDisabled}
              className="w-full"
            />
          </FormControl>
        );

      case 'drag-n-drop':
        // Note: L'implémentation du drag-n-drop nécessitera une bibliothèque dédiée
        return (
          <div className="p-4 border-2 border-dashed rounded-lg">
            <p className="text-center text-gray-500">
              Fonctionnalité drag-n-drop en cours d'implémentation
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={twMerge('w-full space-y-4', className)}>
      {renderInput()}
      
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isDisabled}
          variant="primary"
          className="mt-4"
        >
          Valider
        </Button>
      </div>
    </div>
  );
}; 