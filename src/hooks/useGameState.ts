import { useState, useEffect, useCallback } from 'react';
import { MockQuestion, mockQuestions, generateRandomAnswer, simulateNetworkDelay } from '../data/mockQuestions';

export type GamePhase = 'waiting' | 'question' | 'feedback' | 'results' | 'ended';

export interface Player {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  previousScore?: number;
  rank: number;
  previousRank?: number;
  isCurrentPlayer?: boolean;
}

export interface GameState {
  phase: GamePhase;
  currentQuestion: MockQuestion | null;
  timeRemaining: number;
  playerAnswers: Record<string, any>;
  players: Player[];
  currentQuestionIndex: number;
  totalQuestions: number;
}

export interface GameActions {
  startGame: () => void;
  submitAnswer: (answer: any) => void;
  nextQuestion: () => void;
  endGame: () => void;
}

const MOCK_PLAYERS: Player[] = [
  { id: 'p1', name: 'Vous', score: 0, rank: 1, isCurrentPlayer: true },
  { id: 'p2', name: 'Alice', score: 0, rank: 2, avatar: '/avatars/alice.jpg' },
  { id: 'p3', name: 'Bob', score: 0, rank: 3, avatar: '/avatars/bob.jpg' },
  { id: 'p4', name: 'Charlie', score: 0, rank: 4, avatar: '/avatars/charlie.jpg' },
];

export const useGameState = (gameId: string) => {
  const [state, setState] = useState<GameState>({
    phase: 'waiting',
    currentQuestion: null,
    timeRemaining: 3, // Compte à rebours initial
    playerAnswers: {},
    players: MOCK_PLAYERS,
    currentQuestionIndex: 0,
    totalQuestions: mockQuestions.length,
  });

  // Mise à jour des rangs des joueurs
  const updatePlayerRanks = useCallback((players: Player[]) => {
    return [...players]
      .sort((a, b) => b.score - a.score)
      .map((player, index) => ({
        ...player,
        previousRank: player.rank,
        rank: index + 1,
      }));
  }, []);

  // Démarrage du jeu
  const startGame = useCallback(() => {
    setState(prev => ({
      ...prev,
      phase: 'question',
      currentQuestion: mockQuestions[0],
      timeRemaining: mockQuestions[0].timeLimit,
    }));
  }, []);

  // Soumission d'une réponse
  const submitAnswer = useCallback(async (answer: any) => {
    if (!state.currentQuestion) return;

    // Simuler un délai réseau
    await simulateNetworkDelay();

    setState(prev => {
      const currentPlayer = prev.players.find(p => p.isCurrentPlayer);
      if (!currentPlayer) return prev;

      const isCorrect = Array.isArray(state.currentQuestion?.correctAnswer)
        ? JSON.stringify(answer) === JSON.stringify(state.currentQuestion.correctAnswer)
        : answer === state.currentQuestion?.correctAnswer;

      const pointsEarned = isCorrect
        ? Math.round(
            state.currentQuestion.points *
            (1 + (state.timeRemaining / state.currentQuestion.timeLimit) * 0.5)
          )
        : 0;

      const updatedPlayers = prev.players.map(player => {
        if (player.isCurrentPlayer) {
          return {
            ...player,
            previousScore: player.score,
            score: player.score + pointsEarned,
          };
        }
        return player;
      });

      return {
        ...prev,
        phase: 'feedback',
        playerAnswers: {
          ...prev.playerAnswers,
          [currentPlayer.id]: {
            answer,
            isCorrect,
            pointsEarned,
            timeSpent: prev.currentQuestion!.timeLimit - prev.timeRemaining,
          },
        },
        players: updatePlayerRanks(updatedPlayers),
      };
    });
  }, [state.currentQuestion, state.timeRemaining, updatePlayerRanks]);

  // Passage à la question suivante
  const nextQuestion = useCallback(() => {
    setState(prev => {
      const nextIndex = prev.currentQuestionIndex + 1;
      
      if (nextIndex >= prev.totalQuestions) {
        return { ...prev, phase: 'ended' };
      }

      const nextQuestion = mockQuestions[nextIndex];
      return {
        ...prev,
        phase: 'question',
        currentQuestion: nextQuestion,
        timeRemaining: nextQuestion.timeLimit,
        currentQuestionIndex: nextIndex,
        playerAnswers: {},
      };
    });
  }, []);

  // Fin du jeu
  const endGame = useCallback(() => {
    setState(prev => ({ ...prev, phase: 'ended' }));
  }, []);

  // Gestion du timer et des réponses simulées
  useEffect(() => {
    if (state.phase !== 'question' || state.timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setState(prev => {
        if (prev.timeRemaining <= 1) {
          clearInterval(timer);
          return {
            ...prev,
            timeRemaining: 0,
            phase: 'feedback',
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    // Simulation des réponses des autres joueurs
    const simulateOtherPlayers = async () => {
      if (!state.currentQuestion) return;

      for (const player of state.players) {
        if (player.isCurrentPlayer) continue;

        const delay = Math.random() * (state.currentQuestion.timeLimit * 800);
        setTimeout(async () => {
          const { isCorrect, timeSpent, answer } = generateRandomAnswer(state.currentQuestion!);
          const pointsEarned = isCorrect
            ? Math.round(
                state.currentQuestion!.points *
                (1 + (timeSpent / state.currentQuestion!.timeLimit) * 0.5)
              )
            : 0;

          setState(prev => {
            const updatedPlayers = prev.players.map(p => {
              if (p.id === player.id) {
                return {
                  ...p,
                  previousScore: p.score,
                  score: p.score + pointsEarned,
                };
              }
              return p;
            });

            return {
              ...prev,
              playerAnswers: {
                ...prev.playerAnswers,
                [player.id]: { answer, isCorrect, pointsEarned, timeSpent },
              },
              players: updatePlayerRanks(updatedPlayers),
            };
          });
        }, delay);
      }
    };

    simulateOtherPlayers();

    return () => clearInterval(timer);
  }, [state.phase, state.timeRemaining, state.currentQuestion, updatePlayerRanks]);

  return {
    state,
    actions: {
      startGame,
      submitAnswer,
      nextQuestion,
      endGame,
    },
  };
}; 