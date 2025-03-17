import { GameResults } from './GameService.interface';

export interface ThemeStats {
  id: string;
  name: string;
  gamesPlayed: number;
  averageScore: number;
  totalCorrectAnswers: number;
  totalQuestions: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  unlockedAt?: Date;
  progress?: number;
  requiredProgress?: number;
}

export interface UserStats {
  gamesPlayed: number;
  victories: number;
  totalScore: number;
  averageScore: number;
  favoriteThemes: ThemeStats[];
  badges: Badge[];
  level: number;
  experiencePoints: number;
  nextLevelPoints: number;
}

export interface GameHistoryFilters {
  page?: number;
  limit?: number;
  themes?: string[];
  mode?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface GameHistoryResponse {
  total: number;
  pages: number;
  games: GameResults[];
}

export interface IProfileService {
  getUserStats(): Promise<UserStats>;
  getGameHistory(filters: GameHistoryFilters): Promise<GameHistoryResponse>;
  updateBadgeProgress(badgeId: string, progress: number): Promise<Badge>;
  getLeaderboard(timeframe: 'daily' | 'weekly' | 'monthly' | 'all-time'): Promise<GameResults[]>;
  getFavoriteThemes(): Promise<ThemeStats[]>;
  getLevel(experiencePoints: number): { level: number; nextLevelPoints: number };
} 