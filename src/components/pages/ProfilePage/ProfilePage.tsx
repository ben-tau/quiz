import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { profileService } from '../../../services/profileService';
import { StatCard } from '../../molecules/StatCard/StatCard';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(profileService.getUserStats(user?.id || ''));
  const [performanceData, setPerformanceData] = useState(profileService.getPerformanceData(user?.id || ''));
  const [themeData, setThemeData] = useState(profileService.getThemePerformance(user?.id || ''));
  const [badges, setBadges] = useState(profileService.getUserBadges(user?.id || ''));
  const [gameHistory, setGameHistory] = useState(profileService.getUserGameHistory(user?.id || ''));
  const [historyFilter, setHistoryFilter] = useState('all');

  const trends = {
    gamesPlayed: { value: 15, isPositive: true },
    winRate: { value: 5, isPositive: true },
    averageScore: { value: -2, isPositive: false },
    accuracy: { value: 8, isPositive: true }
  };

  const filteredHistory = gameHistory.filter(game => {
    if (historyFilter === 'won') return game.position === 1;
    if (historyFilter === 'lost') return game.position > 1;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête du profil */}
      <div className="flex items-center mb-8">
        <div className="w-20 h-20 rounded-full bg-blue-900/50 flex items-center justify-center mr-4">
          <span className="text-3xl">👤</span>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user?.username}</h1>
          <p className="text-gray-400">Niveau {Math.floor(stats.totalScore / 1000)}</p>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Parties jouées"
          value={stats.gamesPlayed}
          icon="gamepad"
          trend={trends.gamesPlayed}
        />
        <StatCard 
          title="Taux de victoire"
          value={`${(stats.victories / stats.gamesPlayed * 100).toFixed(1)}%`}
          icon="trophy"
          trend={trends.winRate}
        />
        <StatCard 
          title="Score moyen"
          value={Math.round(stats.totalScore / stats.gamesPlayed)}
          icon="star"
          trend={trends.averageScore}
        />
        <StatCard 
          title="Précision"
          value={`${(stats.totalCorrectAnswers / stats.totalQuestions * 100).toFixed(1)}%`}
          icon="target"
          trend={trends.accuracy}
        />
      </div>

      {/* Graphique d'évolution */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Évolution de vos performances</h3>
        <div className="bg-gray-800/60 p-4 rounded-lg">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1E293B', borderColor: '#3B82F6' }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="score" 
                name="Score" 
                stroke="#3B82F6" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="avgScore" 
                name="Score moyen" 
                stroke="#EC4899" 
                strokeDasharray="5 5" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance par thème et thèmes favoris */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Performance par thème</h3>
          <div className="bg-gray-800/60 p-4 rounded-lg h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius="80%" data={themeData}>
                <PolarGrid stroke="#444" />
                <PolarAngleAxis dataKey="theme" stroke="#888" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Votre performance"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Moyenne des joueurs"
                  dataKey="average"
                  stroke="#EC4899"
                  fill="#EC4899"
                  fillOpacity={0.4}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold mb-4">Thèmes favoris</h3>
          <div className="bg-gray-800/60 p-4 rounded-lg">
            <div className="space-y-4">
              {stats.favoriteThemes.map(theme => (
                <div key={theme.id} className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-900/50 rounded-lg mr-3">
                    <span className="text-xl">{theme.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{theme.name}</span>
                      <span className="text-blue-400">{theme.score}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-700 rounded-full mt-1">
                      <div 
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${theme.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Historique des parties */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Historique des parties</h3>
          <div className="flex gap-2">
            <select 
              className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1"
              value={historyFilter}
              onChange={(e) => setHistoryFilter(e.target.value)}
            >
              <option value="all">Toutes les parties</option>
              <option value="won">Parties gagnées</option>
              <option value="lost">Parties perdues</option>
            </select>
          </div>
        </div>
        
        <div className="bg-gray-800/60 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-900/70">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Thèmes</th>
                <th className="px-4 py-3 text-center">Joueurs</th>
                <th className="px-4 py-3 text-center">Position</th>
                <th className="px-4 py-3 text-right">Score</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {filteredHistory.map(game => (
                <tr key={game.id} className="hover:bg-blue-900/20">
                  <td className="px-4 py-3 text-left">{game.date.toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-left">
                    <div className="flex gap-1">
                      {game.themes.map(theme => (
                        <span key={theme} className="text-sm px-2 py-1 bg-blue-900/30 rounded-md">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">{game.playerCount}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`font-bold ${game.position === 1 ? 'text-yellow-400' : ''}`}>
                      {game.position}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">{game.score}</td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      className="text-sm px-3 py-1 bg-blue-600/50 hover:bg-blue-600/80 rounded-md transition-colors"
                      onClick={() => {/* TODO: Implémenter la vue détaillée */}}
                    >
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Badges et réalisations */}
      <div>
        <h3 className="text-xl font-bold mb-4">Badges et réalisations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {badges.map(badge => (
            <div 
              key={badge.id} 
              className={`flex flex-col items-center p-4 rounded-lg ${
                badge.unlocked ? 'bg-blue-900/30' : 'bg-gray-800/50 grayscale opacity-70'
              }`}
            >
              <div className="w-16 h-16 flex items-center justify-center mb-2">
                <img src={badge.icon} alt={badge.name} />
              </div>
              <div className="font-medium text-center">{badge.name}</div>
              <div className="text-xs text-gray-400 text-center mt-1">{badge.description}</div>
              {badge.unlocked ? (
                <div className="text-xs text-blue-400 mt-2">
                  Obtenu le {badge.unlockedAt?.toLocaleDateString()}
                </div>
              ) : badge.progress !== undefined && (
                <div className="w-full mt-2">
                  <div className="text-xs text-center text-gray-400 mb-1">
                    {badge.progress}/{badge.requiredProgress}
                  </div>
                  <div className="w-full h-1 bg-gray-700 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(badge.progress / badge.requiredProgress!) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 