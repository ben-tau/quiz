export interface GameResults {
  players: Array<{
    id: string;
    name: string;
    avatar?: string;
    score: number;
    rank: number;
    correctAnswers: number;
    totalAnswers: number;
    averageTime: number;
    isCurrentPlayer?: boolean;
  }>;
  gameStats: {
    duration: number;
    questionsCount: number;
    themes: string[];
  };
}

export interface GameRecord {
  id: string;
  date: string;
  results: GameResults;
  currentUserId: string;
}

export interface UserStatistics {
  gamesPlayed: number;
  totalScore: number;
  totalCorrectAnswers: number;
  totalQuestions: number;
  victories: number;
  averageScore: number;
  averageAccuracy: number;
  bestScore: number;
  worstScore: number;
  favoriteThemes: Array<{ theme: string; count: number }>;
}

class GameHistoryService {
  private readonly HISTORY_KEY = 'brainbattle_history';
  private readonly STATS_KEY_PREFIX = 'brainbattle_stats_';
  private readonly MAX_HISTORY_SIZE = 20;

  saveGameResults(gameId: string, results: GameResults, currentUserId: string): void {
    try {
      // Créer l'enregistrement de la partie
      const gameRecord: GameRecord = {
        id: gameId,
        date: new Date().toISOString(),
        results,
        currentUserId
      };

      // Récupérer l'historique existant
      const history = this.getGameHistory();

      // Ajouter la nouvelle partie et limiter la taille
      const updatedHistory = [gameRecord, ...history].slice(0, this.MAX_HISTORY_SIZE);
      localStorage.setItem(this.HISTORY_KEY, JSON.stringify(updatedHistory));

      // Mettre à jour les statistiques de l'utilisateur
      this.updateUserStatistics(currentUserId, results);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des résultats:', error);
    }
  }

  getGameHistory(): GameRecord[] {
    try {
      const history = localStorage.getItem(this.HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'historique:', error);
      return [];
    }
  }

  getUserStatistics(userId: string): UserStatistics {
    try {
      const stats = localStorage.getItem(this.STATS_KEY_PREFIX + userId);
      return stats ? JSON.parse(stats) : this.getInitialStatistics();
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      return this.getInitialStatistics();
    }
  }

  private updateUserStatistics(userId: string, results: GameResults): void {
    try {
      const currentUserResult = results.players.find(p => p.isCurrentPlayer);
      if (!currentUserResult) return;

      const stats = this.getUserStatistics(userId);
      const themeCount = this.countThemes(stats.favoriteThemes, results.gameStats.themes);

      // Mettre à jour les statistiques
      const updatedStats: UserStatistics = {
        gamesPlayed: stats.gamesPlayed + 1,
        totalScore: stats.totalScore + currentUserResult.score,
        totalCorrectAnswers: stats.totalCorrectAnswers + currentUserResult.correctAnswers,
        totalQuestions: stats.totalQuestions + results.gameStats.questionsCount,
        victories: stats.victories + (currentUserResult.rank === 1 ? 1 : 0),
        averageScore: (stats.totalScore + currentUserResult.score) / (stats.gamesPlayed + 1),
        averageAccuracy: (stats.totalCorrectAnswers + currentUserResult.correctAnswers) / 
                        (stats.totalQuestions + results.gameStats.questionsCount) * 100,
        bestScore: Math.max(stats.bestScore, currentUserResult.score),
        worstScore: Math.min(stats.worstScore, currentUserResult.score),
        favoriteThemes: themeCount
      };

      localStorage.setItem(this.STATS_KEY_PREFIX + userId, JSON.stringify(updatedStats));
    } catch (error) {
      console.error('Erreur lors de la mise à jour des statistiques:', error);
    }
  }

  private getInitialStatistics(): UserStatistics {
    return {
      gamesPlayed: 0,
      totalScore: 0,
      totalCorrectAnswers: 0,
      totalQuestions: 0,
      victories: 0,
      averageScore: 0,
      averageAccuracy: 0,
      bestScore: 0,
      worstScore: Infinity,
      favoriteThemes: []
    };
  }

  private countThemes(
    existingThemes: Array<{ theme: string; count: number }>,
    newThemes: string[]
  ): Array<{ theme: string; count: number }> {
    const themeCount = new Map(existingThemes.map(t => [t.theme, t.count]));
    
    newThemes.forEach(theme => {
      themeCount.set(theme, (themeCount.get(theme) || 0) + 1);
    });

    return Array.from(themeCount.entries())
      .map(([theme, count]) => ({ theme, count }))
      .sort((a, b) => b.count - a.count);
  }

  clearHistory(): void {
    try {
      localStorage.removeItem(this.HISTORY_KEY);
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'historique:', error);
    }
  }

  clearUserStatistics(userId: string): void {
    try {
      localStorage.removeItem(this.STATS_KEY_PREFIX + userId);
    } catch (error) {
      console.error('Erreur lors de la suppression des statistiques:', error);
    }
  }
}

export const gameHistoryService = new GameHistoryService(); 