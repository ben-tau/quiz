import { formatDate } from '../utils/dateUtils';

export interface UserStats {
  gamesPlayed: number;
  victories: number;
  totalScore: number;
  totalQuestions: number;
  totalCorrectAnswers: number;
  averageResponseTime: number;
  favoriteThemes: Array<{
    id: string;
    name: string;
    icon: string;
    score: number;
    gamesPlayed: number;
  }>;
}

export interface GameHistoryEntry {
  id: string;
  date: Date;
  themes: string[];
  playerCount: number;
  position: number;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  averageResponseTime: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  progress?: number;
  requiredProgress?: number;
}

export interface PerformanceData {
  date: string;
  score: number;
  avgScore: number;
}

export interface ThemePerformance {
  theme: string;
  score: number;
  average: number;
}

class ProfileService {
  private generateMockStats(userId: string): UserStats {
    return {
      gamesPlayed: Math.floor(Math.random() * 100) + 20,
      victories: Math.floor(Math.random() * 50) + 10,
      totalScore: Math.floor(Math.random() * 10000) + 2000,
      totalQuestions: Math.floor(Math.random() * 1000) + 200,
      totalCorrectAnswers: Math.floor(Math.random() * 800) + 100,
      averageResponseTime: Math.random() * 10 + 2,
      favoriteThemes: [
        { id: '1', name: 'Histoire', icon: '📚', score: 85, gamesPlayed: 15 },
        { id: '2', name: 'Sciences', icon: '🔬', score: 75, gamesPlayed: 12 },
        { id: '3', name: 'Géographie', icon: '🌍', score: 90, gamesPlayed: 18 },
        { id: '4', name: 'Sport', icon: '⚽', score: 65, gamesPlayed: 8 }
      ]
    };
  }

  private generateMockGameHistory(userId: string): GameHistoryEntry[] {
    const history: GameHistoryEntry[] = [];
    const now = new Date();

    for (let i = 0; i < 20; i++) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      history.push({
        id: `game-${i}`,
        date,
        themes: ['Histoire', 'Géographie', 'Sciences'].slice(0, Math.floor(Math.random() * 3) + 1),
        playerCount: Math.floor(Math.random() * 6) + 2,
        position: Math.floor(Math.random() * 3) + 1,
        score: Math.floor(Math.random() * 1000) + 500,
        correctAnswers: Math.floor(Math.random() * 8) + 3,
        totalQuestions: 10,
        averageResponseTime: Math.random() * 10 + 2
      });
    }

    return history;
  }

  private generateMockBadges(userId: string): Badge[] {
    return [
      {
        id: 'first-win',
        name: 'Première Victoire',
        description: 'Gagner votre première partie',
        icon: '/badges/first-win.svg',
        unlocked: true,
        unlockedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'speed-demon',
        name: 'Éclair',
        description: 'Répondre en moins de 2 secondes 10 fois',
        icon: '/badges/speed.svg',
        unlocked: true,
        unlockedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'perfect-game',
        name: 'Sans Faute',
        description: 'Obtenir un score parfait',
        icon: '/badges/perfect.svg',
        unlocked: false,
        progress: 8,
        requiredProgress: 10
      }
    ];
  }

  private generatePerformanceData(userId: string): PerformanceData[] {
    const data: PerformanceData[] = [];
    const now = new Date();

    for (let i = 30; i >= 0; i--) {
      const date = formatDate(new Date(now.getTime() - i * 24 * 60 * 60 * 1000));
      data.push({
        date,
        score: Math.floor(Math.random() * 200) + 600,
        avgScore: 700
      });
    }

    return data;
  }

  private generateThemePerformance(userId: string): ThemePerformance[] {
    return [
      { theme: 'Histoire', score: 85, average: 70 },
      { theme: 'Géographie', score: 90, average: 75 },
      { theme: 'Sciences', score: 75, average: 72 },
      { theme: 'Sport', score: 65, average: 68 },
      { theme: 'Culture', score: 80, average: 71 }
    ];
  }

  getUserStats(userId: string): UserStats {
    const savedStats = localStorage.getItem(`stats:${userId}`);
    if (savedStats) {
      return JSON.parse(savedStats);
    }
    return this.generateMockStats(userId);
  }

  getUserGameHistory(userId: string): GameHistoryEntry[] {
    const savedHistory = localStorage.getItem(`history:${userId}`);
    if (savedHistory) {
      return JSON.parse(savedHistory);
    }
    return this.generateMockGameHistory(userId);
  }

  getUserBadges(userId: string): Badge[] {
    const savedBadges = localStorage.getItem(`badges:${userId}`);
    if (savedBadges) {
      return JSON.parse(savedBadges);
    }
    return this.generateMockBadges(userId);
  }

  getPerformanceData(userId: string): PerformanceData[] {
    const savedPerformance = localStorage.getItem(`performance:${userId}`);
    if (savedPerformance) {
      return JSON.parse(savedPerformance);
    }
    return this.generatePerformanceData(userId);
  }

  getThemePerformance(userId: string): ThemePerformance[] {
    const savedThemePerf = localStorage.getItem(`themePerf:${userId}`);
    if (savedThemePerf) {
      return JSON.parse(savedThemePerf);
    }
    return this.generateThemePerformance(userId);
  }
}

export const profileService = new ProfileService(); 