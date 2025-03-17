import { User } from './AuthService.interface';

export interface GameSettings {
  mode: 'classic' | 'time-attack' | 'survival';
  themes: string[];
  maxPlayers: number;
  timePerQuestion: number;
  isPrivate: boolean;
}

export interface GamePlayer extends User {
  status: 'waiting' | 'ready' | 'playing';
  score: number;
  position?: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'qcm' | 'text' | 'timeline' | 'drag-n-drop';
  options?: string[];
  timeLimit: number;
  points: number;
}

export interface Game {
  id: string;
  code: string;
  host: User;
  players: GamePlayer[];
  settings: GameSettings;
  status: 'waiting' | 'starting' | 'in-progress' | 'finished';
  currentQuestion?: Question;
}

export interface AnswerResult {
  correct: boolean;
  points: number;
  correctAnswer: string | number | string[];
  explanation?: string;
}

export interface GameResults {
  gameId: string;
  date: Date;
  players: GamePlayer[];
  themes: string[];
  questions: {
    total: number;
    correct: number;
    averageTime: number;
  };
}

export interface IGameService {
  createGame(settings: GameSettings): Promise<Game>;
  joinGame(code: string): Promise<Game>;
  leaveGame(gameId: string): Promise<void>;
  startGame(gameId: string): Promise<Game>;
  submitAnswer(gameId: string, questionId: string, answer: any, timeSpent: number): Promise<AnswerResult>;
  getGameResults(gameId: string): Promise<GameResults>;
  getActiveGames(): Promise<Game[]>;
  setPlayerReady(gameId: string, ready: boolean): Promise<void>;
  getCurrentGame(): Game | null;
} 