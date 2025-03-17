export interface Player {
  id: string;
  name: string;
  isBot?: boolean;
  isReady: boolean;
  isHost?: boolean;
  score: number;
  answers: Answer[];
}

export interface Answer {
  questionId: string;
  answer: any;
  timeSpent: number;
  isCorrect?: boolean;
  points?: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'qcm' | 'text' | 'timeline' | 'drag-n-drop';
  options?: Array<{ id: string; text: string; isCorrect?: boolean }>;
  correctAnswer?: any;
  timeLimit: number;
  points: number;
}

export interface GameSettings {
  questionsCount: number;
  timePerQuestion: number;
  randomOrder: boolean;
  showLeaderboardAfterEach: boolean;
  allowGuests: boolean;
}

export interface GameState {
  id: string;
  status: 'waiting' | 'playing' | 'correction' | 'finished';
  players: Record<string, Player>;
  settings: GameSettings;
  questions?: Question[];
  currentQuestionIndex?: number;
  startTime?: number;
  endTime?: number;
}

const DEFAULT_SETTINGS: GameSettings = {
  questionsCount: 10,
  timePerQuestion: 20,
  randomOrder: true,
  showLeaderboardAfterEach: true,
  allowGuests: true
};

class GameStateService {
  private games: Record<string, GameState> = {};

  constructor() {
    this.loadPersistedGames();
  }

  private loadPersistedGames() {
    try {
      const savedGames = localStorage.getItem('brainbattle_games');
      if (savedGames) {
        this.games = JSON.parse(savedGames);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des parties sauvegardées:', error);
    }
  }

  private persistGames() {
    try {
      localStorage.setItem('brainbattle_games', JSON.stringify(this.games));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des parties:', error);
    }
  }

  createGame(gameId: string, hostId: string, hostName: string): GameState {
    const newGame: GameState = {
      id: gameId,
      status: 'waiting',
      players: {
        [hostId]: {
          id: hostId,
          name: hostName,
          isHost: true,
          isReady: false,
          score: 0,
          answers: []
        }
      },
      settings: { ...DEFAULT_SETTINGS }
    };

    this.games[gameId] = newGame;
    this.persistGames();
    return newGame;
  }

  loadGameState(gameId: string): GameState | null {
    return this.games[gameId] || null;
  }

  updateGameState(gameId: string, updater: (state: GameState) => GameState) {
    if (!this.games[gameId]) return null;

    const updatedState = updater(this.games[gameId]);
    this.games[gameId] = updatedState;
    this.persistGames();
    return updatedState;
  }

  addPlayer(gameId: string, player: Omit<Player, 'score' | 'answers'>) {
    return this.updateGameState(gameId, (state) => ({
      ...state,
      players: {
        ...state.players,
        [player.id]: {
          ...player,
          score: 0,
          answers: []
        }
      }
    }));
  }

  removePlayer(gameId: string, playerId: string) {
    return this.updateGameState(gameId, (state) => {
      const { [playerId]: removed, ...remainingPlayers } = state.players;
      return {
        ...state,
        players: remainingPlayers
      };
    });
  }

  setPlayerReady(gameId: string, playerId: string, isReady: boolean) {
    return this.updateGameState(gameId, (state) => ({
      ...state,
      players: {
        ...state.players,
        [playerId]: {
          ...state.players[playerId],
          isReady
        }
      }
    }));
  }

  updateSettings(gameId: string, settings: Partial<GameSettings>) {
    return this.updateGameState(gameId, (state) => ({
      ...state,
      settings: {
        ...state.settings,
        ...settings
      }
    }));
  }

  startGame(gameId: string, questions: Question[]) {
    return this.updateGameState(gameId, (state) => ({
      ...state,
      status: 'playing',
      questions,
      currentQuestionIndex: 0,
      startTime: Date.now()
    }));
  }

  submitAnswer(gameId: string, playerId: string, answer: Answer) {
    return this.updateGameState(gameId, (state) => ({
      ...state,
      players: {
        ...state.players,
        [playerId]: {
          ...state.players[playerId],
          answers: [...state.players[playerId].answers, answer],
          score: state.players[playerId].score + (answer.points || 0)
        }
      }
    }));
  }

  endGame(gameId: string) {
    return this.updateGameState(gameId, (state) => ({
      ...state,
      status: 'finished',
      endTime: Date.now()
    }));
  }

  deleteGame(gameId: string) {
    const { [gameId]: removed, ...remainingGames } = this.games;
    this.games = remainingGames;
    this.persistGames();
  }
}

export const gameStateService = new GameStateService(); 