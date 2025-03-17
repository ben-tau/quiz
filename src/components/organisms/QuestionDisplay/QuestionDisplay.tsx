import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { Card } from '../../atoms/Card/Card';
import { ProgressBar } from '../../atoms/ProgressBar/ProgressBar';
import { Badge } from '../../atoms/Badge/Badge';

export interface QuestionDisplayProps {
  question: {
    id: string;
    text: string;
    type: 'qcm' | 'text' | 'timeline' | 'drag-n-drop';
    options?: Array<{ id: string; text: string }>;
    media?: { type: 'image' | 'audio' | 'video'; url: string };
    difficulty: 1 | 2 | 3 | 4 | 5;
    timeLimit: number;
  };
  currentTime: number;
  onTimeEnd: () => void;
  className?: string;
}

/**
 * Composant d'affichage des questions pour BrainBattle
 * @param {QuestionDisplayProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant QuestionDisplay
 */
export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  currentTime,
  onTimeEnd,
  className
}) => {
  // Calcul du temps restant en pourcentage
  const timeProgress = (currentTime / question.timeLimit) * 100;

  // Effet pour l'animation de progression
  useEffect(() => {
    if (timeProgress <= 0) {
      onTimeEnd();
    }
  }, [timeProgress, onTimeEnd]);

  // Couleur du timer basée sur le temps restant
  const getTimerColor = () => {
    if (timeProgress > 66) return 'bg-green-500';
    if (timeProgress > 33) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Rendu des étoiles de difficulté
  const renderDifficultyStars = () => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`h-4 w-4 transform transition-transform hover:scale-110 ${
              index < question.difficulty
                ? 'text-yellow-500'
                : 'text-gray-600'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Rendu du média associé à la question
  const renderMedia = () => {
    if (!question.media) return null;

    const mediaClasses = "mt-4 transform transition-all duration-300 hover:scale-[1.02] rounded-lg overflow-hidden";

    return (
      <div className={mediaClasses}>
        {question.media.type === 'image' ? (
          <img
            src={question.media.url}
            alt="Question media"
            className="max-h-64 w-auto mx-auto rounded-lg object-contain"
            loading="lazy"
          />
        ) : question.media.type === 'audio' ? (
          <div className="bg-surface/30 backdrop-blur-sm p-4 rounded-lg">
            <audio
              controls
              className="w-full"
              src={question.media.url}
            >
              Votre navigateur ne supporte pas l'élément audio.
            </audio>
          </div>
        ) : (
          <video
            controls
            className="max-h-64 w-auto mx-auto rounded-lg"
            src={question.media.url}
          >
            Votre navigateur ne supporte pas l'élément vidéo.
          </video>
        )}
      </div>
    );
  };

  return (
    <div 
      className={twMerge(
        'w-full max-w-3xl mx-auto transform transition-all duration-300 animate-fade-in', 
        className
      )}
    >
      <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
        {/* En-tête avec timer et difficulté */}
        <div className="flex justify-between items-center mb-4">
          <Badge 
            variant="primary"
            className="transform transition-transform hover:scale-105"
          >
            {question.type.toUpperCase()}
          </Badge>
          {renderDifficultyStars()}
        </div>

        {/* Timer */}
        <ProgressBar
          value={timeProgress}
          className={`mb-6 h-2 transition-all duration-300 ${getTimerColor()}`}
        />

        {/* Texte de la question */}
        <h2 className="text-xl font-semibold mb-4 text-white animate-slide-up">
          {question.text}
        </h2>

        {/* Média */}
        {renderMedia()}
      </Card>
    </div>
  );
}; 