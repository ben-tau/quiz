import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '../context/SocketContext';
import { Question, Player, Answer, GameState } from '../services/gameStateService';

interface GameSessionState {
  status: 'playing' | 'correction' | 'finished';
  currentQuestion: Question | null;
  timeLeft: number;
  players: Player[];
  scores: Record<string, number>;
  currentRound: number;
  totalRounds: number;
  answers: Record<string, Answer>;
}

interface UseGameSessionReturn {
  gameState: GameSessionState;
  submitAnswer: (answer: any) => void;
  isAnswered: boolean;
  error: string | null;
}

export const useGameSession = (gameId: string): UseGameSessionReturn => {
  const { socket } = useSocket();
  const [error, setError] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameSessionState>({
    status: 'playing',
    currentQuestion: null,
    timeLeft: 0,
    players: [],
    scores: {},
    currentRound: 0,
    totalRounds: 0,
    answers: {}
  });

  useEffect(() => {
    if (!socket) return;

    socket.on('game:question', handleNewQuestion);
    socket.on('game:timer', handleTimer);
    socket.on('game:answer', handlePlayerAnswer);
    socket.on('game:correction', handleCorrection);
    socket.on('game:scores', handleScores);
    socket.on('game:end', handleGameEnd);
    socket.on('error', handleError);

    return () => {
      socket.off('game:question');
      socket.off('game:timer');
      socket.off('game:answer');
      socket.off('game:correction');
      socket.off('game:scores');
      socket.off('game:end');
      socket.off('error');
    };
  }, [socket]);

  const handleNewQuestion = useCallback((data: { 
    question: Question, 
    round: number, 
    total: number 
  }) => {
    setGameState(prev => ({
      ...prev,
      status: 'playing',
      currentQuestion: data.question,
      timeLeft: data.question.timeLimit,
      currentRound: data.round,
      totalRounds: data.total,
      answers: {}
    }));
  }, []);

  const handleTimer = useCallback((data: { timeLeft: number }) => {
    setGameState(prev => ({
      ...prev,
      timeLeft: data.timeLeft
    }));
  }, []);

  const handlePlayerAnswer = useCallback((data: {
    playerId: string,
    answer: Answer
  }) => {
    setGameState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [data.playerId]: data.answer
      }
    }));
  }, []);

  const handleCorrection = useCallback((data: {
    correctAnswer: any,
    explanation?: string,
    playerResults: Array<{
      playerId: string,
      isCorrect: boolean,
      points: number,
      timeSpent: number
    }>
  }) => {
    setGameState(prev => ({
      ...prev,
      status: 'correction',
      players: prev.players.map(player => {
        const result = data.playerResults.find(r => r.playerId === player.id);
        if (!result) return player;
        return {
          ...player,
          score: (prev.scores[player.id] || 0) + result.points
        };
      })
    }));
  }, []);

  const handleScores = useCallback((data: { scores: Record<string, number> }) => {
    setGameState(prev => ({
      ...prev,
      scores: data.scores
    }));
  }, []);

  const handleGameEnd = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      status: 'finished'
    }));
  }, []);

  const handleError = useCallback((error: { message: string }) => {
    setError(error.message);
    setTimeout(() => setError(null), 5000);
  }, []);

  const submitAnswer = useCallback((answer: any) => {
    if (!socket || !gameState.currentQuestion) return;

    const timeSpent = gameState.currentQuestion.timeLimit - gameState.timeLeft;
    
    socket.emit('game:answer', {
      gameId,
      questionId: gameState.currentQuestion.id,
      answer,
      timeSpent
    });
  }, [socket, gameId, gameState.currentQuestion, gameState.timeLeft]);

  const isAnswered = useCallback(() => {
    if (!socket || !gameState.answers) return false;
    return Object.keys(gameState.answers).some(playerId => 
      playerId === socket.getUserId()
    );
  }, [socket, gameState.answers]);

  return {
    gameState,
    submitAnswer,
    isAnswered: isAnswered(),
    error
  };
}; 