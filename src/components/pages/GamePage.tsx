import React, { useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from '../../hooks/useGameState';
import { QuestionDisplay } from '../organisms/QuestionDisplay/QuestionDisplay';
import { ScoreBoard } from '../organisms/ScoreBoard/ScoreBoard';
import { AnswerFeedback } from '../molecules/AnswerFeedback/AnswerFeedback';
import { Card } from '../atoms/Card/Card';
import Button from '../atoms/Button';

interface GamePageProps {
  gameId: string;
  className?: string;
}

// Type pour correspondre exactement au type attendu par ScoreBoard
type ScoreBoardPlayer = {
  playerId: string;  // Changé de 'id' à 'playerId'
  name: string;
  avatar?: string;
  score: number;
  previousScore?: number;
  rank: number;
  previousRank?: number;
  isCurrentPlayer?: boolean;
};

/**
 * Page principale de jeu
 * @param {GamePageProps} props - Les propriétés du composant
 * @returns {JSX.Element} La page de jeu
 */
export const GamePage: React.FC<GamePageProps> = ({ gameId, className }) => {
  const { state, actions } = useGameState(gameId);
  const {
    phase,
    currentQuestion,
    timeRemaining,
    players,
    playerAnswers,
    currentQuestionIndex,
    totalQuestions,
  } = state;

  // Conversion des joueurs pour le ScoreBoard avec le bon type
  const scoreboardPlayers: ScoreBoardPlayer[] = players.map(player => ({
    playerId: player.id,  // Conversion de id en playerId
    name: player.name,
    avatar: player.avatar,
    score: player.score,
    previousScore: player.previousScore,
    rank: player.rank,
    previousRank: player.previousRank,
    isCurrentPlayer: player.isCurrentPlayer
  }));

  // Effet sonore pour le compte à rebours
  useEffect(() => {
    if (phase === 'question' && timeRemaining <= 3 && timeRemaining > 0) {
      const audio = new Audio('/sounds/tick.mp3');
      audio.play().catch(() => {}); // Ignorer les erreurs de lecture audio
    }
  }, [phase, timeRemaining]);

  // Rendu du contenu en fonction de la phase de jeu
  const renderContent = () => {
    switch (phase) {
      case 'waiting':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full"
          >
            <Card className="p-8 text-center max-w-lg">
              <h2 className="text-3xl font-bold mb-6">Préparez-vous !</h2>
              <p className="text-6xl font-bold text-primary-500 mb-8">
                {timeRemaining}
              </p>
              <p className="text-gray-400">
                La partie va commencer dans quelques secondes...
              </p>
            </Card>
          </motion.div>
        );

      case 'question':
        return currentQuestion && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Question {currentQuestionIndex + 1}/{totalQuestions}
                  </div>
                  <div className="text-sm font-medium text-primary-500">
                    {timeRemaining}s
                  </div>
                </div>
                <QuestionDisplay
                  question={currentQuestion}
                  currentTime={timeRemaining}
                  onTimeEnd={() => actions.submitAnswer(null)}
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <ScoreBoard scores={scoreboardPlayers} />
            </div>
          </div>
        );

      case 'feedback':
        const currentPlayerAnswer = playerAnswers[players.find(p => p.isCurrentPlayer)?.id || ''];
        return currentQuestion && currentPlayerAnswer && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-9">
              <AnswerFeedback
                isCorrect={currentPlayerAnswer.isCorrect}
                correctAnswer={
                  Array.isArray(currentQuestion.correctAnswer)
                    ? currentQuestion.correctAnswer.join(', ')
                    : currentQuestion.correctAnswer as string
                }
                explanation={currentQuestion.explanation}
                pointsEarned={currentPlayerAnswer.pointsEarned}
                timeSpent={currentPlayerAnswer.timeSpent}
              />
              <div className="flex justify-center mt-6">
                <Button
                  onClick={actions.nextQuestion}
                  variant="primary"
                  className="animate-bounce"
                >
                  Question suivante
                </Button>
              </div>
            </div>
            <div className="lg:col-span-3">
              <ScoreBoard scores={scoreboardPlayers} />
            </div>
          </div>
        );

      case 'ended':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <div className="lg:col-span-9">
              <Card className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-6">Partie terminée !</h2>
                <div className="space-y-4">
                  <p className="text-xl">
                    Score final : {players.find(p => p.isCurrentPlayer)?.score} points
                  </p>
                  <p className="text-gray-400">
                    Position : {players.find(p => p.isCurrentPlayer)?.rank}e sur {players.length}
                  </p>
                </div>
                <div className="mt-8 space-x-4">
                  <Button onClick={() => window.location.reload()} variant="primary">
                    Rejouer
                  </Button>
                  <Button onClick={() => window.history.back()} variant="outline">
                    Retour à l'accueil
                  </Button>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-3">
              <ScoreBoard scores={scoreboardPlayers} />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={twMerge(
        'min-h-screen bg-background p-6',
        'flex flex-col',
        className
      )}
    >
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </div>
  );
}; 