import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import confetti from 'canvas-confetti';
import { Card } from '../../atoms/Card/Card';
import { motion } from 'framer-motion';

export interface AnswerFeedbackProps {
  isCorrect: boolean;
  correctAnswer: string;
  explanation?: string;
  pointsEarned?: number;
  timeSpent?: number;
  className?: string;
}

/**
 * Composant de feedback pour les réponses aux questions
 * @param {AnswerFeedbackProps} props - Les propriétés du composant
 * @returns {JSX.Element} Le composant AnswerFeedback
 */
export const AnswerFeedback: React.FC<AnswerFeedbackProps> = ({
  isCorrect,
  correctAnswer,
  explanation,
  pointsEarned = 0,
  timeSpent,
  className
}) => {
  // Effet pour lancer les confettis en cas de bonne réponse
  useEffect(() => {
    if (isCorrect) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isCorrect]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={twMerge('w-full max-w-2xl mx-auto', className)}
    >
      <Card className={twMerge(
        'p-6',
        'transform transition-all duration-300',
        isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
      )}>
        {/* Icône et message principal */}
        <div className="flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            className={twMerge(
              'w-16 h-16 rounded-full flex items-center justify-center text-3xl',
              isCorrect ? 'bg-green-500/30' : 'bg-red-500/30'
            )}
          >
            {isCorrect ? '✓' : '✗'}
          </motion.div>
        </div>

        {/* Message de résultat */}
        <h2 className={twMerge(
          'text-2xl font-bold text-center mb-4',
          isCorrect ? 'text-green-500' : 'text-red-500'
        )}>
          {isCorrect ? 'Bonne réponse !' : 'Mauvaise réponse'}
        </h2>

        {/* Points et temps */}
        <div className="flex justify-center gap-6 mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-400">Points gagnés</p>
            <p className="text-xl font-bold text-primary-500">
              {pointsEarned}
            </p>
          </div>
          {timeSpent !== undefined && (
            <div className="text-center">
              <p className="text-sm text-gray-400">Temps</p>
              <p className="text-xl font-bold text-primary-500">
                {timeSpent.toFixed(1)}s
              </p>
            </div>
          )}
        </div>

        {/* Réponse correcte */}
        <div className="bg-surface/30 backdrop-blur-sm rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-400 mb-2">
            La bonne réponse était :
          </p>
          <p className="text-lg font-medium text-white">
            {correctAnswer}
          </p>
        </div>

        {/* Explication */}
        {explanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4"
          >
            <p className="text-sm text-gray-400 mb-2">Explication :</p>
            <p className="text-white/80">{explanation}</p>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
}; 